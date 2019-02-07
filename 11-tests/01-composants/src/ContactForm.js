import React, { useState, useCallback } from 'react'
import { Error } from './Error'

export const ContactForm = ({ contact, updateContact }) => {
  const [name, setName] = useState(contact.name)

  const onChangeName = useCallback(
    event => {
      setName(event.target.value)
    },
    [setName],
  )
  const onSubmit = useCallback(event => {
    event.preventDefault()
    if (name !== '') {
      updateContact({ name })
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name: <input name="name" value={name} onChange={onChangeName} />
        <br />
        {name === '' && <Error message="Please enter a name." />}
      </label>
      <br />
      <button type="submit">OK</button>
    </form>
  )
}
