import React, { useState } from 'react';
import Image from './img/docu.jpg';
import './DocUpload.css';
import { db, storage } from '../../../firebase'

function DocUpload({ user, userInfo }) {
  const [image, setImage] = useState(null);
  const [onDisable, setOnDisable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  // console.log(userInfo);

  const previewImage = (e) => {
    var reader = new FileReader();
    var imageField = document.getElementById("image_field")
    reader.onload = function(){
        if(reader.readyState === 2){
            imageField.src = reader.result;
        }
    }
    setImage(e.target.files[0])
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let randomNo = Math.random();
    if(image) {
      setErrorMessage('Just a second...Uploading Document')
      setOnDisable(true)
      const uploadTask = storage.ref(`images/${randomNo}`).put(image);

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
              db.collection("documents").doc(user.uid).set({
                userInfo,
                id: user.uid,
                url
              });
              db.collection("users").doc(user.uid).update({
                isDoc: 1,
              });
              setErrorMessage('')
              setOnDisable(false)
            })
              .catch((err) => {
                setErrorMessage(err.message)
                setOnDisable(false)
              })
              
            });
            return true
    }
    setErrorMessage('please upload a file')
  }

  return (
    <>
      {
        userInfo.url && <div className="card-body">
          { !userInfo.isDoc ? (
            <div className="doc__upload">
              <form onSubmit={handleSubmit}>
                <div className="profile__img">
                  <img src={Image} alt="doc pic" height="284" width="200" id="image_field" />
                </div>
                <div className="input-group mt-3">
                  <input name="docImg" autoComplete="off"  onChange={previewImage} type="file" accept="image/*" />
                </div>
                <div className="submit__input d-flex justify-content-center">
                  <button className="btn" disabled = {(onDisable)? "disabled" : ""}>Submit Document</button>
                </div>
                <div className="text-danger d-flex justify-content-center">
                  <p>{errorMessage}</p>
                </div>
              </form>
            </div>
          ) : (
            <div className="has__upload text-center">
              <p className="font-weight-bold">You have sent the document.</p>
              <p>Wait for verification.</p>
              <p>You will receive Stamp of {`(approval or rejection)`} info soon in your registered email.</p>
              <p>Thank you!!</p>
            </div>
          )}
        </div>
      }
    </>
  )
}

export default DocUpload
