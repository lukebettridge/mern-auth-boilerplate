/* eslint-disable no-console */
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

require("dotenv").config();

const routes = {
	auth: require("./routes/auth")
};

const context = require("./src/context");
const resolvers = require("./src/resolvers");
const typeDefs = require("./src/types");

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));

const app = express();

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
app.use("/api/auth", routes.auth);

app.listen(PORT, () => console.log("Server listening on port", PORT));
