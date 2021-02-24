import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { db } from '../../firebase'

function Dashboard({ user }) {
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo);

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
          <div className="dashboard p__top">
            Dashboard
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
