import React from 'react'
import CreatePost from './CreatePost'
import PostsList from './PostsList'
import UserBanner from './UserBanner'

const App = ({ user, logout }) => {
  return (
    <>
      <UserBanner user={user} logout={logout} />
      <CreatePost userId={user.id} />
      <PostsList userId={user.id} />
    </>
  )
}

export default App
