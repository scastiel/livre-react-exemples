import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { ContactForm } from './ContactForm'
import { store } from './store'
import { Provider } from 'react-redux'
import { App } from './App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
