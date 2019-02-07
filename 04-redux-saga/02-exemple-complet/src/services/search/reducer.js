const initialState = {
  query: '',
  isPending: false,
  hasError: false,
  results: undefined,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateQuery':
      return { ...state, query: action.payload }
    case 'search':
      return { ...state, isPending: true, hasError: false }
    case 'searchSuccess':
      return { ...state, isPending: false, results: action.payload }
    case 'searchFailure':
      return { ...state, isPending: false, hasError: true }
    default:
      return state
  }
}
