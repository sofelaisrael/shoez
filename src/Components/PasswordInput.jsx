import { FiEye } from "react-icons/fi"; 
import { FiEyeOff } from "react-icons/fi"; 
import React, { useState } from 'react'

const PasswordInput = ({value, onChange, placeholder}) => {

    const [show, setShow] = useState(false)

    const toggle = () => {
        setShow(!show)
    }

  return (
    <>
      <input className='focus:outline-none w-[90%]' type={show ? 'text' : 'password'} placeholder={placeholder || "password"}  value={value} onChange={onChange} />
      <div className="flex items-center" onClick={() => toggle()}>
        {show ? <FiEyeOff /> : <FiEye />}
        
      </div>
    </>
  )
}

export default PasswordInput
