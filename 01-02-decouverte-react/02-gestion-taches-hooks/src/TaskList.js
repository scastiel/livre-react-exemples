import React from 'react'
import Task from './Task'
import './TaskList.css'

const TaskList = ({ tasks, setTaskStatus }) => (
  <ul>
    {tasks.map(task => (
      <li key={task.id} className="task-item">
        <Task
          task={task}
          setTaskStatus={isDone => setTaskStatus(task.id, isDone)}
        />
      </li>
    ))}
  </ul>
)

export default TaskList
