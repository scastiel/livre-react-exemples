import {
  FETCH_POST_DETAILS_BEGIN,
  FETCH_POST_DETAILS_SUCCESS,
  FETCH_POST_DETAILS_ERROR
} from './actions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_DETAILS_BEGIN:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          isFetching: true,
          error: null
        }
      }
    case FETCH_POST_DETAILS_SUCCESS:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          isFetching: false,
          details: action.details
        }
      }
    case FETCH_POST_DETAILS_ERROR:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          isFetching: false,
          error: action.error
        }
      }
    default:
      return state
  }
}
