import React from 'react'
import { ThemeConsumer } from './theme'

const Box = ({ text }) => (
  <ThemeConsumer>
    {(backgroundColor, textColor) => (
      <div style={{ backgroundColor: backgroundColor, color: textColor }}>
        {text}
      </div>
    )}
  </ThemeConsumer>
)

export default Box
