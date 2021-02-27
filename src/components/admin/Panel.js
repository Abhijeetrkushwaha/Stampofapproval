import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'
import AllUsers from './AllUsers';
import AllInbox from './AllInbox';

function Panel() {
  const [documents, setDocuments] = useState([])
  const [users, setUsers] = useState([])
  console.log(documents);
  // console.log(users);

  useEffect(() => {
    db.collection('documents')
    .onSnapshot(snapshot => {
      setDocuments(snapshot.docs.map(doc => {
        return {document: doc.data(), id: doc.id}
      }))
    })
    db.collection('users')
    .onSnapshot(snapshot => {
      setUsers(snapshot.docs.map(doc => {
        return {user: doc.data(), id: doc.id}
      }))
    })
  }, [])

  return (
    <div className="panel p__top">
      <div className="card">
        <div className="card-body text-center">
          <h3>Admin panel</h3>
        </div>
      </div>
      <div className="pt-3">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="card mb-3">
              <div className="card-header">
                <h5>Inbox</h5>
              </div>
              <AllInbox documents={documents}/>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="card mb-3">
              <div className="card-header">
                <h5>All Students Registered</h5>
              </div>
              <AllUsers users={users}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
