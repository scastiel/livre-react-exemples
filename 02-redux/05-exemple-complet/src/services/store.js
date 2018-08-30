import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import postsDetailsReducer from './postsDetails/reducer'
import postsReducer from './posts/reducer'
import routingReducer from './routing/reducer'

const reducer = combineReducers({
  postsDetails: postsDetailsReducer,
  posts: postsReducer,
  routing: routingReducer
})

export default createStore(reducer, applyMiddleware(thunk))
