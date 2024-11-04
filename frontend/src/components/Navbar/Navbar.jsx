import React, {useEffect, useState} from 'react'
import { FaFileAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate("/login")
  }

  const navigateRegister = () => {
    navigate("/register")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid container">
    <Link className="navbar-brand" to={"/"}><FaFileAlt style={{fontSize:"22px", fontWeight:"bold", marginRight:"3px", marginBottom:"5px"}} />TaskTrack</Link>
    <div className="d-flex">
      <button className="btn" onClick={navigateLogin} >Login</button>
      <button className="btn" onClick={navigateRegister}>Signup</button>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="true" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
  </div>
</nav>

    </div>
  )
}
