import React from 'react'
import { useSelector } from 'react-redux'

import PostListHome from '../components/PostListHome'

function Home() {
  const {isLogin} = useSelector((state) => state.auth);
 
  return (
    <div className='flex flex-col w-full h-[1500px]  justify-start items-center overflow-auto scroll-hidden pb-10' >
    {isLogin?<PostListHome />:<p className='text-white font-bold text-2xl mt-20'>You should be logged in</p>}
    </div>
  )
}

export default Home
