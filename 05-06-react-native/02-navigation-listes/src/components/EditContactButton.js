import React, { Component } from 'react'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../store'

class EditContactButton extends Component {
  onPress = () => {
    const {
      contactId,
      contacts,
      goToEditContact,
      setContactToEdit
    } = this.props
    const contact = contacts.find(c => c.id === contactId)
    setContactToEdit(contact)
    goToEditContact(contactId)
  }
  render() {
    return <Button onPress={this.onPress} title="Edit" />
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts
})

const mapDispatchToProps = {
  setContactToEdit: actions.setContactToEdit
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContactButton)
