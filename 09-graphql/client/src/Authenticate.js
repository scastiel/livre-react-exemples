import React, { useEffect, useState } from 'react'
import App from './App'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'
import auth0 from 'auth0-js'

const auth = new auth0.WebAuth({
  domain: process.env.AUTH0_CLIENT_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
})

const login = () => {
  auth.authorize({
    responseType: 'id_token',
    // Doit être autorisée explicitement dans la configuration Auth0:
    redirectUri: document.location.origin + '/callback',
    scope: 'openid email',
  })
}

const logout = () => {
  sessionStorage.removeItem('token')
  auth.logout({
    // Doit être autorisée explicitement dans la configuration Auth0:
    returnTo: document.location.origin,
  })
}

const getCallbackIdToken = () =>
  document.location.pathname === '/callback'
    ? new URLSearchParams(document.location.hash.replace(/^#/, '')).get(
        'id_token',
      )
    : null

const authenticate = async (client, idToken) => {
  try {
    const {
      data: {
        authenticateUser: { id, token },
      },
    } = await client.mutate({
      mutation: gql`
        mutation authenticateUser($idToken: String!) {
          authenticateUser(idToken: $idToken) {
            id
            token
          }
        }
      `,
      variables: { idToken },
    })
    sessionStorage.setItem('token', idToken)
    sessionStorage.setItem('auth_token', token)
    const {
      data: {
        User: { email },
      },
    } = await client.query({
      query: gql`
        query user($id: ID!) {
          User(id: $id) {
            email
          }
        }
      `,
      variables: { id },
    })
    return { id, email }
  } catch (err) {
    console.error(err)
    return null
  }
}

const Authenticate = ({ children }) => {
  const client = useApolloClient()
  const [state, setState] = useState({ name: 'init' })
  useEffect(() => {
    ;(async () => {
      if (state.name !== 'init') return

      const callbackIdToken = getCallbackIdToken()
      if (callbackIdToken) {
        setState({ name: 'authenticating' })
        history.replaceState({}, '', '/')
        const user = await authenticate(client, callbackIdToken)
        if (user) {
          setState({ name: 'authenticated', user })
        } else {
          setState({ name: 'error' })
          // login()
        }
      } else {
        const storedToken = sessionStorage.getItem('token')
        if (storedToken) {
          const user = await authenticate(client, storedToken)
          if (user) {
            setState({ name: 'authenticated', user })
          } else {
            setState({ name: 'expired' })
            sessionStorage.removeItem('token')
            login()
          }
        } else {
          setState({ name: 'unauthenticated' })
          login()
        }
      }
    })()
  })

  switch (state.name) {
    case 'init':
      return <p>Loading…</p>
    case 'authenticating':
      return <p>Authenticating…</p>
    case 'error':
      return <p>An error occurred, redirecting to login…</p>
    case 'expired':
      return <p>Session expired, redirecting to login…</p>
    case 'unauthenticated':
      return <p>Redirecting to login…</p>
    case 'authenticated':
      return children(state.user, logout)
  }
}

export default Authenticate
