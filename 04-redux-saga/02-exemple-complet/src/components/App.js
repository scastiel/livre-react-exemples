import React from 'react'
import { connect } from 'react-redux'
import {
  selectQuery,
  selectSearchIsPending,
  selectSearchHasError,
  selectSearchResults,
} from '../services/search/selectors'
import { updateQuery, search } from '../services/search/actions'
import './App.css'

const App = ({ query, isPending, hasError, results, updateQuery, search }) => {
  const handleFormSubmit = event => {
    event.preventDefault()
    search()
  }
  const handleQueryChange = event => updateQuery(event.target.value)
  return (
    <div className="app">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter an address…"
          required
        />
        <button type="submit">Go!</button>
      </form>
      {results !== undefined && (
        <>
          <h2>Results</h2>
          {isPending && <p className="info">Loading…</p>}
          {hasError && <p className="info error">An error occurred.</p>}
          {results.length > 0 ? (
            <ul>
              {results.map(result => (
                <li key={result.properties.id}>📍 {result.properties.label}</li>
              ))}
            </ul>
          ) : (
            <p className="info">Search returned no result.</p>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  query: selectQuery(state),
  isPending: selectSearchIsPending(state),
  hasError: selectSearchHasError(state),
  results: selectSearchResults(state),
})

const mapDispatchToProps = {
  updateQuery,
  search,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
