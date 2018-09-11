import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import TodoList from './TodoList'

class App extends Component {
  state = {
    todos: [
      { id: 1, label: 'Buy some milk' },
      { id: 2, label: 'Learn some React' }
    ],
    nextTodoId: 3
  }
  updateTodoLabel = (todoId, label) => {
    const { todos } = this.state
    const todoIndex = todos.findIndex(t => t.id === todoId)
    const todosBefore = todos.slice(0, todoIndex)
    const todosAfter = todos.slice(todoIndex + 1)
    const newtodo = { ...todos[todoIndex], label }
    this.setState({
      todos: [...todosBefore, newtodo, ...todosAfter]
    })
  }
  toggleTodoStatus = todoId => {
    const { todos } = this.state
    const todoIndex = todos.findIndex(t => t.id === todoId)
    const todosBefore = todos.slice(0, todoIndex)
    const todosAfter = todos.slice(todoIndex + 1)
    const newtodo = { ...todos[todoIndex], isDone: !todos[todoIndex].isDone }
    this.setState({
      todos: [...todosBefore, newtodo, ...todosAfter]
    })
  }
  createTask = () => {
    this.setState({
      todos: [
        ...this.state.todos,
        { id: this.state.nextTodoId, label: 'New task' }
      ],
      nextTodoId: this.state.nextTodoId + 1
    })
  }
  render() {
    const { todos } = this.state
    return (
      <View style={styles.container}>
        <TodoList
          todos={todos}
          updateTodoLabel={this.updateTodoLabel}
          toggleTodoStatus={this.toggleTodoStatus}
        />
        <View style={styles.createTaskButton}>
          <Button onPress={this.createTask} title="New task" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
  createTaskButton: {
    margin: 10
  }
})

export default App
