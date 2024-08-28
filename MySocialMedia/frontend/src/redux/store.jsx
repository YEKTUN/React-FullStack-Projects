import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './mainSlice'

export const store = configureStore({
  reducer: {
    home:counterSlice.reducer
  },
})