import React from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import GlobalStyle from "./styles/global";

import { Login, Logout, Register } from "./pages/auth";
import Home from "./pages/home";

const httpLink = createHttpLink({
	uri: `${baseURL}/graphql`,
	credentials: "include"
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	credentials: "include"
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<GlobalStyle />
				<Route component={Login} exact path="/auth/login" />
				<Route component={Logout} exact path="/auth/logout" />
				<Route component={Register} exact path="/auth/register" />
				<ProtectedRoute component={Home} path="/(|home)/" />
			</Router>
		</ApolloProvider>
	);
};

export default App;
