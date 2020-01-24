const { merge } = require("lodash");

const todoResolver = require("./todo");
const userResolver = require("./user");
const tokenResolver = require("./token");

module.exports = merge(todoResolver, userResolver, tokenResolver);
