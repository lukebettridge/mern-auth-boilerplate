import React from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import GlobalStyle from "./styles/global";

import { Login, Logout, Register, ResetPassword } from "./pages/auth";
import Home from "./pages/home";
import Accounts from "./pages/accounts";

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
				<Switch>
					<Route component={Login} path="/auth/login" />
					<Route component={Logout} path="/auth/logout" />
					<Route component={Register} path="/auth/register" />
					<Route
						component={ResetPassword}
						path="/auth/reset-password/:resetKey"
					/>
					<ProtectedRoute component={Home} path="/(|home)/" />
					<ProtectedRoute component={Accounts} path="/admin/accounts" />
				</Switch>
			</Router>
		</ApolloProvider>
	);
};

export default App;
