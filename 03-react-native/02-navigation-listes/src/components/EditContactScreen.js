import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import EditContact from './EditContact'
import SaveContactButton from './SaveContactButton'
import { actions } from '../store'

class EditContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const contact = navigation.getParam('contact')
    return {
      title: contact ? contact.name : 'Create contact',
      headerLeft: <Button onPress={() => navigation.pop()} title="Cancel" />,
      headerRight: <SaveContactButton navigation={navigation} />
    }
  }
  render() {
    return <EditContact />
  }
}

const mapDispatchToProps = {
  addNewContact: actions.addNewContact
}

export default connect(
  null,
  mapDispatchToProps
)(EditContactScreen)
