import PropTypes from 'prop-types'

export const taskShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string,
  isDone: PropTypes.bool
})
