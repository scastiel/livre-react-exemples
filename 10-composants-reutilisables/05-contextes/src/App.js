import React from 'react'
import BoxHOC from './BoxHOC'
import BoxRP from './BoxRP'
import BoxHook from './BoxHook'
import { ThemeProvider } from './theme'
import CounterDisplay from './CounterDisplay'
import IncrementCounterButton from './IncrementCounterButton'
import { CounterProvider } from './counter'

const App = () => (
  <ThemeProvider backgroundColor="red" textColor="blue">
    <BoxHOC text="With a high-order component!" />
    <BoxRP text="With a render prop!" />
    <BoxHook text="With a hook!" />
    <CounterProvider initialValue={1}>
      <CounterDisplay />
      <IncrementCounterButton />
    </CounterProvider>
  </ThemeProvider>
)

export default App
