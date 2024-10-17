import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Box, Button, Stack } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import HttpsIcon from '@mui/icons-material/Https';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, sendRegister } from '../redux/authSlice';
import { ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material'


function RegisterSection() {
  const dispatch = useDispatch();

 
  const formik = useFormik({
    initialValues: {
      usernameRegister: "",
      emailRegister:"",
      passwordRegister: "",
    },
    validationSchema: Yup.object({
      usernameRegister: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      emailRegister: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      passwordRegister: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 8 characters'),
    }),
    onSubmit: (values,{resetForm}) => {
      console.log(values);
      dispatch(sendRegister({
        username: values.usernameRegister,
        email: values.emailRegister,
        password: values.passwordRegister
      })).then((action) => {
        if(action.type==='auth/sendRegister/fulfilled'){
          resetForm();
        }
      }).catc
     
    },


  });

  const { isCircular } = useSelector(state => state.auth)

  return (
    <form onSubmit={formik.handleSubmit} className='w-full h-full flex flex-col items-center justify-center gap-5 -mt-10'>
      <Stack sx={{ display: isCircular ? 'block' : 'none' }}>
        <CircularProgress />
      </Stack>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

        <MailIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
        <TextField
          InputLabelProps={{
            sx: {
              color: 'white',
              '&.Mui-focused': { color: 'lightGray' },
            },
          }}
          id="emailRegister"
          name="emailRegister"
          label="E-mail"
          variant="standard"
          value={formik.values.emailRegister}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.emailRegister && Boolean(formik.errors.emailRegister)}
          helperText={formik.touched.emailRegister && formik.errors.emailRegister}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5 }} />
        <TextField
          InputLabelProps={{
            sx: {
              color: 'white',
              '&.Mui-focused': { color: 'lightGray' },
            },
          }}
          id="usernameRegister"
          name="usernameRegister"
          label="Username"
          variant="standard"
          value={formik.values.usernameRegister}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.usernameRegister && Boolean(formik.errors.usernameRegister)}
          helperText={formik.touched.usernameRegister && formik.errors.usernameRegister}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <HttpsIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
        <TextField
          InputLabelProps={{
            sx: {
              color: 'white',
              '&.Mui-focused': { color: 'lightGray' },
            },
          }}
          id="passwordRegister"
          name="passwordRegister"
          label="Password"
          type="password"
          variant="standard"
          value={formik.values.passwordRegister}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passwordRegister && Boolean(formik.errors.passwordRegister)}
          helperText={formik.touched.passwordRegister && formik.errors.passwordRegister}
        />
      </Box>

      <div>
        <Button
          type="submit"
          sx={{
            color: 'white',
            borderRadius: '10px',
            border: '1px solid white',
            width: '150px',
            backgroundColor: '#5C5C5D',
          }}
        >
          REGISTER
        </Button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default RegisterSection;
