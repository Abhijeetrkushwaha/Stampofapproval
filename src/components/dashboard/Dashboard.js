import React, { useState, useEffect } from 'react'
import { Redirect, Link } from "react-router-dom";
import { db } from '../../firebase';
import './Dashboard.css'
// import Placeholder from './placeholder.jpg';

function Dashboard({ user }) {
  const [userInfo, setUserInfo] = useState({});
  // console.log(userInfo);

  useEffect(() => {
    if(user) {
      db.collection("users")
      .onSnapshot((snapshot) => {
        const rawData = snapshot.docs.find((doc) => {
          return user.uid === doc.id
        })
        if(rawData) {
          setUserInfo(rawData.data());
        }
      });
    }
  }, [user])

  return (
    <>
      {!user ? (<Redirect to="/signup" />) : (
        <div className="p__top dashboard">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-5">
                <div className="card mb-3">
                  <div className="card-body">
                    {
                      userInfo.url ? (
                        <div className="dashboard__profile__info">
                          <div className="info__detail">
                            <div className="user__img">
                              { userInfo.url && <img src={userInfo.url} alt="profile pic"/>}
                            </div>
                            <span>{(userInfo.userName && userInfo.lastName) && `${userInfo.userName} ${userInfo.lastName}`}</span>
                          </div>
                          <Link to="/profile" className="btn btn--sm">View profile</Link>
                        </div>
                      ) : (
                        <div className="initial__loader text-center">
                          <div className="spinner-border spinner-border-sm" style={{width: '3rem', height: '3rem',}} role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="card d-none d-lg-block dashboard__note">
                  <div class="card-header">
                    Note
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">PICTURE MUST BE IN JPEG FORMATE.</li>
                    <li class="list-group-item">SIZE MUST NOT EXCEED 150 KB.</li>
                    <li class="list-group-item">FORM MUST BE SCANNED VIA SCANNER.</li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-lg-7">
                <div className="card mb-3">
                  <div className="card-body">
                    PDF Uploading Section
                  </div>
                </div>
                <div className="card d-block d-lg-none">
                  <div className="card-body">
                    Note in small
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
