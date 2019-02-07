import React, { createContext, useContext } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ backgroundColor, textColor, children }) => {
  return (
    <ThemeContext.Provider value={{ backgroundColor, textColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

const injectTheme = Comp => props => (
  <ThemeContext.Consumer>
    {({ backgroundColor, textColor }) => (
      <Comp
        {...props}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
    )}
  </ThemeContext.Consumer>
)

const ThemeConsumer = ({ children }) => (
  <ThemeContext.Consumer>
    {({ backgroundColor, textColor }) => children(backgroundColor, textColor)}
  </ThemeContext.Consumer>
)

const useTheme = () => {
  return useContext(ThemeContext)
}

export { ThemeProvider, injectTheme, ThemeConsumer, useTheme }
