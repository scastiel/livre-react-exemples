import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

const ContactName = ({ contactId, defaultTitle, contacts }) => {
  const contact = contactId ? contacts.find(c => c.id === contactId) : null
  return <Text>{(contact && contact.name) || defaultTitle}</Text>
}

const mapStateToProps = state => ({ contacts: state.contacts })

export default connect(mapStateToProps)(ContactName)
