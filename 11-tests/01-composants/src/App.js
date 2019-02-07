import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, actions } from './store'
import { ContactForm } from './ContactForm'

export const App = () => {
  const loading = useSelector(selectors.selectLoading)
  const error = useSelector(selectors.selectError)
  const contact = useSelector(selectors.selectContact)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !error && !contact) {
      dispatch(actions.getContact())
    }
  }, [loading, error, contact])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Something bad happened.</p>
  }

  if (contact) {
    return <ContactForm contact={contact} updateContact={console.log} />
  }

  return null
}
