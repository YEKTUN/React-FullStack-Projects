import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { mixGetPost } from '../redux/postSlice';
import {getUserInfo} from '../redux/authSlice'
import { useParams } from 'react-router-dom';
import PostHome from './PostHome';


function PostListHome() {
  const dispatch = useDispatch();
  const { isCircular ,mixPost} = useSelector(state => state.posts);
const{idParam}=useParams()


  useEffect(() => {
   dispatch(mixGetPost());
  
  }, [dispatch]);
  if (isCircular) {
    return <div>Loading...</div>;
  }


  return (
    <div className='flex flex-col w-full h-[1500px]  justify-start items-center overflow-auto scroll-hidden pb-10'>
      {  mixPost && mixPost.length > 0  ? (
        mixPost.map((image) => (
          

            <PostHome
              key={image._id}
              post={image.image}
              description={image.description}
              likes={image.likes}
              comments={image.comments}
              id={image._id}
              userId={image.user}
              date={image.createdAt}
              usernameMix={image.usernamePost}
              profilePicMix={image.userPic}
              
            />
         
         
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
}

export default PostListHome;
