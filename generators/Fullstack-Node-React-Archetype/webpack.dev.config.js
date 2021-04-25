const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const DIST_DIR = path.resolve(__dirname,'www/dist');
const SRC_DIR = path.resolve(__dirname,'www');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./www/public/index.html",
});

const config = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: [ SRC_DIR + '/index.tsx'],
    output: {
        path: DIST_DIR,
        filename: 'js/[name].js'
    },
    devServer: {
      port: 9000
    },
    module: {
        rules:  [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000000,
                        fallback: 'file-loader',
                        name: 'images/[name].[hash].[ext]',
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        htmlWebpackPlugin,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;
