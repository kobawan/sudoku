import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { AppQueried } from "./App";
import "../styles/common.less";

const client = new ApolloClient({
	link: new HttpLink({ uri: "http://localhost:4000/graphql" }), // TODO Fix for prod
	cache: new InMemoryCache(),
});

class App extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<AppQueried />
			</ApolloProvider>
		);
	}
}
ReactDOM.render(<App />, document.getElementById("root"));
