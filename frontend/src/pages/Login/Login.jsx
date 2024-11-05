import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import './login.css'

import Spinner from '../../components/Spinner/Spinner'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = data
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
        navigate('/tasks')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <div className='container text-center mt-5'>
       <div className='home-outter outter'>
      <div className='container text-center'>
        <h1>Login page</h1>
        <div>
          <form className='form' onSubmit={handleSubmit}>
            <input
              type='email'
              value={email}
              onChange={handleChange}
              placeholder='email'
              name='email'
              id='email'
              required
            />
            <input
              type='password'
              value={password}
              onChange={handleChange}
              placeholder='password'
              name='password'
              id='password'
              required
            />
            <button type='submit'>Submit</button>
          </form>
          <div className='reg-link'>
            <span>new user ?</span>
            <Link to='/register'>register now</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
