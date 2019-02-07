import React from 'react'

const UserBanner = ({ user, logout }) => (
  <div className="user-banner">
    <div>
      Signed in as <strong>{user.email}</strong>
    </div>
    <button type="button" onClick={() => logout()}>
      Log out
    </button>
  </div>
)

export default UserBanner
