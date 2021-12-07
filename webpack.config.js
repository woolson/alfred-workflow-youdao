const { resolve } = require('path');

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.ts",
    pronounce: "./src/pronounce.ts",
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: {
    child_process: 'require("child_process")',
    fs: 'require("fs")',
    http2: 'require("http2")',
    buffer: 'require("buffer")',
    stream: 'require("stream")',
    tls: 'require("tls")',
    net: 'require("net")',
    https: 'require("https")',
    http: 'require("http")',
    url: 'require("url")',
    zlib: 'require("zlib")',
    os: 'require("os")',
    util: 'require("util")',
    dns: 'require("dns")'
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      loader: 'ts-loader'
    }]
  }
}