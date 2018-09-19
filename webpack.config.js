const fs = require('fs');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const root = require('app-root-path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});

const definePlugin = new webpack.DefinePlugin({
    '__BACKEND_SERVER_URL__': JSON.stringify('http://localhost/'),
    '__SIGNALING_SERVER_URL__': JSON.stringify('ws://0.0.0.0:9876'),
    '__LOCALE_DIR__': JSON.stringify(root + "/node_modules/tbrtc-client/src/locale")
});

const namedPlugin = new webpack.NamedModulesPlugin();

const errorOverlay = new ErrorOverlayPlugin();

const includePaths = [
    fs.realpathSync(__dirname + '/src'),
];

module.exports = {
    resolve: {
        symlinks: true
    },
    entry: "./src/index.js",
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: includePaths,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [htmlPlugin, definePlugin, namedPlugin, errorOverlay],
    devServer: {
        historyApiFallback: true,
    },
    watchOptions: {
        ignored: /node_modules/
    },
};
