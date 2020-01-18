const { merge } = require("lodash");

const todoResolver = require("./todo.resolver");
const userResolver = require("./user.resolver");
const tokenResolver = require("./token.resolver");

module.exports = merge(todoResolver, userResolver, tokenResolver);
