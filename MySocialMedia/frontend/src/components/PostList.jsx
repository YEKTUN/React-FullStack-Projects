import React, { useEffect } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../redux/postSlice';
import { useParams } from 'react-router-dom';


function PostList({ profilePic }) {
  const dispatch = useDispatch();
  const { images, isCircular } = useSelector(state => state.posts);
const{idParam}=useParams()

  useEffect(() => {
    dispatch(getPosts(idParam));
  }, [dispatch,idParam]);
  if (isCircular) {
    return <div>Loading...</div>;
  }

const sortedImages = images
  .map((image) => ({ ...image })) // Yeni bir dizi oluşturma
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div className='flex flex-col w-full h-[1500px]  justify-start items-center overflow-auto scroll-hidden pb-10'>
      {sortedImages && sortedImages.length > 0 ? (
        sortedImages.map((image) => (
          

            <Post
              key={image._id}
              post={image.image}
              description={image.description}
              likes={image.likes}
              comments={image.comments}
              id={image._id}
              userId={image.user}
              date={image.createdAt}
              profilePic={profilePic}
            />
         
         
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
}

export default PostList;
