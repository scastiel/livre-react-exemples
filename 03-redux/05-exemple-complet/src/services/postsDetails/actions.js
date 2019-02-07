export const FETCH_POST_DETAILS = 'FETCH_POST_DETAILS'
export const FETCH_POST_DETAILS_BEGIN = 'FETCH_POST_DETAILS_BEGIN'
export const FETCH_POST_DETAILS_SUCCESS = 'FETCH_POST_DETAILS_SUCCESS'
export const FETCH_POST_DETAILS_ERROR = 'FETCH_POST_DETAILS_ERROR'

export const fetchPostDetails = post => async dispatch => {
  dispatch(fetchPostDetailsBegin(post))
  try {
    const res = await fetch(`https://www.reddit.com${post.permalink}.json`)
    const details = (await res.json())[0].data.children[0].data
    dispatch(fetchPostDetailsSuccess(post, details))
  } catch (err) {
    dispatch(fetchPostDetailsError(post, err))
  }
}

export const fetchPostDetailsBegin = post => ({
  type: FETCH_POST_DETAILS_BEGIN,
  post
})

export const fetchPostDetailsSuccess = (post, details) => ({
  type: FETCH_POST_DETAILS_SUCCESS,
  post,
  details
})

export const fetchPostDetailsError = (post, error) => ({
  type: FETCH_POST_DETAILS_ERROR,
  post,
  error
})
