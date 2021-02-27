import React from 'react';
import { Link } from 'react-router-dom';

function PersonalInfo({ formData, setForm, navigation, handleKeyPress }) {
  const { userName, email, aaddharNo, password, lastName } = formData

  return (
    <div className="signup__info">
      <form>
        <h3 className="text-center">Sign Up</h3>
        <h4 className="text-center">Personal Info</h4>
        <div className="input-group">
          <span className="form-icon"><i className="fas fa-user"></i></span>
          <input name="userName" className="has__error" value={userName} autoComplete="off" onChange={setForm} type="text" placeholder="First Name" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="fas fa-user"></i></span>
          <input name="lastName" className="has__error" value={lastName} autoComplete="off" onChange={setForm} type="text" placeholder="Last Name" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="fas fa-envelope"></i></span>
          <input name="email" value={email} autoComplete="off" onChange={setForm} type="email" placeholder="Email" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="fas fa-lock"></i></span>
          <input name="password" value={password} autoComplete="off" onChange={setForm} type="password" placeholder="Password" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="far fa-address-book"></i></span>
          <input name="aaddharNo" value={aaddharNo} autoComplete="off" onChange={setForm} type="tel" maxLength="16" onKeyPress={handleKeyPress} placeholder="Aadhaar No." />
        </div>
      </form>
      <button className="btn btn--lg" onClick={() => navigation.next()}>Next <i className="fas fa-arrow-right"></i></button>
      <div className="text-center pt-2">
        <p>Already a member? <span className="text-danger"><Link to="/login">Login</Link></span></p>
      </div>
    </div>
  )
}

export default PersonalInfo
