import { createStore } from 'redux'
// import { createStore } from './own-redux'

// Initial state
const initialState = { counter: 0 }

// Action types
const INCREMENT = 'increment'

// Action creators
const increment = () => ({
  type: INCREMENT
})

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(reducer)

// Render function
const render = () => {
  const { counter } = store.getState()
  document.getElementById('counter').innerHTML = counter
}

// Store subscriptions
store.subscribe(render)

// Event handlers
window.handleIncrement = () => {
  store.dispatch(increment())
}

// Initial rendering
render()
