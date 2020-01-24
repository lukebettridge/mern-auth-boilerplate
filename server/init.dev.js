const cors = require("cors");
const webpack = require("webpack");
const config = require("../webpack.config");
const webpackDevMiddleware = require("webpack-dev-middleware");
const { graphiqlExpress } = require("graphql-server-express");

const compiler = webpack(config);

module.exports = app => {
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN || process.env.BASE_URL,
			credentials: true
		})
	);
	app.use(
		"/graphiql",
		graphiqlExpress({
			endpointURL: "/graphql"
		})
	);
	app.use(webpackDevMiddleware(compiler));
};
