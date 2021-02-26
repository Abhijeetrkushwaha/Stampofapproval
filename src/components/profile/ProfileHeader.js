import React from 'react'

function ProfileHeader({ userInfo }) {
  return (
    <>
      {
        userInfo.url ? (
          <div className="profile__header">
            <div className="info">
              <div className="user__img">
                { userInfo.url && <img src={userInfo.url} alt="profile pic"/>}
              </div>
              <span>{(userInfo.userName && userInfo.lastName) && `${userInfo.userName} ${userInfo.lastName}`}</span>
              <p>{userInfo.email && `Email: ${userInfo.email}`}</p>
            </div>
          </div>
        ) : (
          <div className="initial__loader text-center">
            <div className="spinner-border spinner-border-sm" style={{width: '3rem', height: '3rem',}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )
      }
    </>
  )
}

export default ProfileHeader
