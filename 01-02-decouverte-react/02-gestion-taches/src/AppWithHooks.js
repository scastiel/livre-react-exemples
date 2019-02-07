import React, { useState, useCallback, useEffect } from 'react'
import TaskList from './TaskList'
import TaskForm from './TaskForm'

const App = () => {
  const [nextId, setNextId] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasFetchedFirst, setHasFetchedFirst] = useState(false)

  const setTaskStatus = useCallback(
    (taskId, isDone) => {
      const taskIndex = tasks.findIndex(t => t.id === taskId)
      const tasksBefore = tasks.slice(0, taskIndex)
      const tasksAfter = tasks.slice(taskIndex + 1)
      const newTask = { ...tasks[taskIndex], isDone }
      setTasks([...tasksBefore, newTask, ...tasksAfter])
    },
    [tasks],
  )

  const addTask = useCallback(
    label => {
      const newTask = { id: nextId, label }
      setNextId(nextId + 1)
      setTasks([...tasks, newTask])
    },
    [nextId, tasks],
  )

  useEffect(() => {
    if (!hasFetchedFirst) {
      setHasFetchedFirst(true)
      setHasError(false)
      setIsFetching(true)
      fetch('https://jsonplaceholder.typicode.com/users/10/todos')
        .then(res => res.json())
        .then(newTasks => {
          setIsFetching(false)
          setTasks(
            newTasks.map(task => ({
              id: task.id,
              label: task.title,
              isDone: false,
            })),
          )
          setNextId(Math.max(...newTasks.map(task => task.id)) + 1)
        })
        .catch(() => setHasError(true))
    }
  })

  if (hasError) {
    return <p>Oups, une erreur s’est produite…</p>
  }
  if (isFetching) {
    return <p>Chargement en cours…</p>
  }

  return (
    <div>
      <h1>Tâches</h1>
      <TaskList tasks={tasks} setTaskStatus={setTaskStatus} />
      <TaskForm addTask={addTask} />
    </div>
  )
}

export default App
