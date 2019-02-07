import 'babel-polyfill'
import ApolloClient from 'apollo-boost'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'
import Authenticate from './Authenticate'

const client = new ApolloClient({
  uri: process.env.GRAPHCOOL_URI,
  request: operation => {
    const token = sessionStorage.getItem('auth_token')
    if (token) {
      operation.setContext({ headers: { Authorization: `Bearer ${token}` } })
    }
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Authenticate>
      {(user, logout) => <App user={user} logout={logout} />}
    </Authenticate>
  </ApolloProvider>,
  document.getElementById('app'),
)
