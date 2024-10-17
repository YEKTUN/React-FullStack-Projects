import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoIosHeart } from "react-icons/io";
import { FaArrowDown, FaRegHeart } from "react-icons/fa6";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfileInfo } from "../redux/authSlice";
import { FaArrowUp } from "react-icons/fa";
import {url} from '../backendUrl'

function Post({
  post,
  description,
  likes,
  comments,
  id,
  updateLikes,
  userId,
  date,
  profilePic,
}) {
  const [localLikes, setLocalLikes] = useState(likes.length);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { paramId } = useParams();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const commentTo = useRef();
  const commentToInput = useRef();

  const dispatch = useDispatch();
  const {
    _id: currentUserId,
    username,
    profilePic: currentProfilePic,
    username: currentUsername,
  } = useSelector((state) => state.auth.userProfileInfo);

  // Beğeni ekleme/kaldırma fonksiyonu
  const handleLike = async () => {
    try {
      const updatedLikes = liked
        ? likes.filter((likeId) => likeId !== currentUserId) // Beğeniyi kaldır
        : [...likes, currentUserId]; // Beğeniyi ekle

      const response = await axios.put(
        `${url}/post/update-likes/${id}`,
        { likes: updatedLikes },
        { withCredentials: true }
      );

      setLocalLikes(response.data.post.likes.length);
      setLiked(!liked);
    } catch (error) {
      console.error("Error handling like:", error);
      alert("Failed to update like");
    }
  };

  useEffect(() => {
    if (likes.includes(currentUserId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, currentUserId]);

  useEffect(() => {
    dispatch(getUserProfileInfo());
  }, [paramId, dispatch]);

  const updateComment = async (newComment) => {
    try {
      const response = await axios.put(
        `${url}/post/update-comment/${id}`,
        {
          comment: newComment,
          commentPic: currentProfilePic,
          commentUsername: currentUsername,
        },
        { withCredentials: true }
      );

      // Yorum inputunu temizle
      setComment("");

      // Son yorumun bulunduğu yere kaydır
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${url}/post/get-comments/${id}`,
        { withCredentials: true }
      );

      setCommentList(response.data.comments);
      setCurrentUser(userId);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [id, comment]);

  const formattedDate = format(new Date(date), "dd:MM:yyyy / HH:mm", {
    locale: tr,
  });
  const formatDate = format(new Date(date), "HH:mm", {
    locale: tr,
  });
  return (
    <div className=" w-[350px] max-h-[600px] md:w-[450px] flex flex-col items-center justify-center shadow-lg rounded-2xl mt-8 bg-gradient-to-b from-[#504f4f] to-[#c4c2c2] ">
      <div className="flex p-2 items-center w-full h-[100px] justify-between">
        <div className="flex mt-2 ml-2 items-center gap-x-2">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={profilePic}
            alt=""
          />
          <p>{`@${currentUsername}`}</p>
        </div>
        <p className="text-[10px] font-bold">{formattedDate}</p>
      </div>

      <p
        className="text-start text-black w-full p-4 text-sm "
        style={{ overflowWrap: "break-word" }}
      >
        {description}
      </p>

      {/* Resim kontrolü ve gösterim */}
      {post ? ( // Burada `post` var mı kontrolü yapılıyor
        <div className="w-full h-[250px] flex items-center justify-center rounded-lg">
          <img
            className="w-[250px] h-[250px] object-cover  rounded-lg"
            src={post}
            alt=""
          />
        </div>
      ) : (
        <div className="w-full h-[30px]"></div> // Resim yoksa küçük bir alan bırakıyoruz
      )}

      <div className="flex justify-start items-center gap-x-1 w-full pl-4">
        <button
          onClick={handleLike}
          className="flex justify-center items-center gap-x-1"
        >
          {liked ? <IoIosHeart /> : <FaRegHeart />}
          <p>{localLikes}</p>
        </button>
        <button
          onClick={() => setIsCommentOpen(!isCommentOpen)}
          className="flex justify-center items-center gap-x-1 "
        >
          <FaComment />
          <p>{commentList.length}</p>
        </button>
      </div>
      <div
        className={`w-full  ml-10 mt-2 transition-all duration-500 ease-in-out overflow-auto scroll-hidden ${
          isCommentOpen
            ? "  max-h-[200px] pointer-events-auto  "
            : "  max-h-0 pointer-events-none"
        }`}
      >
        <input
          ref={commentToInput}
          placeholder="Add a comment..."
          multiple
          className="w-3/5  rounded-r-2xl p-1 pl-3"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className={`   text-white p-2 text-[12px] ml-6 rounded-full bg-black`}
          onClick={() => updateComment(comment)}
        >
          Add Comment
        </button>
        <FaArrowDown
          className=" w-4 h-4 relative top-[10px] active:opacity-25 left-[380px] bottom-6 cursor-pointer"
          onClick={() => {
            commentTo.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }}
        />
        {commentList.length > 0 ? (
          commentList.map((comment, index) => (
            <div
              className="h-auto flex gap-x-2 mt-2  justify-start items-center"
              ref={commentTo}
              key={comment._id}
            >
              <img
                src={comment.commentPic}
                className="w-[50px] h-[50px] rounded-full mt-6"
                alt=""
              />
              <div>
                <div className="flex gap-x-2 justify-start items-center">
                  <p className="text-sm font-bold">{`@${comment.commentUsername}`}</p>
                  <p className="text-[10px] mt-1">{formatDate}</p>
                </div>
                <p
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  className="text-sm  w-[300px] "
                >
                  {comment.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p  className="text-[20px] font-semibold text-center mr-20">
            No comments
          </p>
        )}
        <FaArrowUp
          onClick={() => {
            commentToInput.current.scrollIntoView({ behavior: "smooth" , block: "nearest" });
          }}
          className=" w-4 h-4 relative active:opacity-25 left-[380px] bottom-6 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Post;
