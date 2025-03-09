import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../Components/PasswordInput'
import { validate } from '../helpers/helper'


export const SignUp = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleValidation = async (e) => {
    e.preventDefault()

    if (email.trim() == '') {
      setError("Enter your email address")
      // enqueueSnackbar('Email Field is Required!', { variant: 'error', hideIconVariant: true })
      return error
    }

    if (!validate(email)) {
      setError('Enter entered is invalid')
      // enqueueSnackbar('Email entered is Invalid!', { variant: 'error', hideIconVariant: true })
      return error
    }
    if (!username) {
      setError('Enter a Username')
      // enqueueSnackbar('Enter a Username..!', { variant: 'error', hideIconVariant: true })
      return error
    }

    if (!password) {
      setError('Enter your password')
      // enqueueSnackbar('Password Entered is Invalid / Required!', { variant: 'error', hideIconVariant: true })
      return error
    }
    setError("")

    // try {
    //   setLoading(true)
    //   const res = await axiosInstance.post("/create-account", {
    //     username: username,
    //     password: password,
    //     email: email
    //   })
    //   if (res.data == "This user already exists") {
    //     setLoading(false)
    //     // enqueueSnackbar(`This user already exists!`, { variant: 'info' })
    //   } else {
    //     // enqueueSnackbar(`Logged in as ${res.data.User.user.username}`, { variant: 'info' })
    //     navigate('/dashboard')
    //     localStorage.setItem("token", res.data.accessToken)
    //   }

    // } catch (err) {
    //   return err
    // }
  }
  

  return (
    <>
    
          <div className='h-[100vh] flex flex-col items-center justify-center'>
            <div className="box sm:border max-sm:w-[100%] p-5 px-10 rounded-lg">
              <span className="text-[32px] ">Create an Account</span>
              <form className='flex flex-col gap-5 py-5' action="" onSubmit={handleValidation}>
                <div className="email flex flex-col gap-1">
                  <label htmlFor="email">Email</label>
                  <div className="inp border p-3 rounded-md">
                    <input className='focus:outline-none w-full' onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='Enter your email' />
                  </div>
                </div>
                <div className="username flex flex-col gap-1">
                  <label htmlFor="username">Username</label>
                  <div className="inp border p-3 rounded-md">
                    <input className='focus:outline-none w-full' onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder='Enter your name' />
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
                <button type='submit' onClick={() => { }} className='w-full bg-[#0a0a0a] text-white p-3 rounded-md'>Create</button>
              </form>
            </div>
            {error}
            <div className="log py-3 text-gray-600">
              Already have an account?
              <span className="text-[#0a0a0a] undeline cursor-pointer px-2" onClick={() => navigate('/log-in')}>
                Log in
              </span>
            </div>
          </div>
    </>
    
    
  )
}

export default SignUp
