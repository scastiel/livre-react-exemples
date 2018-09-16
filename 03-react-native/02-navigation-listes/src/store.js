import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  loading: false,
  contacts: [],
  error: null,
  contactToEditInfos: null
}

const actionTypes = {
  LOAD_CONTACTS: 'LOAD_CONTACTS',
  LOAD_CONTACTS_START: 'LOAD_CONTACTS_START',
  LOAD_CONTACTS_SUCCESS: 'LOAD_CONTACTS_SUCCESS',
  LOAD_CONTACTS_FAILURE: 'LOAD_CONTACTS_FAILURE',
  SET_CONTACT_TO_EDIT: 'SET_CONTACT_TO_EDIT',
  UPDATE_CONTACT_TO_EDIT: 'UPDATE_CONTACT_TO_EDIT',
  SAVE_CONTACT_TO_EDIT: 'SAVE_CONTACT_TO_EDIT'
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
  }),
  setContactToEdit: contact => ({
    type: actionTypes.SET_CONTACT_TO_EDIT,
    contact
  }),
  updateContactToEdit: contact => ({
    type: actionTypes.UPDATE_CONTACT_TO_EDIT,
    contact
  }),
  saveContactToEdit: contactId => ({
    type: actionTypes.SAVE_CONTACT_TO_EDIT,
    contactId
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
    case actionTypes.SET_CONTACT_TO_EDIT:
      return {
        ...state,
        contactToEditInfos: { ...action.contact }
      }
    case actionTypes.UPDATE_CONTACT_TO_EDIT:
      return {
        ...state,
        contactToEditInfos: { ...action.contact }
      }
    case actionTypes.SAVE_CONTACT_TO_EDIT:
      const { contacts, contactToEditInfos } = state
      if (action.contactId) {
        const contactIndex = contacts.findIndex(c => c.id === action.contactId)
        const contactsBefore = contacts.slice(0, contactIndex)
        const contactsAfter = contacts.slice(contactIndex + 1)
        return {
          ...state,
          contacts: [...contactsBefore, contactToEditInfos, ...contactsAfter]
        }
      } else {
        return {
          ...state,
          contacts: [{ id: Math.random(), ...contactToEditInfos }, ...contacts]
        }
      }
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunk))
