import React, { Component } from 'react'
import { compose, withState, withHandlers, mapProps } from 'recompose'

const forbidCharacters = forbiddenCharsRegexp =>
  withHandlers({
    onChange: props => event => {
      if (props.onChange) {
        const value = event.target.value
        const cleanValue = value.replace(forbiddenCharsRegexp, '')
        const newEvent = {
          ...event,
          target: { ...event.target, value: cleanValue }
        }
        props.onChange(newEvent)
      }
    }
  })

const formatInputValue = ({ formatValue, parseValue }) =>
  compose(
    withState('inputValue', 'setInputValue', props => formatValue(props.value)),
    withHandlers({
      onChange: props => event => {
        props.setInputValue(event.target.value)
      },
      onBlur: props => event => {
        const parsedValue = parseValue(props.inputValue)
        const formattedValue = formatValue(parsedValue)
        props.setInputValue(formattedValue)
        const newEvent = {
          ...event,
          target: { ...event.target, value: parsedValue }
        }
        if (props.onChange) {
          props.onChange(newEvent)
        }
        if (props.onBlur) {
          props.onBlur(newEvent)
        }
      }
    }),
    mapProps(({ inputValue, setInputValue, ...otherProps }) => ({
      ...otherProps,
      value: inputValue
    }))
  )

const BaseInput = props => <input {...props} />

const PhoneNumberInput = compose(
  formatInputValue({
    formatValue: value => {
      return value.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3')
    },
    parseValue: formattedValue => {
      return formattedValue.replace(/[^\d]/g, '').slice(0, 10)
    }
  }),
  forbidCharacters(/[^\d\s\-()]/g)
)(BaseInput)

export default PhoneNumberInput
