import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner/Spinner'
import { FaGoogle } from 'react-icons/fa'
import './register.css'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = data
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      const id = localStorage.getItem('id')
      if(id){
        navigate(`hotels/${id}`)
      }else{
        navigate('/tasks')
      }
      
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
      toast.success('Registration Succesful')
      navigate('/tasks')
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='home-outter outter mt-5'>
      <div className=' container text-center'>
        <h1 style={{color:"#0d6efd"}}>Signup</h1>
        <div className='form-outer'>
          <form className='form' onSubmit={handleSubmit}>
            <input
              type='text'
              value={name}
              onChange={handleChange}
              placeholder='name'
              id='name'
              name='name'
              required
            />
            <input
              type='email'
              value={email}
              onChange={handleChange}
              placeholder='email'
              name='email'
              required
            />
            <input
              type='password'
              value={password}
              onChange={handleChange}
              placeholder='password'
              name='password'
              required
            />
            <input
              type='password'
              value={password2}
              onChange={handleChange}
              placeholder='confirm password'
              name='password2'
              required
            />

            <button type='submit'>Submit</button>
          </form>
          <div className='mt-3' style={{fontSize:".8rem"}}>
            <span>Already have an account ?</span>
            <Link style={{marginLeft:"5px", listStyle:"none", textDecoration:"none"}} to='/login'>Login</Link>
          </div>
          <button className='btn btn-primary mt-3'>
            <FaGoogle style={{
              marginRight:"7px",
              marginBottom:"4px"
            }} />
            Signup with Google</button>
        </div>
      </div>
    </div>
  )
}
