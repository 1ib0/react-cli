const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),         // 进行js压缩
            new OptimizeCSSAssetsPlugin({}) // 进行css压缩
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin() // 根据模块的相对路径生成一个四位数的hash作为模块id，解决第三方应用哈希改变，不能和热加载一起使用
    ],
});