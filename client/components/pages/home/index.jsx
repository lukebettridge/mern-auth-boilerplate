import React, { useRef, useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import MediaQuery from "react-responsive";
import { FiPlus, FiSearch } from "react-icons/fi";

import Context from "components/context";

import Layout from "../layout";
import {
	FilterBody,
	FilterHeader,
	FilterWrap,
	Subheading,
	Table,
	TableAction
} from "components/styles";
import breakpoints from "components/styles/breakpoints";
import Input from "components/form/input";
import Button from "components/form/button";
import TodoModal from "./TodoModal";

const Home = props => {
	const queryInput = useRef();
	const [state, setState] = useState({
		modalIsOpen: false,
		query: "",
		todo: null
	});

	const openModal = (todo = null) => {
		setState(prev => ({ ...prev, modalIsOpen: true, todo }));
	};

	const onSearch = e => {
		e.preventDefault();
		setState(prev => ({
			...prev,
			query: queryInput.current.value
		}));
	};

	return (
		<Layout {...props}>
			<Subheading>Todos</Subheading>

			<FilterWrap>
				<FilterHeader>
					<small>Filter your results</small>
				</FilterHeader>
				<FilterBody>
					<form noValidate onSubmit={onSearch}>
						<Input placeholder="Search Term" ref={queryInput} secondary />
						<Button secondary type="submit" width="unset">
							<FiSearch />
						</Button>
					</form>
					<Button onClick={() => openModal()} width="unset">
						<MediaQuery minWidth={breakpoints.m}>
							{matches => (matches ? "New Todo" : <FiPlus />)}
						</MediaQuery>
					</Button>
				</FilterBody>
			</FilterWrap>

			<Query fetchPolicy={"no-cache"} query={TODOS_QUERY(state.query)}>
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
													<th>Description</th>
												</tr>
											</thead>
											<tbody>
												{data.todos.map(item => (
													<tr key={item.id} onClick={() => openModal(item)}>
														<td>{item.text}</td>
													</tr>
												))}
											</tbody>
										</Table>
									) : (
										data.todos.map(item => (
											<React.Fragment key={item.id}>
												<Table>
													<tbody>
														<tr>
															<th>Description</th>
															<td>{item.text}</td>
														</tr>
													</tbody>
												</Table>
												<TableAction onClick={() => openModal(item)}>
													More Details
												</TableAction>
											</React.Fragment>
										))
									)
								}
							</MediaQuery>
							<Context.Consumer>
								{({ notification: { success } }) => (
									<TodoModal
										close={() => {
											setState(prev => ({ ...prev, modalIsOpen: false }));
										}}
										isOpen={state.modalIsOpen}
										onSuccess={() => {
											refetch();
											success("The todo information was updated successfully.");
										}}
										todo={state.todo}
									/>
								)}
							</Context.Consumer>
						</React.Fragment>
					);
				}}
			</Query>
		</Layout>
	);
};

export const TODOS_QUERY = (query = "") => gql`
{
	todos(query: "${query}") {
		id
		text
	}
}
`;

export default Home;
