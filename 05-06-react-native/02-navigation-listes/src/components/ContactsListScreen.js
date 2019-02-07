import React, { Component } from 'react'
import { Button } from 'react-native'
import ContactsList from './ContactsList'
import AddContactButton from './AddContactButton'

class ContactsListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <AddContactButton
        goToEditContact={() => navigation.push('editContact')}
      />
    )
  })
  goToContactDetails = contactId => {
    const { navigation } = this.props
    navigation.navigate('viewContact', { contactId })
  }
  render() {
    return <ContactsList goToContactDetails={this.goToContactDetails} />
  }
}

export default ContactsListScreen
