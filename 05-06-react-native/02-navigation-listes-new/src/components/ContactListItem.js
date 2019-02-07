import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

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
          {contact.photo && (
            <Image style={styles.picture} source={contact.photo} />
          )}
          <Text>{contact.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  contact: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  picture: {
    width: 47,
    height: 47,
    marginRight: 16,
  },
})

export default ContactListItem
