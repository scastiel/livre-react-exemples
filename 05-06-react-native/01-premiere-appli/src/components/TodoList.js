import React from 'react'
import { View, StyleSheet } from 'react-native'
import Todo from './Todo'

const TodoList = ({ todos, updateTodoLabel, toggleTodoStatus }) => (
  <View style={styles.todoList}>
    {todos.map(todo => (
      <Todo
        todo={todo}
        updateTodoLabel={label => updateTodoLabel(todo.id, label)}
        toggleTodoStatus={() => toggleTodoStatus(todo.id)}
        key={todo.id}
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  todoList: {
    flex: 1,
    alignItems: 'stretch'
  }
})

export default TodoList
