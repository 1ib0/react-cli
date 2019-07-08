const autoprefixer = require("autoprefixer");

module.exports = {
    plugins: [
        autoprefixer({
            remove: false,
            grid: true,
            flexbox: true
        })
    ]
};
