import createSagaMiddleware from '@redux-saga/core'
import { fork } from '@redux-saga/core/effects'
import { createStore, applyMiddleware, combineReducers } from 'redux'

// Search service
import { namespace as searchNamespace } from './services/search'
import { rootSaga as searchSaga } from './services/search/saga'
import { reducer as searchReducer } from './services/search/reducer'

const rootReducer = combineReducers({
  [searchNamespace]: searchReducer,
})

function* rootSaga() {
  yield fork(searchSaga)
}

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
