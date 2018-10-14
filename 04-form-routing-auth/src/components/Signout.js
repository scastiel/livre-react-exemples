import React, { Component } from 'react'
import firebase from 'firebase/app'

class Signout extends Component {
  componentDidMount() {
    firebase.auth().signOut()
  }
  render() {
    return <p>Signing out…</p>
  }
}

export default Signout
