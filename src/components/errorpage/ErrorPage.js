import React from 'react';
import { Link } from 'react-router-dom'
import './ErrorPage.css';

function ErrorPage() {
  return (
    <div className="container">
      <div className="error__page text-center">
        <h2>404</h2>
        <h3>Page not found</h3>
        <Link to="/" className="btn d-none d-lg-block">Go back to Home Page</Link>
        <Link to="/" className="btn btn--xsm d-block d-lg-none">Go back to Home Page</Link>
      </div>
    </div>
  )
}

export default ErrorPage
