const path = require("path");
const express = require("express");

module.exports = app => {
	app.use("/", express.static(process.cwd() + "/build"));
	app.get("/^/(?!api).*/", (_, res) => {
		res.sendFile(path.resolve(__dirname, "../build/index.html"));
	});
};
