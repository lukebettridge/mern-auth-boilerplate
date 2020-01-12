import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Layout from "../layout";
import { Subheading, Table } from "components/styles";
import TodoModal from "./TodoModal";

const Home = props => {
	const [state, setState] = useState({
		modalIsOpen: false,
		todo: null
	});

	const onClick = todo => {
		setState(prev => ({ ...prev, modalIsOpen: true, todo }));
	};

	return (
		<Layout {...props}>
			<Subheading>Todos</Subheading>
			<Query
				fetchPolicy={"no-cache"}
				query={gql`
					{
						todos {
							id
							text
						}
					}
				`}
			>
				{({ loading, error, data, refetch }) => {
					if (loading) return <p>Loading...</p>;
					if (error) {
						return <p>error</p>;
					}
					return (
						<React.Fragment>
							<Table>
								<thead>
									<tr>
										<th className="col-1">ID</th>
										<th className="col-4">Description</th>
									</tr>
								</thead>
								<tbody>
									{data.todos.map(item => (
										<tr key={item.id} onClick={() => onClick(item)}>
											<td className="col-1">{item.id}</td>
											<td className="col-4">{item.text}</td>
										</tr>
									))}
								</tbody>
							</Table>
							<TodoModal
								close={() => {
									refetch();
									setState(prev => ({ ...prev, modalIsOpen: false }));
								}}
								isOpen={state.modalIsOpen}
								todo={state.todo}
							/>
						</React.Fragment>
					);
				}}
			</Query>
		</Layout>
	);
};

export default Home;
