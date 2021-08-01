import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache({
    freezeResults: true,
  }),
  assumeImmutableResults: true,
});
ReactDOM.render(
  <ApolloProvider client={client}>
    ,
    <App />{" "}
  </ApolloProvider>,
  document.getElementById("root")
);
