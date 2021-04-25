const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./index.html",
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    }
});

const config = () => {

    return {
        context: __dirname + "/www",
        entry: __dirname + "/www/index.tsx",
        output: {
            path: path.resolve(__dirname + '/www/', 'dist'),
            filename: 'js/[name].[hash].js',
            publicPath:  path.resolve(__dirname + '/www/', 'dist') + '/',
            chunkFilename: 'js/[id].[chunkhash].js',
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
                    // test: que tipo de archivo quiero reconocer,
                    // use: que loader se va a encargar del archivo
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-2'],
                        }
                    },
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'images/[name].[hash].[ext]',
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            htmlWebpackPlugin,
            new OptimizeCSSPlugin(),
            new CleanWebpackPlugin(['dist'], {root: __dirname + '/www/'})
            //new ExtractTextPlugin("css/[name].[hash].css"),
        ]
    }
};

module.exports = config;

