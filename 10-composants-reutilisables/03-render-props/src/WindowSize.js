import React, { Component } from 'react'

class WindowSize extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
  }
  onResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  componentDidMount() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }
  render() {
    const { width, height } = this.state
    return this.props.children(width, height)
  }
}

export default WindowSize
