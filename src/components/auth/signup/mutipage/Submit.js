import React, { useState } from 'react';
import { storage, db, auth } from "../../../../firebase";
// import Image from '../img/profile.png'

function Submit({ formData, navigation, setProfileImg, profileImg, errorMessage, setErrorMessage, user, history }) {
  const { standard, stream, giNo, prnNo, date, userName, email, password, aaddharNo, mobileNo, lastName } = formData
  const [onDisable, setOnDisable] = useState(false)
  // const previewImage = (e) => {
  //   var reader = new FileReader();
  //   var imageField = document.getElementById("image_field")
  //   reader.onload = function(){
  //       if(reader.readyState === 2){
  //           imageField.src = reader.result;
  //       }
  //   }
  //   setProfileImg(e.target.files[0])
  //   reader.readAsDataURL(e.target.files[0]);
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    let randomNo = Math.random();
    //eslint-disable-next-line
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  
    if( standard.trim().length > 0 && lastName.trim().length > 0 && stream.trim().length > 0 && giNo.trim().length > 0 && prnNo.trim().length > 0 && date && userName.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0 && aaddharNo.trim().length > 0 && mobileNo.trim().length > 0 && profileImg) {
      if(!emailReg.test(email)) {
        setErrorMessage('please enter valid email address');
        return false
      }
  
      if(password.length < 8) {
        setErrorMessage('password is less then 8 characters');
        return false
      }

      setErrorMessage('Just a second...Signing Up')
      setOnDisable(true)
      const uploadTask = storage.ref(`images/${randomNo}`).put(profileImg);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function...
        },
        (err) => {
          // error function...
          console.log(err);
          alert(err.message);
        },
        () => {
          // complete function...
          storage
            .ref("images")
            .child(`${randomNo}`)
            .getDownloadURL()
            .then((url) => {
              auth.createUserWithEmailAndPassword(email, password)
              .then((res) => {
                return db.collection("users").doc(res.user.uid).set({
                  userName,
                  lastName,
                  email,
                  aaddharNo,
                  mobileNo,
                  standard,
                  stream,
                  giNo,
                  prnNo,
                  date,
                  url
                });
              }).then(() => history.push('/'))
              .catch((err) => {
                setErrorMessage(err.message)
                setOnDisable(false)
              })
              
            });
        }
      );
   
      return true
    }
    setErrorMessage('All Fields Are Required.')
  }

  return (
    <div className="signup__info">
      <form onSubmit={handleSubmit}>
        <h4 className="text-center">Profile Image</h4>
        {/* <div className="profile__img">
          <img src={Image} alt="profile pic" height="200" width="200" id="image_field" />
        </div> */}
        {profileImg ? (
          <div className="choosen__file text-center">
            <h5>File Choosen: {profileImg.name}</h5>
            <button className="btn btn--xsm btn--blue" onClick={() => setProfileImg('')}>Change image?</button>
          </div>
        ) : (
          <div className="input-group">
            <input name="profileImg" autoComplete="off"  onChange={(e) => setProfileImg(e.target.files[0])} type="file" accept="image/*" />
          </div>
        )}

        <button className="btn btn--lg" disabled = {(onDisable)? "disabled" : ""}>Sign UP</button>
        <div className="err text-center pt-1"><p>{errorMessage}</p></div>
      </form>
      <div className="single__btn">
        <button className="btn btn--sm btn--blue" disabled = {(onDisable)? "disabled" : ""} onClick={() => navigation.previous()}><i className="fas fa-arrow-left"></i> Previous</button>
      </div>
    </div>
  )
}

export default Submit
