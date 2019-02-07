import React from 'react'
import { injectCounter } from './counter'

const CounterDisplay = ({ counter }) => (
  <span>
    Counter: <strong>{counter}</strong>
  </span>
)

export default injectCounter(CounterDisplay)
