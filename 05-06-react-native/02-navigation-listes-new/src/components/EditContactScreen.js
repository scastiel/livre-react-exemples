import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import EditContact from './EditContact'
import SaveContactButton from './SaveContactButton'
import ContactName from './ContactName'
import { actions } from '../store'
import { withNavigation } from 'react-navigation'

class EditContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const contactId = navigation.getParam('contactId')
    const closeEdition = () => navigation.pop()
    return {
      headerTitle: (
        <ContactName contactId={contactId} defaultTitle="Create contact" />
      ),
      headerLeft: <Button onPress={closeEdition} title="Cancel" />,
      headerRight: (
        <SaveContactButton contactId={contactId} closeEdition={closeEdition} />
      ),
    }
  }
  goToTakePicture = () => {
    const { navigation } = this.props
    navigation.navigate('takePicture')
  }
  render() {
    return <EditContact goToTakePicture={this.goToTakePicture} />
  }
}

export default withNavigation(EditContactScreen)
