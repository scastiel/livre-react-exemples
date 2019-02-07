import React, { createContext, useState } from 'react'

const CounterContext = createContext()

const CounterProvider = ({ initialValue, children }) => {
  const [counter, setCounter] = useState(initialValue)
  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </CounterContext.Provider>
  )
}

const injectCounter = Comp => props => (
  <CounterContext.Consumer>
    {({ counter, setCounter }) => (
      <Comp {...props} counter={counter} setCounter={setCounter} />
    )}
  </CounterContext.Consumer>
)

export { CounterProvider, injectCounter }
