import React, { Component } from 'react'
import TakePicture from './TakePicture'

class TakePictureScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Take picture',
  }
  render() {
    return <TakePicture />
  }
}

export default TakePictureScreen
