const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 进行css代码分离

const isEnvDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: paths.appIndexJs,
    output: {
        path: paths.appDist, //打包后的文件存放的地方
        filename: isEnvDev ? 'js/[name].[hash].js' : 'js/[name].[contenthash].js', // 打包后输出文件的文件名称 contenthash:根据内容生成的hash
        // chunkFilename: '[name].[hash].js', // 决定了非入口chunk的名称
    },
    optimization: { // 优化
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {  // 处理第三方的应用，进行缓存处理，因为几乎不涉及改动
                vendor: {
                    test: paths.appNodeModules,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack app',
            filename: 'index.html',
            template: paths.appHtml,
            favicon: paths.appFavicon,
            minify: !isEnvDev
        }),
        new MiniCssExtractPlugin({
            filename: isEnvDev ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: isEnvDev ? 'css/[id].css' : 'css/[id].[hash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: paths.appSrc,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/, // import 'path/x.css'
                include: [
                    paths.appNodeModules,
                    paths.appFont   // 处理iconfont.css
                ],
                use: [
                    isEnvDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                test: /\.css$/, // import styles from 'x.css'
                exclude: [
                    paths.appNodeModules,
                    paths.appFont   // 处理iconfont.css
                ],
                use: [
                    isEnvDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                    isEnvDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
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
                    isEnvDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, less-loader
                            importLoaders: 2, // 在@import之前执行的loader个数
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name]-[hash].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 小于8192字节，转换成base64格式
                            name: 'images/[name]-[hash].[ext]',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    }
}