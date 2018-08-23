import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from './store'

const Counter = ({ counter, increment, add }) => (
  <p>
    Compteur:
    <span>{counter}</span>
    <button onClick={() => increment()}>+</button>
    <button onClick={() => add(10)}>+10</button>
  </p>
)

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  counter: state.counter
})

const mapDispatchToProps = {
  increment: () => actions.increment(),
  add: value => actions.add(value)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
