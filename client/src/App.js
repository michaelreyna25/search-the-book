import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
import Auth from "./utils/auth";
import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const http = createHttpLink({
	uri: "/graphql",
});

const auth = setContext((_, { headers }) => {
	const token = Auth.getToken();
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: auth.concat(http),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<>
					<Navbar />
					<Switch>
						<Route exact path="/" component={SearchBooks} />
						<Route exact path="/saved" component={SavedBooks} />
						<Route render={() => <h1 className="display-2">Wrong page!</h1>} />
					</Switch>
				</>
			</Router>
		</ApolloProvider>
	);
}

export default App;