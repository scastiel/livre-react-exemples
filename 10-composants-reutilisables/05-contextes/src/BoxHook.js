import React from 'react'
import { ThemeConsumer, useTheme } from './theme'

const Box = ({ text }) => {
  const { backgroundColor, textColor } = useTheme()
  return (
    <div style={{ backgroundColor: backgroundColor, color: textColor }}>
      {text}
    </div>
  )
}

export default Box
