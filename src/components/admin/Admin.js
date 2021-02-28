import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import Panel from './Panel';
import './Admin.css'

function Admin({user}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault()
    if(email.trim().length > 0 && password.trim().length > 0){
      if(email === '12345678' && password === '12345678') {
        setValid(true)
      }
      setErrorMessage('Invalid email or password')
      return true
    }
    setErrorMessage('All Fields are Required')
  }

  return (
    <>
      { user ? (<Redirect to="/" />) : (
        <div className="container">
          {
            valid ? (<Panel />) : (
              <div className="login">
                <div className="login__info">
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-center">Admin</h3>
                    <div className="input-group">
                      <span className="form-icon"><i className="fas fa-envelope"></i></span>
                      <input name="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" required={false} />
                    </div>
                    <div className="input-group">
                      <span className="form-icon"><i className="fas fa-lock"></i></span>
                      <input name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </div>
                    <button className="btn btn--lg">Log In As Admin</button>
                    <p className="text-center text-danger pt-1">{errorMessage}</p>
                  </form>
                </div>
              </div>
            )
          }
        </div>
      )}
    </>
  )
}

export default Admin
