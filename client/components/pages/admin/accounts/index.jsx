import React, { useRef, useState } from "react";
import MediaQuery from "react-responsive";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Layout from "components/pages/layout";
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
import AccountModal from "./AccountModal";

const Accounts = () => {
	const queryInput = useRef();
	const [state, setState] = useState({
		modalIsOpen: false,
		query: "",
		user: null
	});

	const onClick = user => {
		setState({ ...state, modalIsOpen: true, user });
	};

	const onSubmit = e => {
		e.preventDefault();
		setState({
			...state,
			query: queryInput.current.value
		});
	};

	return (
		<React.Fragment>
			<Layout>
				<Subheading>Accounts</Subheading>

				<FilterWrap>
					<FilterHeader>
						<small>Filter your results</small>
					</FilterHeader>
					<form noValidate onSubmit={onSubmit}>
						<FilterBody>
							<Input
								forwardRef={queryInput}
								mb="none"
								placeholder="Search..."
								secondary
							/>
							<Button inline secondary type="submit">
								Submit
							</Button>
						</FilterBody>
					</form>
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
					{({ loading, error, data, refetch }) => {
						if (loading) return <p>Loading...</p>;
						if (error) {
							return <p>error</p>;
						}
						return (
							<React.Fragment>
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
														<tr key={user.id} onClick={() => onClick(user)}>
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
													<TableAction onClick={() => onClick(user)}>
														More Details
													</TableAction>
												</React.Fragment>
											))
										)
									}
								</MediaQuery>
								<AccountModal
									close={() => {
										refetch();
										setState({ ...state, modalIsOpen: false });
									}}
									isOpen={state.modalIsOpen}
									user={state.user}
								/>
							</React.Fragment>
						);
					}}
				</Query>
			</Layout>
		</React.Fragment>
	);
};

export default Accounts;
