import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import CreateComment from './CreateComment'

const commentsQuery = gql`
  query comments($postId: ID!) {
    Post(id: $postId) {
      comments(orderBy: createdAt_DESC) {
        id
        author {
          email
          id
        }
        createdAt
        content
      }
    }
  }
`

const CommentsList = ({ userId, postId }) => {
  const { loading, error, data, refetch } = useQuery(commentsQuery, {
    variables: { postId },
  })

  if (loading) {
    return <p className="comments-loading">Loading…</p>
  }

  if (error) {
    return <p className="comments-error-message">Something bad happened.</p>
  }

  return (
    <div className="comments-list">
      <CreateComment userId={userId} postId={postId} refetch={refetch} />
      {data.Post.comments.map(comment => (
        <div className="comment" key={comment.id}>
          <div className="comment-content">{comment.content}</div>
          <div className="comment-footer">
            <span>👤{comment.author.email.replace(/@.*$/, '@***')}</span>
            <span>🗓{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentsList
