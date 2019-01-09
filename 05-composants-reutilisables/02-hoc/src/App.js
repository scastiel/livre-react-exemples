import React, { Component } from 'react'
import PhoneNumberInput from './PhoneNumberInput'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { phoneNumber: '' }
  }
  onChange = event => {
    this.setState({ phoneNumber: event.target.value })
  }
  render() {
    return (
      <div>
        <PhoneNumberInput
          value={this.state.phoneNumber}
          onChange={this.onChange}
          style={{ padding: 5, fontSize: 'large' }}
        />
        <br />
        <code>{JSON.stringify(this.state)}</code>
      </div>
    )
  }
}

export default App
