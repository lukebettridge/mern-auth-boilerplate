const { merge } = require("lodash");

const todoResolver = require("./todo.resolver");
const userResolver = require("./user");
const tokenResolver = require("./token.resolver");

module.exports = merge(todoResolver, userResolver, tokenResolver);
