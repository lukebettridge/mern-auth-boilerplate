const _ = require("lodash");

const todoResolver = require("./todo.resolver");
const userResolver = require("./user.resolver");
const tokenResolver = require("./token.resolver");

module.exports = _.merge(todoResolver, userResolver, tokenResolver);
