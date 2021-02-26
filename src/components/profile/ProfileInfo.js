import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase'

function ProfileInfo({ userInfo, user }) {
  const [userName, setUserName] = useState('')
  const [lastName, setLastName] = useState('')
  const [aaddharNo, setAaddharNo] = useState('')
  const [mobileNo, setMobileNO] = useState('')
  const [standard, setStandard] = useState('')
  const [stream, setStream] = useState('')
  const [giNo, setGiNo] = useState('')
  const [prnNo, setPrnNo] = useState('')
  
  const [toggle, setToggle] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  const inputRef = useRef(null)
 

  useEffect(() => {
    if(userInfo.userName){
      setUserName(userInfo.userName)
      setLastName(userInfo.lastName)
      setAaddharNo(userInfo.aaddharNo)
      setMobileNO(userInfo.mobileNo)
      setStandard(userInfo.standard)
      setStream(userInfo.stream)
      setGiNo(userInfo.giNo)
      setPrnNo(userInfo.prnNo)
    }
  }, [userInfo])

  //   <input type="text" value={text} onChange={e => setText(e.target.value)}/>
  //                   <button onClick={handleClick}>Edit</button> 
  // const handleClick = (e) => {
    // db.collection("users").doc(user.uid).update({
    //     userName: text,
    // })
    // .then(() => {
    //     console.log("Document successfully updated!");
    // })
    // .catch((error) => {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    // });
  // }
  const handleEditClick = () => {
    setToggle(false)
    inputRef.current.focus()
  }

  const handleUpdateClick = () => {
    if(standard.trim().length > 0 && lastName.trim().length > 0 && stream.trim().length > 0 && giNo.trim().length > 0 && prnNo.trim().length > 0 && userName.trim().length > 0 && aaddharNo.trim().length > 0 && mobileNo.trim().length > 0) {

      db.collection("users").doc(user.uid).update({
        userName,
        lastName,
        aaddharNo,
        mobileNo,
        standard,
        stream,
        giNo,
        prnNo
      })
      .then(() => {
        console.log('success')
          setShowMessage(true)
          setTimeout(() => {
            setShowMessage(false)
          }, 2000)
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
      setToggle(true);
    }
  }
  return (
    <>
      {
        userInfo.url ? (
          <div className="profile__info">
            <div className="container">
              <div className="toogle__btn d-flex justify-content-end">
                {
                  toggle ? (<button className="btn" onClick={handleEditClick}>Edit Profile</button>) :
                  (<button className="btn" onClick={handleUpdateClick}>Update Profile</button>)
                }
              </div>
              <div className="show__success__message text-center text-danger">
                {showMessage && `Profile Updated successfully`}
              </div>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="input-group profile__info__input">
                    <label htmlFor="userName">Name:</label>
                    <input name="userName" ref={inputRef} value={userName} readOnly={toggle} onChange={e => setUserName(e.target.value)} type="text"></input>
                  </div>
                  <div className="input-group profile__info__input">
                    <label htmlFor="lastName">Last Name:</label>
                    <input name="lastName" value={lastName} readOnly={toggle} onChange={e => setLastName(e.target.value)} type="text"></input>
                  </div>
                  <div className="input-group profile__info__input">
                    <label htmlFor="aaddharNo">Aaddhar No.:</label>
                    <input name="aaddharNo" value={aaddharNo} readOnly={toggle} onChange={e => setAaddharNo(e.target.value)} type="text"></input>
                  </div>
                  <div className="input-group profile__info__input">
                    <label htmlFor="mobileNo">Mobile No.:</label>
                    <input name="mobileNo" value={mobileNo} readOnly={toggle} onChange={e => setMobileNO(e.target.value)} type="text"></input>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="input-group profile__info__input">
                    <label htmlFor="stream">Address:</label>
                    <input name="stream" value={stream} readOnly={toggle} onChange={e => setStream(e.target.value)} type="text"></input>
                  </div>
                  <div className="input-group profile__info__input">
                    <label htmlFor="standard">Standard:</label>
                    <input name="standard" value={standard} readOnly={toggle} onChange={e => setStandard(e.target.value)} type="text"></input>
                  </div>
                  <div className="input-group profile__info__input">
                    <label htmlFor="giNo">GI No.:</label>
                    <input name="giNo" value={giNo} readOnly={toggle} onChange={e => setGiNo(e.target.value)} type="text"></input>
                  </div>
                  <div className="input-group profile__info__input">
                    <label htmlFor="prnNo">PRN No.:</label>
                    <input name="prnNo" value={prnNo} readOnly={toggle} onChange={e => setPrnNo(e.target.value)} type="text"></input>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        ) : (
          <div className="initial__loader text-center">
            <div className="spinner-border spinner-border-sm" style={{width: '3rem', height: '3rem',}} role="status">
              <span className="sr-only">Loading....</span>
            </div>
          </div>
        )
      }
    </>
  )
}

export default ProfileInfo
