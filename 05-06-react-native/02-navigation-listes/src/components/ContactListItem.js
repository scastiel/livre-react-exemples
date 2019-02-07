import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class ContactListItem extends Component {
  onPress = () => {
    const { openDetails } = this.props
    openDetails()
  }
  render() {
    const { contact } = this.props
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.contact}>
          <Text>{contact.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  contact: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  }
})

export default ContactListItem
