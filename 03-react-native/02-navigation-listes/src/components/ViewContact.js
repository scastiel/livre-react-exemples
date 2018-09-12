import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

class ViewContact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired
  }
  render() {
    const { contact } = this.props
    return <Text>Details for {contact.name}</Text>
  }
}

export default ViewContact
