import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import { auth } from '../../../firebase'

function LogIn({user, history}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const userIsLogin = user ? () : ()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('Just a second...')
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      history.push('/')
    })
    .catch((err) => {
      setErrorMessage(err.message)
    })
  }

  return (
    <>
      { user ? (<Redirect to="/" />) : (
        <div className="container">
          <div className="login">
            <div className="login__info">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center">Login</h3>
                <div className="input-group">
                  <span className="form-icon"><i className="fas fa-envelope"></i></span>
                  <input name="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                  <span className="form-icon"><i className="fas fa-lock"></i></span>
                  <input name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </div>
                <button className="btn btn--lg">Log In</button>
                <p className="text-center text-danger pt-1">{errorMessage}</p>
              </form>
              <div className="login__admin text-center">
                <p className="font-weight-bold">or Login as</p>
                <Link to="/admin" className="btn btn--lg btn--blue">Admin</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LogIn
