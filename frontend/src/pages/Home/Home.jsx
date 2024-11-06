import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./home.css"

export default function Home() {
  const navigate = useNavigate()
  const { user } = useSelector(
    (state) => state.auth
  )

  const handleNavigate = () => {
    navigate("/tasks")
  }

  const navigateLogin = () => {
    navigate("/login")
  }

  return (
    <div className='container text-center mt-5 home'>
      <h2>Welcome to task tracker...</h2>
      {
        user && (
          <>
          <button className='btn btn-primary' onClick={handleNavigate} style={{
            margin:"1rem 0rem",
            width:"200px"
          }}>
          Go to Tasks
          </button>
          
          </>
        )
      }
      {
        !user && (
          <>
          <button className='btn btn-primary' onClick={navigateLogin} style={{
            margin:"1rem"
          }}>Login to start tracking tasks</button>
          </>
        )
      }
      <div className="image">
      <img src={"./taskTrack.jpeg"} alt="Description of the image" style={{
         width: '100%', 
         height: '100%',
         objectFit:"cover",
         borderRadius:"5px"
        }} />
      </div>
    </div>
  )
}
