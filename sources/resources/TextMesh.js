import Mesh from 'decs/WebGL/renderResources/Mesh';

export default class TextMesh extends Mesh {
  constructor(gl, font, text, width, textAlignCenter, lineHeight) {
    super(gl, [], [], []);
    this.text = text;
    this.width = width;
    this.textAlignCenter = textAlignCenter;
    this.lineHeight = lineHeight;
    this.font = font;
    this.lineInset = 0;
    this.rebuildText();
  }

  createIndices(characters) {
    const indices = [];
    const defaultIndices = [0, 1, 2, 0, 3, 1];
    for (let i = 0; i < characters; i++) {
      for (let j = 0; j < defaultIndices.length; j++) {
        indices.push(defaultIndices[j] + i * 4);
      }
    }
    return indices;
  }

  getWordLength(word) {
    let xAdvance = 0;
    for (let i = 0; i < word.length; i++) {
      xAdvance += this.font.getCharacter(word[i]).xadvance;
    }

    return xAdvance;
  }

  splitTextToWrap() {
    // split text to words
    const splittedText = this.text.split(' ');

    let xAdvance = this.lineInset || 0;

    // prepare lines
    const lines = [];
    let line = '';
    const spaceLength = this.font.getCharacter(' ').xadvance;

    // for all words
    for (let i = 0; i < splittedText.length; i++) {
      const wordLength = this.getWordLength(splittedText[i]);
      // if current x + wordlength > wrapsize start on a new line
      if (xAdvance + wordLength + spaceLength > this.paragraphWidth) {
        lines.push({ line, width: xAdvance - spaceLength });
        line = '';
        xAdvance = 0;
      }

      // dont forget to readd the space to the line
      line += `${splittedText[i]} `;
      // advance the x by the length of the word
      xAdvance += wordLength + spaceLength;
    }
    // add the last line that does not break in the paragraph
    lines.push({ line, width: xAdvance - spaceLength });

    return lines;
  }

  rebuildText() {
    // split full text to lines
    const lines = this.splitTextToWrap();
    const totalCharacters = lines.reduce((acc, item) => item.line.length + acc, 0) - 1;
    const stride = 8;
    const vertexOffset = 0;
    const uvOffset = 3;
    const verticesPerQuad = 4;
    const buffer = new Float32Array(8 * totalCharacters * verticesPerQuad);

    // xAdvance should be equal to lineinset on the first line
    let xAdvance = this.lineInset;
    let yOffset;
    let width = 0;

    // we need to keep track off the amount of total characters to render

    // for every line
    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber].line;
      // calc the yoffset "the base line for the next line"
      yOffset = -lineNumber * (this.font.lineHeight * this.lineHeight);

      // reset xAdvance if the start xAdvance was larger then the lineinset
      xAdvance = (this.textAlignCenter) ? -lines[lineNumber].width / 2 : (xAdvance > this.lineInset) ? 0 : this.lineInset;

      let nrChar = 0;
      // for every character in line
      for (let i = 0; i < line.length; i++) {
        const character = this.font.getCharacter(line[i]);
        const kerning = this.font.getCharacterKerning(line[i - 1], line[i]);
        for (let j = 0; j < verticesPerQuad; j++) {
          buffer[(nrChar * verticesPerQuad * stride + j * stride) + vertexOffset] = character.vertices[j * 2] + xAdvance + kerning + character.xoffset;
          buffer[(nrChar * verticesPerQuad * stride + j * stride) + vertexOffset + 1] = character.vertices[j * 2 + 1] - character.yoffset - yOffset;
          buffer[(nrChar * verticesPerQuad * stride + j * stride) + vertexOffset + 2] = 0;
          buffer[(nrChar * verticesPerQuad * stride + j * stride) + uvOffset] = character.uvs[j * 2];
          buffer[(nrChar * verticesPerQuad * stride + j * stride) + uvOffset + 1] = character.uvs[j * 2 + 1];
        }
        xAdvance += character.xadvance + kerning;
        nrChar++;
      }
      width = (width > xAdvance) ? width : xAdvance;
    }
    this.glBuffer.bufferData(buffer);
    this.indexBuffer.setBuffer(new Uint16Array(this.createIndices(totalCharacters)));
    this.ranges = [{
      start: 0,
      end: totalCharacters * 6,
    }];

    this.width = width;
    this.height = -(lines.length + 1) * (this.font.lineHeight * this.lineHeight) + (this.font.lineHeight * this.lineHeight) * 0.5;
  }
}
