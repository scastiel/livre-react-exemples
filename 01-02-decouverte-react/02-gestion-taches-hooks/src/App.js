import React, { Component } from 'react'
import TaskList from './TaskList'
import TaskForm from './TaskForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextId: null,
      tasks: null,
      isFetching: true,
      hasError: false
    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users/10/todos')
      .then(res => res.json())
      .then(tasks => {
        this.setState({
          isFetching: false,
          // On doit convertir les tâches depuis le format reçu depuis
          // l’API et le format des tâches que l’on gère.
          tasks: tasks.map(task => ({
            id: task.id,
            label: task.title,
            isDone: false
          })),
          // Pour le nextId on prend l’ID maximal auquel on ajoute 1
          nextId: Math.max(...tasks.map(task => task.id)) + 1
        })
      })
      .catch(() => this.setState({ hasError: true }))
  }
  addTask = label => {
    const newTask = { id: this.state.nextId, label }
    this.setState({
      nextId: this.state.nextId + 1,
      tasks: [...this.state.tasks, newTask]
    })
  }
  setTaskStatus = (taskId, isDone) => {
    const { tasks } = this.state
    const taskIndex = tasks.findIndex(t => t.id === taskId)
    const tasksBefore = tasks.slice(0, taskIndex)
    const tasksAfter = tasks.slice(taskIndex + 1)
    const newTask = { ...tasks[taskIndex], isDone }
    this.setState({
      tasks: [...tasksBefore, newTask, ...tasksAfter]
    })
  }
  render() {
    if (this.state.hasError) {
      return <p>Oups, une erreur s’est produite…</p>
    }
    if (this.state.isFetching) {
      return <p>Chargement en cours…</p>
    }
    return (
      <div>
        <h1>Tâches</h1>
        <TaskList tasks={this.state.tasks} setTaskStatus={this.setTaskStatus} />
        <TaskForm addTask={this.addTask} />
      </div>
    )
  }
}

export default App
