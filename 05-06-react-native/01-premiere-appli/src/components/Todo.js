import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight
} from 'react-native'

class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodoLabel: PropTypes.func,
    toggleTodoStatus: PropTypes.func
  }
  static defaultProps = {
    updateTodoLabel: () => {},
    toggleTodoStatus: () => {}
  }
  state = {
    editMode: false,
    label: this.props.todo.label
  }
  onChange = label => {
    this.setState({ label })
  }
  onSavePress = () => {
    const { updateTodoLabel } = this.props
    const { label } = this.state
    updateTodoLabel(label)
    this.setState({ editMode: false })
  }
  onCancelPress = () => {
    this.setState({
      editMode: false,
      label: this.props.todo.label
    })
  }
  onEditPress = () => {
    this.setState({
      editMode: true
    })
  }
  onTodoPress = () => {
    const { toggleTodoStatus } = this.props
    toggleTodoStatus()
  }
  renderViewMode = () => {
    const { todo } = this.props
    return (
      <Fragment>
        <TouchableHighlight
          style={styles.todoLabelView}
          onPress={this.onTodoPress}
          underlayColor="white"
        >
          <Text style={styles.todoLabel}>
            {todo.isDone && '✅ '} {todo.label}
          </Text>
        </TouchableHighlight>
        <Button title="Edit" onPress={this.onEditPress} />
      </Fragment>
    )
  }
  renderEditMode = () => {
    const { label } = this.state
    return (
      <Fragment>
        <TextInput
          style={[styles.editInput, styles.todoLabel, styles.todoLabelView]}
          value={label}
          onChangeText={this.onChange}
          autoFocus
        />
        <Button
          style={styles.editButton}
          title="Save"
          onPress={this.onSavePress}
        />
        <Button
          style={styles.editButton}
          title="Cancel"
          onPress={this.onCancelPress}
        />
      </Fragment>
    )
  }
  render() {
    const { editMode } = this.state
    return (
      <View style={styles.todo}>
        {editMode ? this.renderEditMode() : this.renderViewMode()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  todo: {
    padding: 10,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center'
  },
  todoLabelView: {
    padding: 10,
    flex: 1
  },
  todoLabel: {
    fontSize: 18
  }
})

export default Todo
