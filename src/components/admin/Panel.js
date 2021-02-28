import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'
import AllUsers from './AllUsers';
import AllInbox from './AllInbox';
import emailjs from 'emailjs-com';

function Panel() {
  const [documents, setDocuments] = useState([])
  const [users, setUsers] = useState([])
  const [showMessage, setShowMessage] = useState(false)
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

  const deleteMessage = (id) => {
    db.collection("documents").doc(id).delete();
    db.collection("users").doc(id).update({
      isDoc: 0,
    });
  }

  const sendEmail = e => {
    e.preventDefault()

    emailjs.sendForm('service_ya0be7n', 'template_s1ogyxx', e.target, 'user_jeIZeUwLXUIBATRBOaqmO')
      .then((result) => {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 1000)
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset()
  }

  return (
    <div className="panel p__top">
      {
        showMessage && (
          <div className="show__message">
            <span>Message Send</span>
          </div>
        )
      }
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
              <AllInbox documents={documents} sendEmail={sendEmail} deleteMessage={deleteMessage}/>
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
