import React from 'react'
import { injectTheme } from './theme'

const Box = ({ backgroundColor, textColor, text }) => {
  const style = { backgroundColor: backgroundColor, color: textColor }
  return <div style={style}>{text}</div>
}

export default injectTheme(Box)
