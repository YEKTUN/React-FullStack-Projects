import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import{  url} from '../backendUrl';
const initialState = {
  images: [],
  isCircular: false, 
  mixPost:[]
}

export const sendPost = createAsyncThunk('posts/sendPosts', async (formData) => {
  try {
    const response = await axios.post(`${url}/auth/logout`, formData,{withCredentials: true});
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
});

export const getPosts = createAsyncThunk('posts/getPosts', async (id) => {
  try {
    const response = await axios.get(`${url}/post/post-all/${id}`,{withCredentials: true});
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
});
export const mixGetPost = createAsyncThunk('posts/mixGetPost', async () => {
  try {
    const response = await axios.get(`${url}/post/mixGetPost`,{withCredentials: true});
   
    return response.data;
  } catch (error) {
    
    throw error;
  }
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPost.fulfilled, (state, action) => {
        
        window.location.reload();
      })
      .addCase(sendPost.rejected, (state, action) => {
        
      })
      .addCase(sendPost.pending, (state) => {
        state.isCircular = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        
        state.images=action.payload.posts || []
        
        state.isCircular= false
       
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isCircular = false;
        
      })
      .addCase(getPosts.pending, (state) => {
        state.isCircular = true;
      })
      .addCase(mixGetPost.fulfilled, (state, action) => {
        
        state.mixPost=action.payload.posts || []
        console.log("action.payload.postsMix", action.payload.posts);
        
        state.isCircular= false
       
      })
      .addCase(mixGetPost.rejected, (state, action) => {
        state.isCircular = false;
        
        
      })
      .addCase(mixGetPost.pending, (state) => {
        state.isCircular = true;
        console.log("state.isCircular", state.isCircular);
      })
  }
});

export const {} = postSlice.actions;
export default postSlice.reducer;
