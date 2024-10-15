import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { postSlice } from './postSlice'
import { userInfoSlice } from './userInfoSlice'


export const store = configureStore({
  reducer: {
    auth:authSlice.reducer,
    posts:postSlice.reducer,
    userInfo:userInfoSlice.reducer
    
  },
})