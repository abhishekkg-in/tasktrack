import React, {useEffect, useState} from 'react'
import { FaFileAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {
  MdArrowDropDown,
  MdHome,
  MdSettingsSuggest,
  MdPlaylistAddCheckCircle,
  MdLiveHelp
} from 'react-icons/md'

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(reset())
  }, [user, navigate, dispatch])

  const onLogout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('dates')
    localStorage.removeItem('options')
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const [openMenu, setOpenMenu] = useState(false)

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
      {
        user ? (
          <>
          <h5 style={{
            color:"#ffffff",
            marginTop:".7em"
          }} className="">Hii, {user.name}</h5>
          <button style={{
          }} className="btn" onClick={onLogout}>
          <FaSignOutAlt className='logo-menu' />
            Logout</button>
          {/* <ul>
            <li>
              {user.name}
            </li>
            <li className='' onClick={onLogout}>
                <Link className='' to='/login'>
                  <FaSignOutAlt className='logo-menu' />
                  Logout
                </Link>
            </li>
          </ul> */}

          </>
        ) : (
          <>
          <button className="btn " onClick={navigateLogin} >Login</button>
          <button className="btn" onClick={navigateRegister}>Signup</button>
          </>
        )
      }
      
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="true" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
  </div>
</nav>

    </div>
  )
}
