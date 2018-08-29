import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Stopwatch from './Stopwatch'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Stopwatch />
  </Provider>,
  document.getElementById('app')
)
