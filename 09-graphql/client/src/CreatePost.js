import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const createPostMutation = gql`
  mutation createPost($authorId: ID!, $imageUrl: String!) {
    createPost(authorId: $authorId, imageUrl: $imageUrl) {
      id
    }
  }
`

const CreatePost = ({ userId }) => {
  const [createPost, { loading, error }] = useMutation(createPostMutation)
  const [imageUrl, setImageUrl] = useState('')
  const onImageUrlChange = useCallback(event => {
    setImageUrl(event.target.value)
  })
  const onSubmit = useCallback(event => {
    event.preventDefault()
    createPost({
      variables: { authorId: userId, imageUrl },
    })
    setImageUrl('')
  })

  return (
    <div className="create-post">
      <form onSubmit={onSubmit}>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          disabled={loading}
          required
          placeholder="http://..."
          id="imageUrl"
          type="text"
          onChange={onImageUrlChange}
          value={imageUrl}
        />
        <button disabled={loading} type="submit">
          Create
        </button>
      </form>
      {loading && <div>Creating…</div>}
      {error && <div>Something bad happened.</div>}
    </div>
  )
}

export default CreatePost
