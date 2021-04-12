import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";


const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    uri: 'https://api.spacex.land/graphql/'
});
ReactDOM.render(

    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
