import React, { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const onResize = event => {
    const { innerWidth, innerHeight } = event.target
    setWidth(innerWidth)
    setHeight(innerHeight)
  }

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return [width, height]
}

const App = () => {
  const [width, height] = useWindowSize()
  return (
    <span>
      {width}x{height}
    </span>
  )
}

export default App
