import React from 'react'
import WindowSize from './WindowSize'

const App = () => (
  <WindowSize>
    {(width, height) => (
      <span>
        {width}x{height}
      </span>
    )}
  </WindowSize>
)

export default App
