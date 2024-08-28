import React, { useState } from 'react'
import { SvgIcon, TextField } from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Icon from '@mui/material/Icon';



function Navbar() {
  const [isLogin, SetIsLogin] = useState(false)
  const navigate = useNavigate()
  return (
    <div className='bg-gray-200 w-full h-16 flex items-center justify-between' >
      <Link to={"/"}>
        <img className='w-14 h-14 ml-3' src='src/images/ali_icon-playstore.png' alt="" />
      </Link>

      <input type="text" className='w-1/4 h-12 ml-20 bg-transparent border-slate-400 border-2 text-sm  p-2 rounded-2xl  focus:border-gray-500 focus:outline-none  ' />
      <div className='flex items-center mr-3 w-1/8 gap-6'>
        <Link className='text-black hover:text-gray-500 active:text-gray-950' to={"/"}>Home</Link>
        <Link className='text-black hover:text-gray-500 active:text-gray-950' to={"/profile"}>Profile</Link>
        {isLogin ? <AccountCircleIcon className='w-32 h-32  text-gray-700' sx={{ fontSize: 40 }} /> : <Link className='text-black hover:text-gray-500 active:text-gray-950' to={"/login"}>Login</Link>}



      </div>
    </div>
  )
}

export default Navbar
Navbar