/* eslint-disable no-console */
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const { createLightship } = require("lightship");
const { ApolloServer } = require("apollo-server-express");
const router = express.Router();

require("dotenv").config();

const db = require("./config/db");
const routes = {
	auth: require("./routes/auth")
};

const context = require("./src/context");
const resolvers = require("./src/resolvers");
const typeDefs = require("./src/types");

const PORT = process.env.PORT || 5000;

const app = express();
const lightship = createLightship();

mongoose
	.connect(db.url, db.options)
	.then(() => {
		console.log("MongoDB successfully connected");
		mongoose.connection.on("disconnected", () => {
			lightship.signalNotReady();
		});
		lightship.signalReady();
	})
	.catch(err => {
		console.log(err);
		lightship.signalNotReady();
	});

process.env.NODE_ENV !== "production"
	? require("./init.dev")(app)
	: require("./init.prod")(app);

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.use(cookieParser());

// Apollo middleware
const server = new ApolloServer({
	context,
	cors: false,
	formatError: err => {
		if (err.message.includes("Invalid entry"))
			return err.extensions.exception.errors;
		return err;
	},
	resolvers,
	typeDefs
});
server.applyMiddleware({ app, cors: false });

// Routes
app.use("/api/auth", routes.auth(router));

app.listen(PORT, () => console.log("Server listening on port", PORT));
