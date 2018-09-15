import React, { Component } from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import ContactListItem from './ContactListItem'

class ContactsList extends Component {
  static propTypes = {
    goToContactDetails: PropTypes.func.isRequired
  }
  state = {
    loading: false,
    contacts: []
  }
  loadContacts = async () => {
    this.setState({ loading: true })
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const contacts = await res.json()
    this.setState({ loading: false, contacts })
  }
  componentDidMount() {
    this.loadContacts()
  }
  render() {
    const { goToContactDetails } = this.props
    const { loading, contacts } = this.state
    return (
      <FlatList
        data={contacts}
        keyExtractor={contact => String(contact.id)}
        refreshing={loading}
        onRefresh={this.loadContacts}
        renderItem={({ item: contact }) => (
          <ContactListItem
            contact={contact}
            openDetails={() => goToContactDetails(contact)}
          />
        )}
      />
    )
  }
}

export default ContactsList
