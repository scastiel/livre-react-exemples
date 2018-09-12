import React, { Component } from 'react'
import ViewContact from './ViewContact'

class ViewContactScreen extends Component {
  static navigationOptions = {
    title: 'Details'
  }
  render() {
    const { navigation } = this.props
    const contact = navigation.getParam('contact')
    return <ViewContact contact={contact} />
  }
}

export default ViewContactScreen
