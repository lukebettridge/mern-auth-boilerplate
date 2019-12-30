import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const Home = () => {
	return (
		<div>
			<Query
				query={gql`
					{
						todos {
							id
							text
						}
					}
				`}
			>
				{({ loading, error, data }) => {
					if (loading) return <p>Loading...</p>;
					if (error) {
						return <p>error</p>;
					}
					return (
						<ul>
							{data.todos.map(item => (
								<li key={item.id}>{item.text}</li>
							))}
						</ul>
					);
				}}
			</Query>
		</div>
	);
};

export default Home;
