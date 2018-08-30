export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'

export const fetchPosts = () => async dispatch => {
  dispatch(fetchPostsBegin())
  try {
    const res = await fetch('https://www.reddit.com/r/reactjs.json')
    const posts = (await res.json()).data.children.map(child => child.data)
    dispatch(fetchPostsSuccess(posts))
  } catch (err) {
    dispatch(fetchPostsError(err))
  }
}

export const fetchPostsBegin = () => ({ type: FETCH_POSTS_BEGIN })

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts
})

export const fetchPostsError = error => ({
  type: FETCH_POSTS_ERROR,
  error
})
