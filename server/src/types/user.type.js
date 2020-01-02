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

	input UpdateUserInput {
		id: ID!
		forename: String!
		surname: String!
		email: String!
	}

	extend type Query {
		currentUser: User
		users(query: String): [User]
	}

	extend type Mutation {
		activateUser(id: ID!): Boolean
		deactivateUser(id: ID!): Boolean
		updateUser(input: UpdateUserInput): ID
	}
`;

module.exports = userType;
