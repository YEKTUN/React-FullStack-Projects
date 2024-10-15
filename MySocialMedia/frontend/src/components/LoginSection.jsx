import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Box, Button, Stack } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, sendLogin } from '../redux/authSlice';
import { ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getUserProfileInfo } from "../redux/authSlice";




function LoginSection() {
    const dispatch = useDispatch()

   

    const navigate = useNavigate()
    const { isCircular } = useSelector(state => state.auth)
    const formik = useFormik({
        initialValues: {
            usernameLogin: '',
            passwordLogin: '',
        },
        validationSchema: Yup.object({
            usernameLogin: Yup.string().min(3, 'Username must be at least 3 characters')
                .required('Username is required'),


            passwordLogin: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            dispatch(sendLogin({ username: values.usernameLogin, password: values.passwordLogin })).then((action) => {
                if (action.type === 'auth/sendLogin/fulfilled') {
                    localStorage.setItem('isLogin', 'true');
                    resetForm();
                    dispatch(getUserProfileInfo())
                    setTimeout(() => {
                        navigate("/")
                    }, 1000)
                }
            })
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className='w-full h-full flex flex-col items-center justify-center gap-5 -mt-10'>
            <Stack sx={{ display: isCircular ? 'block' : 'none' }}>
                <CircularProgress />
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5 }} />
                <TextField
                    id="username"
                    name="usernameLogin"
                    label="Username"
                    variant="standard"
                    value={formik.values.usernameLogin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.usernameLogin && Boolean(formik.errors.usernameLogin)}
                    helperText={formik.touched.usernameLogin && formik.errors.usernameLogin}

                    InputLabelProps={{
                        sx: {
                            color: 'white',
                            '&.Mui-focused': {
                                color: 'lightGray',
                            }
                        }
                    }}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <HttpsIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                <TextField
                    id="password"
                    name="passwordLogin"
                    label="Password"
                    variant="standard"
                    type="password"
                    value={formik.values.passwordLogin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.passwordLogin && Boolean(formik.errors.passwordLogin)}
                    helperText={formik.touched.passwordLogin && formik.errors.passwordLogin}
                    InputLabelProps={{
                        sx: {
                            color: 'white',
                            '&.Mui-focused': {
                                color: 'lightGray',
                            }
                        }
                    }}
                />
            </Box>
            <div>
                <Button
                    sx={{ color: 'white', borderRadius: '10px', border: '1px solid white', width: '150px', backgroundColor: '#5C5C5D' }}
                    type="submit"
                >
                    LOGIN
                </Button>
            </div>
            <ToastContainer />
        </form>
    );
}

export default LoginSection;
