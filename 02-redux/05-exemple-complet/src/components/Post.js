import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Post = ({ post, details }) => {
  const renderDetails = () => {
    if (!details || details.isFetching) {
      return <p>Fetching post details…</p>
    } else if (details.error) {
      return <p>{details.error.message}</p>
    } else if (details.details && details.details.selftext) {
      return <p>{details.details.selftext}</p>
    } else {
      return <em>No text</em>
    }
  }

  return (
    <div>
      <h2>{post.title}</h2>
      {renderDetails()}
    </div>
  )
}

export default Post
