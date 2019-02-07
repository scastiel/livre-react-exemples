import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../store'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'

const EditContact = ({ contact, updateContact, navigation }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.pictureContainer}
        onPress={() => navigation.push('takePicture')}
      >
        {contact.photo ? (
          <Image style={styles.picture} source={contact.photo} />
        ) : (
          <Text>Add photo</Text>
        )}
      </TouchableOpacity>
      <View style={styles.editForm}>
        <Text style={styles.nameLabel}>Name</Text>
        <TextInput
          style={styles.nameInput}
          value={contact.name || ''}
          onChangeText={name => updateContact({ ...contact, name })}
          autoFocus
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  editForm: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
  },
  nameLabel: { marginRight: 16, fontWeight: 'bold' },
  nameInput: {},
  pictureContainer: {
    marginTop: 16,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 98,
    height: 98,
  },
})

const mapStateToProps = state => ({
  contact: state.contactToEditInfos,
})

const mapDispatchToProps = {
  updateContact: actions.updateContactToEdit,
}

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditContact),
)
