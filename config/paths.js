'use strict';

const path = require('path');
const fs = require('fs');

const  appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
	appDist: resolveApp('dist'),
	appHtml: resolveApp('src/index.html'),
	appIndexJs: resolveApp('src/index.jsx'),
	appSrc: resolveApp('src'),
	appFavicon: resolveApp('src/favicon.png'),
	appNodeModules: resolveApp('node_modules'),
};