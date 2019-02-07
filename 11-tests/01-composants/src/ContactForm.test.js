import React from 'react'
import { shallow } from 'enzyme'
import { ContactForm } from './ContactForm'
import { Error } from './Error'

describe('ContactForm', () => {
  let wrapper
  let updateContact

  const getInput = () => wrapper.find('input')
  const getError = () => wrapper.find(Error)
  const getForm = () => wrapper.find('form')

  beforeEach(() => {
    updateContact = jest.fn()
    wrapper = shallow(
      <ContactForm
        contact={{ name: 'John Doe' }}
        updateContact={updateContact}
      />,
    )
  })

  it('displays the name in the input', () => {
    expect(getInput().get(0).props.value).toEqual('John Doe')
  })

  it('updates the name when updating input value', () => {
    getInput().simulate('change', { target: { value: 'Jane Doe' } })
    expect(getInput().get(0).props.value).toEqual('Jane Doe')
  })

  it('displays the error message when input is empty', () => {
    expect(getError().length).toEqual(0)
    getInput().simulate('change', { target: { value: '' } })
    expect(getError().length).toEqual(1)
  })

  it('calls updateContact on form submit', () => {
    getInput().simulate('change', { target: { value: 'Jane Doe' } })
    getForm().simulate('submit', { preventDefault() {} })
    expect(updateContact).toHaveBeenCalledWith({ name: 'Jane Doe' })
  })

  it('does not call updateContact on form submit if input is empty', () => {
    getInput().simulate('change', { target: { value: '' } })
    getForm().simulate('submit', { preventDefault() {} })
    expect(updateContact).not.toHaveBeenCalled()
  })
})
