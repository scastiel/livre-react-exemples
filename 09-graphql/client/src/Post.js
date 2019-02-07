import React, { useState, useCallback } from 'react'
import CommentsList from './CommentsList'

const Post = ({ userId, post }) => {
  const [commentsVisible, setCommentsVisible] = useState(false)
  const toggleCommentsCallback = useCallback(() =>
    setCommentsVisible(!commentsVisible),
  )
  return (
    <div className="post">
      <img className="post-image" src={post.imageUrl} />
      <div className="post-footer">
        <div>
          <span>👤{post.author.email.replace(/@.*/, '@***')}</span>
          <span>🗓{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <button className="comments-button" onClick={toggleCommentsCallback}>
          💬{post.comments.length}
        </button>
      </div>
      {commentsVisible && <CommentsList userId={userId} postId={post.id} />}
    </div>
  )
}

export default Post
