import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from './store'

class Post extends Component {
  componentDidMount() {}
  renderDetails() {
    const { details } = this.props
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
  render() {
    const { post, details } = this.props
    return (
      <div>
        <h2>{post.title}</h2>
        {this.renderDetails()}
      </div>
    )
  }
}

export default Post
