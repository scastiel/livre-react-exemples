import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../services/store'
import Post from './Post'
import { closePost } from '../services/routing/actions'
import { fetchPostDetails } from '../services/postsDetails/actions'

class SinglePost extends Component {
  componentDidMount() {
    const { openedPost, postsDetails, fetchPostDetails } = this.props
    if (!postsDetails[openedPost.id]) {
      fetchPostDetails(openedPost)
    }
  }
  onCloseButtonClicked = event => {
    event.preventDefault()
    this.props.closePost()
  }
  render() {
    const { openedPost, postsDetails, closePost } = this.props
    return (
      <div>
        <a href="#" onClick={this.onCloseButtonClicked}>
          Back
        </a>
        <Post post={openedPost} details={postsDetails[openedPost.id]} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  openedPost: state.routing.openedPost,
  postsDetails: state.postsDetails
})

const mapDispatchToProps = { closePost, fetchPostDetails }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost)
