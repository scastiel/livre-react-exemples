import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewContact from './ViewContact'
import EditContactButton from './EditContactButton'
import ContactName from './ContactName'

class ViewContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const contactId = navigation.getParam('contactId')
    return {
      headerTitle: <ContactName contactId={contactId} />,
      headerRight: (
        <EditContactButton
          contactId={contactId}
          goToEditContact={contactId =>
            navigation.push('editContact', { contactId })
          }
        />
      )
    }
  }
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
