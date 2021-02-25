import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
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
        setUserInfo(rawData.data());
      });
    }
  }, [user])

  return (
    <>
      {!user ? (<Redirect to="/signup" />) : (
        <div className="container">
          <div className="dashboard p__top text-center">
            <div className="user__img pr-2">
              { userInfo.url && <img src={userInfo.url} alt="profile pic"/>}
            </div>
            <span>{userInfo.userName && `Welcome ${userInfo.userName}`}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
