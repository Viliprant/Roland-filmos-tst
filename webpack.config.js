const path = require('path');

module.exports = {
  entry: './public/index.js',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
  },
  experiments: {
    topLevelAwait: true
  },
  // watch: true,
};