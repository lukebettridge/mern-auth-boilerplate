import React, { useRef } from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import { notification } from "utils";

import Context from "./context";

import ScrollToTop from "./routes/ScrollToTop";
import ProtectedRoute from "./routes/ProtectedRoute";

import GlobalStyle from "./styles/global";

import { Login, Logout, Register, ResetPassword } from "./pages/auth";
import { Accounts } from "./pages/admin";
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
	const notificationSystem = useRef();
	const defaultContext = {
		notification: notification(notificationSystem)
	};

	return (
		<ApolloProvider client={client}>
			<Router>
				<ScrollToTop />
				<GlobalStyle />
				<Context.Provider value={defaultContext}>
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
					<NotificationSystem
						ref={notificationSystem}
						style={{
							NotificationItem: {
								DefaultStyle: {
									border: "none",
									fontWeight: "200",
									padding: "18px"
								}
							},
							Title: {
								DefaultStyle: { fontSize: "18px" }
							},
							Dismiss: {
								DefaultStyle: { display: "none" }
							}
						}}
					/>
				</Context.Provider>
			</Router>
		</ApolloProvider>
	);
};

export default App;
