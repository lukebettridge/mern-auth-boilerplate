const { gql } = require("apollo-server-express");

const todoType = gql`
	type Todo {
		id: ID
		text: String
	}

	type Query {
		todos: [Todo]
	}

	type Mutation {
		addTodo(text: String!): Todo
		removeTodo(id: ID!): Todo
	}
`;

module.exports = todoType;
