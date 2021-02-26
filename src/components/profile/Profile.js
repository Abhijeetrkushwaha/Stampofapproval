import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { db } from '../../firebase';
import './Profile.css'
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
// import Placeholder from './placeholder.jpg';

function Profile({ user }) {
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
              <div className="col-12 col-lg-4">
                <div className="card mb-3">
                  <div className="card-body">
                    <ProfileHeader userInfo={userInfo}/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-header mb-2">Profile Detail</h5>
                    <ProfileInfo userInfo={userInfo} user={user}/>
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

export default Profile
