import { createStore } from 'redux'

const initialState = { counter: 0 }

const actionTypes = {
  INCREMENT: 'increment',
}

export const actions = {
  increment: () => ({
    type: actionTypes.INCREMENT,
  }),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { ...state, counter: state.counter + 1 }
    default:
      return state
  }
}

export default createStore(reducer)
