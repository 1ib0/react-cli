const autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		autoprefixer({
			remove: false,
			grid: true,
			flexbox: true,
			browsers: ["last 5 versions", "iOS >= 8", "Android > 4"]
		})
	]
};
