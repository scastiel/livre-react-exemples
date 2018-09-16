import React, { Component } from 'react'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../store'

class AddContactButton extends Component {
  render() {
    const { navigation, setContactToEdit } = this.props
    return (
      <Button
        onPress={() => {
          setContactToEdit(null, { name: 'New contact' })
          navigation.navigate('editContact')
        }}
        title="Add"
      />
    )
  }
}

const mapDispatchToProps = {
  setContactToEdit: actions.setContactToEdit
}

export default connect(
  null,
  mapDispatchToProps
)(AddContactButton)
