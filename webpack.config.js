
const path = require("path");
const slsw = require('serverless-webpack');
module.exports = {
  target: "webworker",
  mode: "production",
  node: {
    fs: "empty",
    tls: "empty",
    net: "empty",
    child_process: "empty"
  },
  entry: slsw.lib.entries,
  output: {
    path: __dirname + "/dist",
    publicPath: "dist",
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: "javascript/auto",
        use: []
      },
      {
        test: /\.js$/,
        type: "javascript/auto",
        use: []
      }
    ]
  }
};
