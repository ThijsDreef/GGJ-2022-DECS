const path = require('path');

module.exports = {
  entry: './sources/index.js',
  mode: 'development',

  module: {
    rules: [{
      test: /\.(vert|frag)/,
      use: [
        'raw-loader',
        'glslify-loader',
      ],
    }],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
  },
};
