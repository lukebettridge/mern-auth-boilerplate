import React from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import GlobalStyle from "./styles/global";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Home from "./pages/home";

const httpLink = createHttpLink({
	uri: "http://localhost:5000/graphql",
	credentials: "include"
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<GlobalStyle />
				<Route component={Register} exact path="/register" />
				<Route component={Login} exact path="/login" />
				<Route component={Logout} exact path="/logout" />
				<ProtectedRoute component={Home} exact path="/home" />
			</Router>
		</ApolloProvider>
	);
};

export default App;
