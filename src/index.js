import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DataProvider } from './context/DataContext'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <DataProvider>
      <Router>
        <App />
        <h1>
          <Redirect to="/login">login</Redirect>
        </h1>
      </Router>
    </DataProvider>
  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
