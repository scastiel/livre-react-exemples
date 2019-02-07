import React from 'react'
import { connect } from 'react-redux'
import { actions } from './store'

const formatTime = time =>
  (time / 1000).toLocaleString(undefined, { minimumFractionDigits: 3 })

const Stopwatch = ({ time, isRunning, start, pause, reset }) => (
  <div style={{ fontFamily: 'monospace' }}>
    {formatTime(time)}
    {isRunning ? (
      <button onClick={() => pause()}>Pause</button>
    ) : (
      <button onClick={() => start()}>Start</button>
    )}
    <button onClick={() => reset()}>Reset</button>
  </div>
)

const mapStateToProps = ({ time, isRunning }) => ({ time, isRunning })

const mapDispatchToProps = { ...actions }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stopwatch)
