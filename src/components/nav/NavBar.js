import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { auth } from '../../firebase'
import './NavBar.css'

function NavBar({ user }) {

  return (
    <nav>
      <div className="container text-center nav__bar">
        <div className="brand-logo">StampOfApproval</div>
        <ul className="nav-list">
          {
            user ? (
              <>
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-links">Home</NavLink>
                </li>
                <li className="nav-item">
                  <Link className="nav-links" to="/" onClick={() => {auth.signOut()}}>
                    logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-links">Signup</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-links">Login</NavLink>
                </li>
              </>
            )}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
