const { gql } = require("apollo-server-express");

const todoType = require("./todo.type");
const userType = require("./user.type");
const tokenType = require("./token.type");

module.exports = gql`
	type Query {
		_empty: String
	}

	type Mutation {
		_empty: String
	}

	${todoType}
	${userType}
	${tokenType}
`;
