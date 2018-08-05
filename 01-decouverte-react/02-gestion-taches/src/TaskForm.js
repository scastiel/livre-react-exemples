import React, { Component } from 'react'

class TaskForm extends Component {
  constructor() {
    super()
    this.state = { label: '' }
  }
  handleInputChange = event => {
    this.setState({ label: event.target.value })
  }
  handleButtonClick = () => {
    this.props.addTask(this.state.label)
    this.setState({ label: '' })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.label}
          placeholder="Nouvelle tâche"
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleButtonClick}>Ajouter</button>
      </div>
    )
  }
}

export default TaskForm
