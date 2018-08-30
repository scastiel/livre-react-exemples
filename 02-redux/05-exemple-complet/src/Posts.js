import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from './store'

class Posts extends Component {
  componentDidMount() {
    const { fetchPosts, posts } = this.props
    if (posts.length === 0) {
      fetchPosts()
    }
  }
  onPostClicked = (event, post) => {
    event.preventDefault()
    this.props.openPost(post)
  }
  render() {
    const { isFetching, posts, error } = this.props
    return (
      <div>
        {isFetching && <p>Fetching posts…</p>}
        {error && <p>{error.message}</p>}
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <a
                href={post.url}
                onClick={event => this.onPostClicked(event, post)}
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  error: PropTypes.any,
  isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts,
  error: state.error,
  isFetching: state.isFetching
})

const mapDispatchToProps = {
  fetchPosts: actions.fetchPosts,
  openPost: actions.openPost
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
