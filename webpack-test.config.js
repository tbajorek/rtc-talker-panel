const webpack = require('webpack');
const fs = require('fs');

const root = require('app-root-path');

const includePaths = [
  fs.realpathSync(__dirname + '/src'),
];

const config = {
  mode: 'development',
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      __LOCALE_DIR__: JSON.stringify(`${root}/src/locale`),
      __VERSION__: JSON.stringify('1.0.0'),
    }),
  ],
  entry: './test-all.js',
  output: {
    filename: 'testBundle.js'
  },
  bail: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: includePaths,
        use: {
          loader: 'babel-loader',
        },
      },{
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'ignore-loader',
          }
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  externals: {
    canvas: "commonjs canvas" // Important (2)
  },
};

module.exports = config;
