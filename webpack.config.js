const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGES = ['index', 'pushkin-fest', 'contacts', 'about']

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(s)?css$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(svg|png|jp(e)?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...PAGES.map(page => new HTMLWebpackPlugin({
            template: `./src/${page}.html`,
            filename: `${ page }.html`,
            favicon: './src/favicon.png'
          })),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
}
