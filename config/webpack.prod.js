const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    performance: {    // 性能提示 
        hints: false, // 不进行提示
        // maxEntrypointSize: 1000000, // 控制入口起点文件的最大体积
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(), // 根据模块的相对路径生成一个四位数的hash作为模块id，解决第三方应用哈希改变，不能和热加载一起使用
        new TerserJSPlugin({
            sourceMap: true,
            cache: true
        }), // 进行js压缩
        new OptimizeCSSAssetsPlugin(), // 进行css压缩
        new BundleAnalyzerPlugin()
    ],
});