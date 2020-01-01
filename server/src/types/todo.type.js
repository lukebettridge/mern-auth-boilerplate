const { gql } = require("apollo-server-express");

const todoType = gql`
	type Todo {
		id: ID
		text: String
	}

	extend type Query {
		todos: [Todo]
	}

	extend type Mutation {
		addTodo(text: String!): Todo
		removeTodo(id: ID!): Todo
	}
`;

module.exports = todoType;
