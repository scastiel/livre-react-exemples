import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  loading: false,
  contacts: [],
  error: null
}

const actionTypes = {
  LOAD_CONTACTS: 'LOAD_CONTACTS',
  LOAD_CONTACTS_START: 'LOAD_CONTACTS_START',
  LOAD_CONTACTS_SUCCESS: 'LOAD_CONTACTS_SUCCESS',
  LOAD_CONTACTS_FAILURE: 'LOAD_CONTACTS_FAILURE'
}

export const actions = {
  loadContacts: () => async dispatch => {
    dispatch(actions.loadContactsStart())
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const contacts = await res.json()
      dispatch(actions.loadContactsSuccess(contacts))
    } catch (err) {
      dispatch(actions.loadContactsFailure(err))
    }
  },
  loadContactsStart: () => ({ type: actionTypes.LOAD_CONTACTS_START }),
  loadContactsSuccess: contacts => ({
    type: actionTypes.LOAD_CONTACTS_SUCCESS,
    contacts
  }),
  loadContactsFailure: error => ({
    type: actionTypes.LOAD_CONTACTS_FAILURE,
    error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CONTACTS_START:
      return { ...state, error: null, loading: true }
    case actionTypes.LOAD_CONTACTS_SUCCESS:
      return { ...state, loading: false, contacts: action.contacts }
    case actionTypes.LOAD_CONTACTS_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunk))
