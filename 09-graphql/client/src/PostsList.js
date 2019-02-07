import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Post from './Post'

const postsQuery = gql`
  {
    allPosts(orderBy: createdAt_DESC) {
      id
      createdAt
      imageUrl
      author {
        id
        email
      }
      comments {
        id
      }
    }
  }
`

const PostsList = ({ userId }) => {
  const { loading, error, data, startPolling } = useQuery(postsQuery)

  useEffect(() => {
    startPolling(5000)
  })

  if (loading) {
    return <p>Loading…</p>
  }

  if (error) {
    return <p>Something bad happened.</p>
  }

  return (
    <div className="posts-list">
      {data.allPosts.map(post => (
        <Post userId={userId} post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostsList
