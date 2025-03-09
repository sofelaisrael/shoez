import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../Components/PasswordInput'
import { validate } from '../helpers/helper'

const SignIn = () => {
    const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

//   const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const handleValidation = async (e) => {
    e.preventDefault()

    if (email.trim() == '') {
      setError("Enter your email address")
    //   enqueueSnackbar('Email Field is Required!', { variant: 'error', hideIconVariant: true })
      return error
    }

    if (!validate(email)) {
      setError('Enter entered is invalid')
    //   enqueueSnackbar('Email entered is Invalid!', { variant: 'error', hideIconVariant: true })
      return error
    }

    if (!password) {
      setError('Enter your password')
    //   enqueueSnackbar('Password Entered is Invalid / Required!', { variant: 'error', hideIconVariant: true })
      return error
    }
    setError("")

    // try {
    //   setLoading(true)
    //   const res = await axiosInstance.post("/login", {
    //     email: email,
    //     password: password
    //   })
    //   enqueueSnackbar(`Logged in as ${res.data.User.user.username}`, { variant: 'info' })

    //   if (res.data && res.data.accessToken) {
    //     localStorage.setItem("token", res.data.accessToken)
    //     navigate("/dashboard")
    //   }
    //   setError(res.data)

    // } catch (err) {
    //   setLoading(false)

    //   if (err && err.data && err.data.message) {
    //     setError(err.data.message)
    //   } else {

    //     enqueueSnackbar("An Error Occurred or Account Does Not Exist", { variant: 'error', hideIconVariant: true })
    //   }
    // }

  }

  return (
    <>
      
          <div className='h-[100vh] flex flex-col items-center justify-center'>
            <div className="box w-[400px] max-sm:w-[100%] sm:border p-5 rounded-lg">
              <span className="text-[32px] pr-16">Sign In</span>
              <form className='flex flex-col gap-5 py-5' action="" onSubmit={handleValidation}>
                <div className="email flex flex-col gap-1">
                  <label htmlFor="email">Email</label>
                  <div className="inp border p-3 rounded-md">
                    <input className='focus:outline-none w-[100%]  ' onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='Enter your email' />
                  </div>
                </div>
                <div className="password flex flex-col gap-1">
                  <span className="">Password</span>
                  <div className="inp p-3 rounded-md border flex justify-between">
                    <PasswordInput value={password} onChange={({ target }) => {
                      setPassword(target.value)
                    }} placeholder={"Enter your password"} />
                  </div>
                </div>
                <button type='submit' onClick={() => { }} className='w-full bg-[#0a0a0a] text-white p-3 rounded-md'>Log In</button>
              </form>
            </div>
            {error}
            <div className="log py-3 text-gray-600">
              Don't have an account?
              <span className=" text-[#0a0a0a] undeline cursor-pointer px-2" onClick={() => navigate('/register')}>
                Sign Up
              </span>
            </div>
          </div>

    </>

  )
}

export default SignIn