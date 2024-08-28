import { FormControl, Input, TextField } from '@mui/material'
import React, { useState } from 'react'
import Person2Icon from '@mui/icons-material/Person2';
import HttpsIcon from '@mui/icons-material/Https';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
function LoginSection() {
    const[usernameLogin,SetUsernameLogin]=useState('')
    const[passwordLogin,SetPasswordLogin]=useState('')
    return (
        <div className='w-full h-full flex flex-col  items-center justify-center gap-5 -mt-10'>


            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Username" variant="standard" value={usernameLogin} onChange={(e)=>SetUsernameLogin(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Password" variant="standard" value={passwordLogin} onChange={(e)=>SetPasswordLogin(e.target.value)} />
            </Box>
            <div>
                <Button sx={{ color: 'white', borderRadius: '10px', border: '1px solid white', width: '150px',backgroundColor: '#c7c9cd' }}>LOGIN</Button>
            </div>
        </div>
    )
}

export default LoginSection