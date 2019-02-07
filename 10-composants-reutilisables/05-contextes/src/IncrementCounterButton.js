import React from 'react'
import { injectCounter } from './counter'

const IncrementCounterButton = ({ counter, setCounter }) => (
  <button onClick={() => setCounter(counter + 1)}>Increment</button>
)

export default injectCounter(IncrementCounterButton)
