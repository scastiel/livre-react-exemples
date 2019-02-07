import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const createCommentMutation = gql`
  mutation createComment($authorId: ID!, $content: String!, $postId: ID!) {
    createComment(authorId: $authorId, content: $content, postId: $postId) {
      id
    }
  }
`

const CreateComment = ({ userId, postId, refetch }) => {
  const [createComment, { loading, error }] = useMutation(createCommentMutation)
  const [content, setContent] = useState('')
  const onContentChange = useCallback(event => {
    setContent(event.target.value)
  })
  const onSubmit = useCallback(event => {
    event.preventDefault()
    createComment({
      variables: {
        postId,
        authorId: userId,
        content,
      },
    }).then(() => {
      refetch()
      setContent('')
    })
  })

  return (
    <div className="create-comment">
      <form onSubmit={onSubmit}>
        <label htmlFor="content">Comment:</label>
        <input
          disabled={loading}
          required
          id="content"
          type="text"
          onChange={onContentChange}
          value={content}
        />
        <button disabled={loading} type="submit">
          Add
        </button>
      </form>
      {loading && <div>Creating…</div>}
      {error && <div>Something bad happened.</div>}
    </div>
  )
}

export default CreateComment
