import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const updateUserInfo = createAsyncThunk('userInfo/updateUserInfo', async ({ id, data }) => {
    try {
        const response = await axios.post(`http://localhost:5000/userInfo/update-info/${id}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response ? error.response.data : error.message);
        return error.response ? error.response.data : error.message;
    }
});
export const getInfo= createAsyncThunk('userInfo/getInfo', async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/userInfo/get-info/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
       throw error
    }
})
const initialState = {
   
    status: 'idle',
    name: '',
    surname: '',
    tel: '',
    about: '',
    email: ''
}
export const  userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setSurname: (state, action) => {
            state.surname = action.payload
        },
        setTel: (state, action) => {
            state.tel = action.payload
        },
        setAbout: (state, action) => {
            state.about = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getInfo.fulfilled, (state, action) => {
                console.log("action.payload.user", action.payload);
                const user = action.payload || {}; 

                state.about = user.about || ''; 
                state.name = user.name || '';
                state.surname = user.surname || '';
                state.tel = user.tel || '';
                state.email = user.email || '';
                console.log("state.email", state.email);
            
                state.status = 'succeeded';
             
            })
            .addCase(getInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                
                state.status = 'succeeded';
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.status = 'failed';
                console.log(action.error);
            })
    }
})
export const  { setAbout, setName, setSurname, setTel  } = userInfoSlice.actions;
export default userInfoSlice.reducer