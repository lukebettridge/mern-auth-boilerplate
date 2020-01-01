const { gql } = require("apollo-server-express");

const userType = gql`
	type User {
		id: ID
		forename: String
		surname: String
		email: String
		roles: [String]
		active: Boolean
	}

	extend type Query {
		currentUser: User
		users(query: String): [User]
	}
`;

module.exports = userType;
