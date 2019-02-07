import { createStore } from 'redux'
import { createActions, handleActions } from 'redux-actions'

const initialState = { counter: 0 }

export const actions = createActions({
  INCREMENT: () => ({}),
  ADD: value => ({ value })
})

const reducer = handleActions(
  {
    [actions.increment]: state => ({ ...state, counter: state.counter + 1 }),
    [actions.add]: (state, { payload: { value } }) => ({
      ...state,
      counter: state.counter + value
    })
  },
  initialState
)

export default createStore(reducer)
