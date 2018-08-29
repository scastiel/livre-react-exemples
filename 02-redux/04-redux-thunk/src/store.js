import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  time: 0,
  isRunning: false,
  intervalId: null
}

const actionTypes = {
  START: 'start',
  PAUSE: 'pause',
  RESET: 'reset',
  INCREMENT: 'increment'
}

export const actions = {
  start: () => dispatch => {
    const intervalId = setInterval(() => dispatch(actions.increment()), 100)
    dispatch({ type: actionTypes.START, intervalId })
  },
  pause: () => (dispatch, getState) => {
    const { intervalId } = getState()
    clearInterval(intervalId)
    dispatch({ type: actionTypes.PAUSE })
  },
  reset: () => ({
    type: actionTypes.RESET
  }),
  increment: () => ({
    type: actionTypes.INCREMENT
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START:
      return { ...state, isRunning: true, intervalId: action.intervalId }
    case actionTypes.PAUSE:
      return { ...state, isRunning: false, intervalId: null }
    case actionTypes.RESET:
      return { ...state, time: 0 }
    case actionTypes.INCREMENT:
      return { ...state, time: state.time + 100 }
    default:
      return state
  }
}

export default createStore(
  reducer,
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
