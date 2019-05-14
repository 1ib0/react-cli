const paths = require('./paths');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: paths.appDist,
        compress: true,
        port: 9000,
        historyApiFallback: true, // 默认禁用，true: 当404的时候跳转至index.html
        open: true,  // 自动开启服务器
        hot: true // 热更新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});