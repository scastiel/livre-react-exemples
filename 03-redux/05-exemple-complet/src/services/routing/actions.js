export const OPEN_POST = 'OPEN_POST'
export const CLOSE_POST = 'CLOSE_POST'

export const openPost = post => ({ type: OPEN_POST, post })

export const closePost = () => ({ type: CLOSE_POST })
