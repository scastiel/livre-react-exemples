import { namespace } from '.'

export const selectQuery = state => state[namespace].query
export const selectSearchIsPending = state => state[namespace].isPending
export const selectSearchHasError = state => state[namespace].hasError
export const selectSearchResults = state => state[namespace].results
