const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: paths.appIndexJs,
    output: {
        path: paths.appDist, //打包后的文件存放的地方
        filename: "index.js" // 打包后输出文件的文件名
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack app',
            filename: 'index.html',
            template: paths.appHtml,
            favicon: paths.appFavicon
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                include: paths.appNodeModules,
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
                exclude: paths.appNodeModules,
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
                include: paths.appNodeModules,
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
                exclude: paths.appNodeModules,
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
                        }
                    }
                ]
            }
        ],
    },
}