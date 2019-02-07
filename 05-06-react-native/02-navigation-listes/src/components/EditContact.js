import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { actions } from '../store'

const EditContact = ({ contact, updateContact }) => {
  return (
    <View style={styles.editForm}>
      <Text style={styles.nameLabel}>Name</Text>
      <TextInput
        style={styles.nameInput}
        value={contact.name || ''}
        onChangeText={name => updateContact({ ...contact, name })}
        autoFocus
      />
    </View>
  )
}

const styles = StyleSheet.create({
  editForm: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16
  },
  nameLabel: { marginRight: 16, fontWeight: 'bold' },
  nameInput: {}
})

const mapStateToProps = state => ({
  contact: state.contactToEditInfos
})

const mapDispatchToProps = {
  updateContact: actions.updateContactToEdit
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContact)
