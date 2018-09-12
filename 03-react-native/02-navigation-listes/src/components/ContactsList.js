import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import PropTypes from 'prop-types'

class ContactsList extends Component {
  static propTypes = {
    goToContactDetails: PropTypes.func.isRequired
  }
  state = {
    contacts: [{ id: 1, name: 'John Smith' }]
  }
  render() {
    const { goToContactDetails } = this.props
    const [contact] = this.state.contacts
    return (
      <View>
        <Text>Name: {contact.name}</Text>
        <Button
          onPress={() => goToContactDetails(contact)}
          title="Contact details"
        />
      </View>
    )
  }
}

export default ContactsList
