import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import { Subheading, Table } from "components/styles";
import Layout from "../layout";

const Home = () => {
	return (
		<Layout>
			<Subheading>Todos</Subheading>
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
						<Table>
							<thead>
								<tr>
									<th className="col-1">ID</th>
									<th className="col-4">Description</th>
								</tr>
							</thead>
							<tbody>
								{data.todos.map(item => (
									<tr key={item.id}>
										<td className="col-1">{item.id}</td>
										<td className="col-4">{item.text}</td>
									</tr>
								))}
							</tbody>
						</Table>
					);
				}}
			</Query>
		</Layout>
	);
};

export default Home;
