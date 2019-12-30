/* eslint-disable no-console */
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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
const init = {
	dev: require("./init.dev"),
	prod: require("./init.prod")
};

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));

const app = express();

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true
	})
);

// Apollo middleware
const server = new ApolloServer({
	context,
	cors: false,
	resolvers,
	typeDefs
});
server.applyMiddleware({ app, cors: false });

process.env.NODE_ENV !== "production" ? init.dev(app) : init.prod(app);

// Routes
app.use("/api/auth", routes.auth);

app.listen(PORT, () => console.log("Server listening on port", PORT));
