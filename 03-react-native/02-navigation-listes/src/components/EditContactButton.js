import React, { Component } from 'react'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../store'

class EditContactButton extends Component {
  render() {
    const { contactId, contacts, navigation, setContactToEdit } = this.props
    const contact = contacts.find(c => c.id === contactId)
    return (
      <Button
        onPress={() => {
          setContactToEdit(contactId, contact)
          navigation.navigate('editContact', { contact })
        }}
        title="Edit"
      />
    )
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
