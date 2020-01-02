import React, { useRef, useState } from "react";
import MediaQuery from "react-responsive";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Layout from "../layout";
import {
	FilterBody,
	FilterHeader,
	FilterWrap,
	Subheading,
	Status,
	Table,
	TableAction
} from "components/styles";
import breakpoints from "components/styles/breakpoints";
import Input from "components/form/input";
import Button from "components/form/button";

const Accounts = () => {
	const queryInput = useRef();
	const [state, setState] = useState({ query: "" });

	const onSubmit = () =>
		setState({
			...state,
			query: queryInput.current.value
		});

	return (
		<Layout>
			<Subheading>Accounts</Subheading>

			<FilterWrap>
				<FilterHeader>
					<small>Filter your results</small>
				</FilterHeader>
				<FilterBody>
					<Input
						forwardRef={queryInput}
						mb="none"
						placeholder="Search..."
						secondary
					/>
					<Button inline onClick={onSubmit} secondary>
						Submit
					</Button>
				</FilterBody>
			</FilterWrap>

			<Query
				fetchPolicy={"no-cache"}
				query={gql`
					{
						users(query: "${state.query}") {
							id
							forename
							surname
							email
							roles
							active
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
						<MediaQuery minWidth={breakpoints.l}>
							{matches =>
								matches ? (
									<Table>
										<thead>
											<tr>
												<th className="col-1">Status</th>
												<th className="col-2">Surname</th>
												<th className="col-2">Forename</th>
												<th className="col-4">Email Address</th>
											</tr>
										</thead>
										<tbody>
											{data.users.map(user => (
												<tr key={user.id}>
													<td className="col-1">
														<Status success={user.active}>
															{user.active ? "Active" : "Inactive"}
														</Status>
													</td>
													<td className="col-2">{user.surname}</td>
													<td className="col-2">{user.forename}</td>
													<td className="col-4">{user.email}</td>
												</tr>
											))}
										</tbody>
									</Table>
								) : (
									data.users.map(user => (
										<React.Fragment key={user.id}>
											<Table>
												<tbody>
													<tr>
														<th>Status</th>
														<td>
															<Status success={user.active}>
																{user.active ? "Active" : "Inactive"}
															</Status>
														</td>
													</tr>
													<tr>
														<th>Surname</th>
														<td>{user.surname}</td>
													</tr>
													<tr>
														<th>Forename</th>
														<td>{user.forename}</td>
													</tr>
													<tr>
														<th>Email</th>
														<td>{user.email}</td>
													</tr>
												</tbody>
											</Table>
											<TableAction>More Details</TableAction>
										</React.Fragment>
									))
								)
							}
						</MediaQuery>
					);
				}}
			</Query>
		</Layout>
	);
};

export default Accounts;
