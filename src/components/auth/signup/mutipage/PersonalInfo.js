import React from 'react';
import { Link } from 'react-router-dom';

function PersonalInfo({ formData, setForm, navigation }) {
  const { userName, email, aaddharNo, mobileNo, password } = formData

  return (
    <div className="signup__info">
      <form>
        <h3 className="text-center">Sign Up</h3>
        <h4 className="text-center">Personal Info</h4>
        <div className="input-group">
          <span className="form-icon"><i className="fas fa-user"></i></span>
          <input name="userName" value={userName} autoComplete="off" onChange={setForm} type="text" placeholder="Username" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="fas fa-envelope"></i></span>
          <input name="email" value={email} autoComplete="off" onChange={setForm} type="email" placeholder="Email" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i class="fas fa-lock"></i></span>
          <input name="password" value={password} autoComplete="off" onChange={setForm} type="password" placeholder="Passwaord" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="far fa-address-book"></i></span>
          <input name="aaddharNo" value={aaddharNo} autoComplete="off" onChange={setForm} type="tel" maxLength="14" placeholder="Aaddhar No." />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="fas fa-mobile-alt"></i></span>
          <input name="mobileNo" value={mobileNo} autoComplete="off" onChange={setForm} type="tel" maxLength="10" placeholder="Mobile No." />
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
