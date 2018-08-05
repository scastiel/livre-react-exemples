import React from 'react'
import ReactDOM from 'react-dom'

const Greetings = ({ name }) => (
  <span>
    Bonjour <strong>{name}</strong> !
    {[1, 2, 3].map(i => <em>{i}</em>)}
  </span>
)

const App = () => <Greetings name="Sébastien" />

ReactDOM.render(<App />, document.getElementById('app'))
