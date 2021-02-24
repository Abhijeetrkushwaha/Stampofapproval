import React from 'react';
import { storage, db, auth } from "../../../../firebase";
// import Image from '../img/profile.png'

function Submit({ formData, navigation, setProfileImg, profileImg, errorMessage, setErrorMessage, user, history }) {
  const { standard, stream, giNo, prnNo, date, userName, email, password, aaddharNo, mobileNo } = formData

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

    if( standard && stream && giNo && prnNo && date && userName && email && password && aaddharNo && mobileNo && profileImg) {
      setErrorMessage('Just a second...Signing Up')

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
              })
              
            });
        }
      );

      
        
      return true
    }
    setErrorMessage('All Fields Are Required')
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

        <button className="btn btn--lg">Sign UP</button>
        <div className="err text-center pt-1"><p>{errorMessage}</p></div>
      </form>
      <div className="single__btn">
        <button className="btn btn--sm btn--blue" onClick={() => navigation.previous()}><i className="fas fa-arrow-left"></i> Previous</button>
      </div>
    </div>
  )
}

export default Submit
