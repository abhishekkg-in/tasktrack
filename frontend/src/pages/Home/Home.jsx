import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  return (
    <div className='container text-center mt-5'>
      <h2>Welcome to your task tracker...</h2>
      <h6 className='mt-5'>Login to start tracking tasks</h6>
      <Link to="/tasks">Tasks</Link>
    </div>
  )
}
