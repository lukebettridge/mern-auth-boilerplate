const { gql } = require("apollo-server-express");

const todoType = gql`
	type Todo {
		id: ID
		text: String
	}

	extend type Query {
		todos(query: String): [Todo]
	}

	extend type Mutation {
		addTodo(text: String!): ID
		removeTodo(id: ID!): ID
		updateTodo(id: ID!, text: String!): ID
	}
`;

module.exports = todoType;
