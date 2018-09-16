import React, { Component } from 'react'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../store'

class AddContactButton extends Component {
  onPress = () => {
    const { goToEditContact, setContactToEdit } = this.props
    setContactToEdit({ name: 'New contact' })
    goToEditContact()
  }
  render() {
    return <Button onPress={this.onPress} title="Add" />
  }
}

const mapDispatchToProps = {
  setContactToEdit: actions.setContactToEdit
}

export default connect(
  null,
  mapDispatchToProps
)(AddContactButton)
