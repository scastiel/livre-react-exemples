import React, { Component } from 'react'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../store'

class SaveContactButton extends Component {
  onPress = () => {
    const { contactId, closeEdition, saveContact } = this.props
    saveContact(contactId)
    closeEdition()
  }
  render() {
    return <Button onPress={this.onPress} title="Save" />
  }
}

const mapDispatchToProps = {
  saveContact: actions.saveContactToEdit
}

export default connect(
  null,
  mapDispatchToProps
)(SaveContactButton)
