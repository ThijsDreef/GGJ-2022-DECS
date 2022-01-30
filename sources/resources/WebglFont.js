export default class WebglFont {
  constructor(fontData) {
    this.parseFontData(fontData);
  }

  getCharacter(char) {
    return this.chars[char];
  }

  getCharacterKerning(first, second) {
    const kerning = this.kernings[first + second];
    return (kerning) || 0;
  }

  parseFontData(fontData) {
    this.chars = {};
    console.log(fontData);
    for (let index = 0; index < fontData.chars.length; index++) {
      this.chars[
        String.fromCharCode(fontData.chars[index].id)
      ] = this.createWebglFontReadyCharacter(fontData.chars[index]);
    }

    this.kernings = {};
    for (let index = 0; index < fontData.kernings.length; index++) {
      const kerningData = fontData.kernings[index];
      if (kerningData.amount > 0) {
        const key = String.fromCharCode(kerningData.first, kerningData.second);
        this.kernings[key] = kerningData.amount / 256;
      }
    }

    this.lineHeight = fontData.common.base / fontData.common.scaleH;
  }

  createWebglFontReadyCharacter(character) {
    const width = 256;
    const height = 256;

    const vertices = [];
    const uvs = [];
    const normalizedWidth = character.width / width;
    const normalizedHeight = character.height / height;
    const normalizedX = character.x / width;
    const normalizedY = character.y / height;

    const normalizedYOffset = -normalizedHeight;

    vertices.push(normalizedWidth, normalizedYOffset);
    vertices.push(0, 0);
    vertices.push(0, normalizedYOffset);
    vertices.push(normalizedWidth, 0);

    uvs.push(normalizedX + normalizedWidth, normalizedY + normalizedHeight);
    uvs.push(normalizedX, normalizedY);
    uvs.push(normalizedX, normalizedY + normalizedHeight);
    uvs.push(normalizedX + normalizedWidth, normalizedY);

    return {
      uvs,
      vertices,
      xadvance: character.xadvance / width,
      yoffset: character.yoffset / height,
      xoffset: character.xoffset / width,
    };
  }
}
