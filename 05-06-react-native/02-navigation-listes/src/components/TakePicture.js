import React, { createRef } from 'react'
import { Text, View, TouchableOpacity, Button } from 'react-native'
import { Camera, Permissions } from 'expo'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  constructor() {
    this.camera = createRef()
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={this.camera}
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            />
          </Camera>
          <Button
            title="Take picture"
            onPress={() => {
              this.camera.current.takePictureAsync()
            }}
          />
        </View>
      )
    }
  }
}
