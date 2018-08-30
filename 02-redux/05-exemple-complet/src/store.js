import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  posts: [],
  error: null,
  isFetching: false,
  openedPost: null,
  postsDetails: {}
}

export const actionsTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POSTS_BEGIN: 'FETCH_POSTS_BEGIN',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_ERROR: 'FETCH_POSTS_ERROR',
  OPEN_POST: 'OPEN_POST',
  CLOSE_POST: 'CLOSE_POST',
  FETCH_POST_DETAILS: 'FETCH_POST_DETAILS',
  FETCH_POST_DETAILS_BEGIN: 'FETCH_POST_DETAILS_BEGIN',
  FETCH_POST_DETAILS_SUCCESS: 'FETCH_POST_DETAILS_SUCCESS',
  FETCH_POST_DETAILS_ERROR: 'FETCH_POST_DETAILS_ERROR'
}

export const actions = {
  fetchPosts: () => async dispatch => {
    dispatch(actions.fetchPostsBegin())
    try {
      const res = await fetch('https://www.reddit.com/r/reactjs.json')
      const posts = (await res.json()).data.children.map(child => child.data)
      dispatch(actions.fetchPostsSuccess(posts))
    } catch (err) {
      dispatch(actions.fetchPostsError(err))
    }
  },
  fetchPostsBegin: () => ({ type: actionsTypes.FETCH_POSTS_BEGIN }),
  fetchPostsSuccess: posts => ({
    type: actionsTypes.FETCH_POSTS_SUCCESS,
    posts
  }),
  fetchPostsError: error => ({ type: actionsTypes.FETCH_POSTS_ERROR, error }),
  openPost: post => ({ type: actionsTypes.OPEN_POST, post }),
  closePost: () => ({ type: actionsTypes.CLOSE_POST }),
  fetchPostDetails: post => async dispatch => {
    dispatch(actions.fetchPostDetailsBegin(post))
    try {
      const res = await fetch(`https://www.reddit.com${post.permalink}.json`)
      const details = (await res.json())[0].data.children[0].data
      dispatch(actions.fetchPostDetailsSuccess(post, details))
    } catch (err) {
      dispatch(actions.fetchPostDetailsError(post, err))
    }
  },
  fetchPostDetailsBegin: post => ({
    type: actionsTypes.FETCH_POST_DETAILS_BEGIN,
    post
  }),
  fetchPostDetailsSuccess: (post, details) => ({
    type: actionsTypes.FETCH_POST_DETAILS_SUCCESS,
    post,
    details
  }),
  fetchPostDetailsError: (post, error) => ({
    type: actionsTypes.FETCH_POST_DETAILS_ERROR,
    post,
    error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_POSTS_BEGIN:
      return { ...state, isFetching: true, error: null }
    case actionsTypes.FETCH_POSTS_SUCCESS:
      return { ...state, isFetching: false, posts: action.posts }
    case actionsTypes.FETCH_POSTS_ERROR:
      return { ...state, isFetching: false, error: action.error }
    case actionsTypes.OPEN_POST:
      return { ...state, openedPost: action.post }
    case actionsTypes.CLOSE_POST:
      return { ...state, openedPost: null }
    case actionsTypes.FETCH_POST_DETAILS_BEGIN:
      return {
        ...state,
        postsDetails: {
          ...state.postsDetails,
          [action.post.id]: {
            ...state.postsDetails[action.post.id],
            isFetching: true,
            error: null
          }
        }
      }
    case actionsTypes.FETCH_POST_DETAILS_SUCCESS:
      return {
        ...state,
        postsDetails: {
          ...state.postsDetails,
          [action.post.id]: {
            ...state.postsDetails[action.post.id],
            isFetching: false,
            details: action.details
          }
        }
      }
    case actionsTypes.FETCH_POST_DETAILS_ERROR:
      return {
        ...state,
        postsDetails: {
          ...state.postsDetails,
          [action.post.id]: {
            ...state.postsDetails[action.post.id],
            isFetching: false,
            error: action.error
          }
        }
      }
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunk))
