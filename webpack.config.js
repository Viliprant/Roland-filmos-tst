const path = require('path');

module.exports = {
  entry: './public/index.js',
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
  },
  watch: true,
};