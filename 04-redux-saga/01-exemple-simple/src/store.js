import { rootSaga } from './saga'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'

// Actions
const getUser = () => ({ type: 'getUser' })
const getUserSuccess = user => ({ type: 'getUserSuccess', payload: user })

// Reducer
const initialState = { userId: 2, user: undefined }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'getUserSuccess':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

// Selectors
const selectUserId = state => state.userId

// Store
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export { store, getUser, getUserSuccess, selectUserId }
