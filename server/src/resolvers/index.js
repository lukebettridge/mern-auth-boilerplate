const _ = require("lodash");

const todoResolver = require("./todo.resolver");
const userResolver = require("./user.resolver");

module.exports = _.merge(todoResolver, userResolver);
