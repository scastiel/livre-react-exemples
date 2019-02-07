export const updateQuery = query => ({ type: 'updateQuery', payload: query })
export const search = () => ({ type: 'search' })
export const searchSuccess = results => ({
  type: 'searchSuccess',
  payload: results,
})
export const searchFailure = error => ({
  type: 'searchFailure',
  payload: error,
})
