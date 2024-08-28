import React,{useState} from 'react'
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import RegisterSection from '../components/RegisterSection';
import LoginSection from '../components/LoginSection';
function Login() {
  const[login,SetLogin]=useState(true)

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Card className='w-1/3 h-4/5 ' sx={{ backgroundColor: '#95ada1', borderRadius: '10px' }}>
        <div className='flex justify-evenly mt-7 '>
          <Button sx={{ color: 'white', borderRadius: '10px', border: '1px solid white', width: '150px' }} onClick={() => SetLogin(true)}>LOGIN</Button>
          <Button sx={{ color: 'white', borderRadius: '10px', border: '1px solid white', width: '150px' }}onClick={() => SetLogin(false)}>REGİSTER</Button>

        </div>
        {login ? <LoginSection /> : <RegisterSection />}
       
      </Card>
    </div>
  )
}

export default Login
