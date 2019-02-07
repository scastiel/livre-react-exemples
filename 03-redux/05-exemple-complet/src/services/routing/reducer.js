import { OPEN_POST, CLOSE_POST } from './actions'

const initialState = { openedPost: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POST:
      return { ...state, openedPost: action.post }
    case CLOSE_POST:
      return { ...state, openedPost: null }
    default:
      return state
  }
}
