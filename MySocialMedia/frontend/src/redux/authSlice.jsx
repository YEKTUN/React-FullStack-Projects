import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CircularProgress } from '@mui/material';
import backendUrl from '../backendUrl';
const url = process.env.NODE_ENV === 'development' 
? `http://localhost:5000` 
: `${backendUrl}`;
export const getUserInfo =createAsyncThunk('auth/getUserInfo', async (id) => {
  try {
   
    const response = await axios.get(`${url}/post/getUserInfo/${id}`, { withCredentials: true });
    console.log("response",response.data)
    return response.data;
  } catch (error) {
   
    return error.response ? error.response.data : error.message;
  }
})
export const getUserProfileInfo =createAsyncThunk('auth/getUserProfileInfo', async () => {
  try {
    const response = await axios.get(`http://localhost:5000/post/getUserProfileInfo`, { withCredentials: true });
    console.log("response",response.data)
    return response.data;
  } catch (error) {
   
    return error.response ? error.response.data : error.message;
  }
})
export const sendRegister = createAsyncThunk('auth/sendRegister', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/auth/register', data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});
export const sendLogin = createAsyncThunk('auth/sendLogin', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/auth/login`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
})
export const sendLogout = createAsyncThunk('auth/sendLogout', async () => {
  try {
    const response = await axios.post('http://localhost:5000/auth/logout',{}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
})
export const addFollow = createAsyncThunk('auth/addedFollow', async (id) => {
  try {
    const response = await axios.put(`http://localhost:5000/post/followAdd/${id}`, null, {
      withCredentials: true, // Burada olmalı
    });
    return response.data;
  } catch (error) {
    console.error("Follow error:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
});

export const deleteFollow = createAsyncThunk('auth/deletedFollow', async (id) => {
  try {
    const response = await axios.put(`http://localhost:5000/post/followSub/${id}`, null, {
      withCredentials: true, // Aynı şekilde burada da
    });
    return response.data;
  } catch (error) {
    console.error("Unfollow error:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
});

  

const initialState = {
  isLogin: false,
  

  isCircular: false,
  userInfo:[],
  jwtToken: null,
  userProfileInfo:[],

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
  
 

  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRegister.pending, (state) => {
        state.isCircular = true;
      })
      .addCase(sendRegister.fulfilled, (state, action) => {
        state.isCircular = false;
        toast.success("Kayıt olundu");
        

      })
      .addCase(sendRegister.rejected, (state, action) => {
        state.isCircular = false;
        toast.error(action.payload.message);
      })
      .addCase(sendLogin.pending, (state) => {
        state.isCircular = true;

      })
      .addCase(sendLogin.fulfilled, (state, action) => {
        state.isCircular = false;
        
       state.isLogin = true;
        

        toast.success("Login succesfull");
      })
      .addCase(sendLogin.rejected, (state, action) => {
        state.isCircular = false;
        toast.error(action.payload.message);
      })
      .addCase(sendLogout.fulfilled, (state, action) => {
        state.isLogin = false;
        state.isCircular = false;
        toast.success("Logout succesfull");
      })
      .addCase(sendLogout.rejected, (state, action) => {
        state.isCircular = false;
        toast.error(action.payload.message);
      })
     .addCase(sendLogout.pending, (state) => {
       state.isCircular = true;
     })
     .addCase(getUserInfo.fulfilled, (state, action) => {
       state.userInfo=action.payload.user || []
       console.log("action paylodMİx:",action);
       console.log("stateMix:",state.userInfo);
       
       state.isCircular = false;
      })
     .addCase(getUserInfo.rejected, (state, action) => {
       console.log("ERRORLOG",action);
       
     })
     .addCase(getUserInfo.pending, (state) => {
       state.isCircular = true;
       console.log("pending");
     })
     .addCase(getUserProfileInfo.fulfilled, (state, action) => {
       state.userProfileInfo=action.payload.user || []
       console.log("action paylod Profile:",action);
       console.log("state:",state.userProfileInfo);
       
       state.isCircular = false;
      })
     .addCase(getUserProfileInfo.rejected, (state, action) => {
       console.log("ERRORProfile",action);
       
     })
     .addCase(getUserProfileInfo.pending, (state) => {
       state.isCircular = true;
       console.log("pending");
     })
     .addCase(addFollow.fulfilled, (state, action) => {
     
     console.log("action Güncellendi:",action);
     console.log("state Güncellendi:",state);
     })
     .addCase(addFollow.rejected, (state, action) => {
       console.log("ERRORLOG",action);
       
     })
     .addCase(addFollow.pending, (state) => {
       state.isCircular = true;
       console.log(" ekleme pending");
     })
     .addCase(deleteFollow.fulfilled, (state, action) => {
     
     console.log("action Silindi:",action);
     console.log("state Silind:",state);
     })
     .addCase(deleteFollow.rejected, (state, action) => {
       console.log("ERRORLOG",action);
       
     })
     .addCase(deleteFollow.pending, (state) => {
       state.isCircular = true;
       console.log(" silme pending");
     })
     
      
  

  },
});

export const { setIsLogin } = authSlice.actions;

export default authSlice.reducer;