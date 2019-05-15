'use strict';

const path = require('path');
const fs = require('fs');

const  appDirectory = fs.realpathSync(process.cwd()); // process.cwd()方法获取的是进程的目录，不是当前的目录(__dirname)
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
	appDist: resolveApp('dist'),
	appHtml: resolveApp('src/index.html'),
	appIndexJs: resolveApp('src/index.jsx'),
	appSrc: resolveApp('src'),
	appFavicon: resolveApp('src/favicon.png'),
	appNodeModules: resolveApp('node_modules'),
	appFont: resolveApp('src/assets/fonts'),
};