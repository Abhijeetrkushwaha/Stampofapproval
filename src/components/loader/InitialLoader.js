import React from 'react'
import './InitialLoader.css'

function InitialLoader() {
  return (
    <div className="initail__loader">
      <div className="spinner-border" style={{width: '3rem', height: '3rem',}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default InitialLoader
