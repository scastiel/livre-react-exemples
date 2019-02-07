import { select, call, put, takeEvery } from '@redux-saga/core/effects'
import * as api from './api'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'

export const actionTypes = {
  GET_CONTACT: 'GET_CONTACT',
  GET_CONTACT_SUCCESS: 'GET_CONTACT_SUCCESS',
  GET_CONTACT_FAILURE: 'GET_CONTACT_FAILURE',
}

export const actions = {
  getContact: () => ({ type: actionTypes.GET_CONTACT }),
  getContactSuccess: contact => ({
    type: actionTypes.GET_CONTACT_SUCCESS,
    payload: contact,
  }),
  getContactFailure: error => ({
    type: actionTypes.GET_CONTACT_FAILURE,
    payload: error,
  }),
}

const initialState = {
  contactId: 2,
  loading: false,
  error: false,
  contact: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTACT:
      return { ...state, loading: true, error: false }
    case actionTypes.GET_CONTACT_SUCCESS:
      return { ...state, loading: false, contact: action.payload }
    case actionTypes.GET_CONTACT_FAILURE:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export const selectors = {
  selectContactId: state => state.contactId,
  selectLoading: state => state.loading,
  selectError: state => state.error,
  selectContact: state => state.contact,
}

function* getContactSaga() {
  try {
    const contactId = yield select(selectors.selectContactId)
    const contact = yield call(api.getContact, contactId)
    yield put(actions.getContactSuccess(contact))
  } catch (err) {
    yield put(actions.getContactFailure(err))
  }
}

export function* rootSaga() {
  yield takeEvery(actionTypes.GET_CONTACT, getContactSaga)
}

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
