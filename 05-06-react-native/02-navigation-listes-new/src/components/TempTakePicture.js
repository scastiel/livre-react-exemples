import React, { Component, createRef } from 'react'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { Text, Image, View, Button, StyleSheet, ScrollView } from 'react-native'

class TakePictureTemp extends Component {
  state = {
    hasCameraPermission: null,
    photos: [],
  }
  camera = createRef()

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  takePicture = async () => {
    const photo = await this.camera.current.takePictureAsync()
    this.setState({ photos: [photo, ...this.state.photos] })
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
        <View style={styles.picturesContainer}>
          <ScrollView horizontal>
            {photos.map((photo, index) => (
              <Image key={index} style={styles.picture} source={photo} />
            ))}
          </ScrollView>
        </View>
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
  picturesContainer: {
    height: 100,
    flexDirection: 'row',
  },
  picture: {
    width: 100,
    height: 100,
  },
})

export default TakePictureTemp
