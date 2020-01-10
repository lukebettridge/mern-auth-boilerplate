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

	input ChangePasswordInput {
		password: String!
		newPassword: String!
		newPassword2: String!
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
		changePassword(input: ChangePasswordInput!): ID
		updateUser(input: UpdateUserInput!): ID
	}
`;

module.exports = userType;
