import React, { Component, createRef } from 'react'
import { Text, View, TouchableOpacity, Button, StyleSheet } from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { actions } from '../store'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class TakePicture extends Component {
  state = {
    hasCameraPermission: null,
  }
  camera = createRef()

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  takePicture = async () => {
    const { contact, updateContact, navigation } = this.props
    const photo = await this.camera.current.takePictureAsync()
    updateContact({ ...contact, photo })
    navigation.goBack()
  }

  render() {
    const { hasCameraPermission, photos } = this.state
    if (hasCameraPermission === null) {
      return <Text>Waiting for permission…</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>We need permission to access camera.</Text>
    }
    return (
      <View style={styles.container}>
        <Camera
          ref={this.camera}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        />
        <Button title="Take picture" onPress={this.takePicture} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
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
  )(TakePicture),
)
