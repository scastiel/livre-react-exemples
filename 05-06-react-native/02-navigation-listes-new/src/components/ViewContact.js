import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'

class ViewContact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
  }
  render() {
    const { contact } = this.props
    return (
      <>
        {contact.photo && (
          <View style={styles.pictureContainer}>
            <Image style={styles.picture} source={contact.photo} />
          </View>
        )}
        <View style={styles.contactDetails}>
          <Text style={styles.nameLabel}>Name</Text>
          <Text>{contact.name}</Text>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  contactDetails: {
    padding: 16,
    flexDirection: 'row',
  },
  nameLabel: { marginRight: 16, fontWeight: 'bold' },
  pictureContainer: {
    marginTop: 16,
    alignSelf: 'center',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 98,
    height: 98,
  },
})

export default ViewContact
