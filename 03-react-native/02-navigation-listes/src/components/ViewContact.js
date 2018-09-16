import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

class ViewContact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired
  }
  render() {
    const { contact } = this.props
    return (
      <View style={styles.contactDetails}>
        <Text style={styles.nameLabel}>Name</Text>
        <Text>{contact.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contactDetails: {
    padding: 16,
    flexDirection: 'row'
  },
  nameLabel: { marginRight: 16, fontWeight: 'bold' }
})

export default ViewContact
