const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // context: path.resolve(__dirname), // 执行上下文
    mode: "development",
    // mode: "production",
    entry: path.resolve(__dirname, '../src/index.jsx'), // 入口文件
    output: {
        path: path.resolve(__dirname, "../dist"), //打包后的文件存放的地方
        // publicPath: 'https://cdn:chafferer/assets/',
        filename: "bundle.js", // 打包后输出文件的文件名
    },
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: false,
        port: 9000,
        historyApiFallback: true, // 默认禁用，true: 当404的时候跳转至index.html
        open: true,  // 自动开启服务器
        hot: true, // 热更新
        // publicPath: '/dist/', // 保证两端的/存在 访问的路径变为http://host:port/dist/[index.html]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack app',
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            favicon: path.resolve(__dirname, '../src/favicon.png'),
        }),
        new webpack.BannerPlugin('banner'),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, '../node_modules'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, '../node_modules'),
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    'postcss-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.less$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(jpe?g|png|svg|pdf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]',
                            // publicPath: '/imagesaaaaaabbbbbbcccc/',
                        }
                    }
                ]
            }
        ],
    },
    // resolve: {
    //     extensions: ['.webpack.js', '.web.js', '.js']
    // },
    // node: {
    //     console: true,
    //     fs: 'empty',
    //     net: 'empty',
    //     tls: 'empty'
    // }
}