import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewContact from './ViewContact'
import EditContactButton from './EditContactButton'

class ViewContactScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Details',
    headerRight: (
      <EditContactButton
        contactId={navigation.getParam('contactId')}
        navigation={navigation}
      />
    )
  })
  render() {
    const { navigation, contacts } = this.props
    const contactId = navigation.getParam('contactId')
    const contact = contacts.find(c => c.id === contactId)
    return <ViewContact contact={contact} />
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts
})

export default connect(mapStateToProps)(ViewContactScreen)
