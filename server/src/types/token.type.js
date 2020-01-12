const { gql } = require("apollo-server-express");

const tokenType = gql`
	type Token {
		id: ID
		token: String
	}

	extend type Mutation {
		addToken: String
	}
`;

module.exports = tokenType;
