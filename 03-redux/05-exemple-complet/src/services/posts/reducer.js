import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from './actions'

const initialState = {
  posts: [],
  error: null,
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_BEGIN:
      return { ...state, isFetching: true, error: null }
    case FETCH_POSTS_SUCCESS:
      return { ...state, isFetching: false, posts: action.posts }
    case FETCH_POSTS_ERROR:
      return { ...state, isFetching: false, error: action.error }
    default:
      return state
  }
}
