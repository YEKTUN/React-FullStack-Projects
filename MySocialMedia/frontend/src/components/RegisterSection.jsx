import { FormControl, Input, TextField } from '@mui/material'
import React,{useState} from 'react'
import Person2Icon from '@mui/icons-material/Person2';
import HttpsIcon from '@mui/icons-material/Https';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
function RegisterSection() {
const[usernameRegister,SetUsernameRegister]=useState('')
const[emailRegister,SetEmailRegister]=useState('')
const[passwordRegister,SetPasswordRegister]=useState('')
  return (
    <div className='w-full h-full flex flex-col  items-center justify-center gap-5 -mt-10 '>
 <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="E-mail" variant="standard"  value={emailRegister} onChange={(e)=>SetEmailRegister(e.target.value)}/>
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Username" variant="standard"  value={usernameRegister} onChange={(e)=>SetUsernameRegister(e.target.value)}/>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Password" variant="standard" value={passwordRegister} onChange={(e)=>SetPasswordRegister(e.target.value)} />
    </Box>
    <div>
        <Button sx={{ color: 'white', borderRadius: '10px', border: '1px solid white', width: '150px',backgroundColor: '#c7c9cd' }}>REGISTER</Button>
    </div>
</div>
  )
}

export default RegisterSection