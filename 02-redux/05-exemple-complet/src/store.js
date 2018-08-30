import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import postsDetailsReducer from './services/postsDetails/reducer'
import postsReducer from './services/posts/reducer'
import routingReducer from './services/routing/reducer'

const reducer = combineReducers({
  postsDetails: postsDetailsReducer,
  posts: postsReducer,
  routing: routingReducer
})

export default createStore(reducer, applyMiddleware(thunk))
