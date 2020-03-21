const cors = require("cors");
const webpack = require("webpack");
const config = require("../webpack.config");
const webpackDevMiddleware = require("webpack-dev-middleware");

const compiler = webpack(config);

module.exports = app => {
	app.use(cors({ origin: true, credentials: true }));
	app.use(webpackDevMiddleware(compiler));
};
