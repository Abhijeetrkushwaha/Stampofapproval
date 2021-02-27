import React from 'react'

function AllUsers({ users }) {

  let allUser = users.length ? (
    users.map(data => {
      return (
        <li key={data.id}className="list-group-item admin__user">
          <img src={data.user.url} alt="user"/>
          <span className="font-weight-bold ml-2">{`${data.user.userName} ${data.user.lastName}`}</span>
        </li>
      )
    })
  ) : (
    <div className="initial__loader text-center">
      <div className="spinner-border spinner-border-sm" style={{width: '3rem', height: '3rem',}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  return (
    <ul className="list-group list-group-flush pt-2 pb-2 mb-3">
      {allUser}
    </ul>
  )
}

export default AllUsers
