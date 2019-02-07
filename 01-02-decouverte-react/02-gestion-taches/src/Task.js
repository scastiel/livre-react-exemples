import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { taskShape } from './shapes'
import './Task.css'

const Task = ({ task, setTaskStatus }) => {
  const handleInputChange = event => {
    setTaskStatus(event.target.checked)
  }

  const className = 'task' + (task.isDone ? ' task--done' : '')

  return (
    <label className={className}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={handleInputChange}
      />{' '}
      {task.label}
    </label>
  )
}

Task.propTypes = {
  task: taskShape.isRequired,
  setTaskStatus: PropTypes.func
}
Task.defaultProps = {
  setTaskStatus: () => {}
}

export default Task
