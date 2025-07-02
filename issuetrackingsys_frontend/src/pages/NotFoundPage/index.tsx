import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/dashboard">
      <button>Back to Home</button>
      </Link>
      
    </div>
  )
}

export default NotFound