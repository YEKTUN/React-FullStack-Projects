import React, { useState, useEffect, useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import PostModal from "../components/PostModal";
import PostList from "../components/PostList";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { getUserInfo, getUserProfileInfo,addFollow,deleteFollow } from "../redux/authSlice";
import { sendPost } from "../redux/postSlice";
import {
  getInfo,
  updateUserInfo,
  setAbout,
  setName,
  setSurname,
  setTel,
} from "../redux/userInfoSlice";
import { useParams } from "react-router-dom";
import FollowList from "../components/FollowList";

const profileItems = [
  { id: 1, value: "Name" },
  { id: 2, value: "Surname" },
  { id: 3, value: "Email" },
  { id: 4, value: "Tel" },
  { id: 5, value: "About" },
];

function Profile() {
  const [editableItemId, setEditableItemId] = useState(null);
  const [modal, setModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const [tweet, setTweet] = useState("");
  const[follow,setFollow]=useState(false)


  const dispatch = useDispatch();

  const { idParam } = useParams();

  const { email, name, surname, tel, about } = useSelector(
    (state) => state.userInfo
  );
  const { _id,followings,followers } = useSelector((state) => state.auth.userProfileInfo);
  
  
  console.log("followings",followings)
  console.log("followers",followers)

  useEffect(() => {
    if (Array.isArray(followers) && Array.isArray(followings)) {
      const isFollowing = followings.some(following => following.user === idParam);
      setFollow(isFollowing);
    }
  }, [followings, followers, idParam]);
  
  

  const sendTweet = () => {
    const formData = new FormData();

    formData.append("description", tweet);

    try {
      dispatch(sendPost(formData));
    } catch (error) {}
  };


  const fileInputRef = useRef(null);
  const setEditableHandler = (id) => {
    setEditableItemId(id === editableItemId ? null : id);
  };
  const setEditableHandlerApi = () => {
    dispatch(
      updateUserInfo({
        id: idParam,
        data: { about, name, surname, tel, email },
      })
    );
    setEditableItemId(null); // veya başka bir id ile geri setleyin
  };

  const getProfilePic = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/post/getProfilePhoto/${idParam}`,
        { withCredentials: true }
      );
      setProfilePic(response.data.profilePic);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };
  const updateProfilPic = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/post/updateProfilePic`,
        formData,

        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setSelectFile(e.target.files[0]);
  };
  const handleSubmit = () => {
    try {
      if (selectFile) {
        const formData = new FormData();
        formData.append("profilePic", selectFile);
        try {
          updateProfilPic(formData);
        } catch (error) {
          console.error("Error updating profile picture:", error);
          alert("Failed to update profile picture. Please try again.");
        }
      }
    } catch (error) {}
  };
  const handleFileInputChange = (event) => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (selectFile) {
      handleSubmit();
    } else {
    }
  }, [selectFile]);

  useEffect(() => {
    dispatch(getUserProfileInfo());
    dispatch(getUserInfo(idParam));
    dispatch(getInfo(idParam));
    getProfilePic();
  }, [dispatch, idParam, _id, follow]);

  const addedFollow = () => {
    dispatch(addFollow(idParam));
    setFollow(true); // Takip etme işleminden sonra durumu güncelle
  };
  
  const deletedFollow = () => {
     dispatch(deleteFollow(idParam));
    setFollow(false); // Takibi bırakma işleminden sonra durumu güncelle
  };
  


  const regex = /^(\+90|0)?5\d{2} ?\d{3} ?\d{4}$/;
  return (
    <div className="flex justify-center items-center w-full h-full mt-4  ">
        
      <div className="flex bg-transparent rounded-[50px]  border-[#566f9f] w-5/6 h-full  border-t-2 border-r-2 border-l-2 shadow">
      
        <div className="h-full w-1/4 border-2 hidden md:block ">
          <div className=" w-full h-2/6 rounded-full flex flex-col justify-center items-center ">
        
            <div className=" flex w-[140px] border-2 h-[140px] rounded-full justify-center items-center  mt-8 mb-6 ">
              <img
                className="w-full h-full rounded-full border-2  "
                src={profilePic}
                alt="profile"
              />
              <button
                onClick={handleFileInputChange}
                className={`flex w-[40px] h-[40px] bg-[#566f9f] border-2 rounded-full  mb-2 justify-center items-center absolute   ${idParam !== _id ? "top-[265px]" : "top-[265px]"} hover:bg-[#3164c4] active:bg-[#5d81c4]`}
              >
                <FaCamera />
              </button>
              <input
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                type="file"
                />
            </div>
            {idParam !== _id &&
           ( follow?<button className="bg-[#566f9f] rounded-[50px]  border-[#566f9f] w-[150px] h-[30px]  hover:bg-[#92b4db]   border-t-2 border-r-2 border-l-2 shadow" onClick={deletedFollow}>TAKİBİ BIRAK</button>:<button className="bg-[#126f9f] rounded-[50px]  border-[#566f9f] w-[150px] h-[30px] hover:bg-[#1264c4]   border-t-2 border-r-2 border-l-2 shadow" onClick={addedFollow}>TAKİP ET</button>)}
             
          </div>
          <div className="w-full h-4/6 p-4">
            {profileItems.map((item) => (
              <div key={item.id} className="flex justify-between gap-2 m-2">
                <div className="w-2/5 border-b-2">{item.value}</div>
                {item.id === 5 ? (
                  <textarea
                    className="w-full h-[200px] p-2 border-2 rounded bg-[#d5d7db] placeholder:text-[#566f9f] placeholder:font-bold text-[#3164c4]"
                    placeholder={item.value}
                    disabled={item.id !== editableItemId}
                    value={about}
                    onChange={(e) => dispatch(setAbout(e.target.value))}
                  />
                ) : (
                  <input
                    type="text"
                    maxLength={item.id === 4 ? 11 : 50}
                    onInput={
                      item.id === 4
                        ? (e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                          }
                        : null
                    }
                    onWheel={(e) => e.preventDefault()}
                    className="w-full h-[25px] p-2 border-2 rounded bg-[#d5d7db] placeholder:text-[#566f9f] placeholder:font-bold text-[#3164c4]"
                    placeholder={item.value}
                    disabled={item.id !== editableItemId || item.id === 3}
                    value={
                      item.id === 1
                        ? name || ""
                        : item.id === 2
                        ? surname || ""
                        : item.id === 3
                        ? email || ""
                        : item.id === 4
                        ? tel || ""
                        : ""
                    }
                    onChange={
                      item.id === 1
                        ? (e) => dispatch(setName(e.target.value))
                        : item.id === 2
                        ? (e) => dispatch(setSurname(e.target.value))
                        : item.id === 4
                        ? (e) => dispatch(setTel(e.target.value))
                        : null
                    }
                  />
                )}
                {editableItemId === item.id && item.id !== 3 ? (
                  <GiConfirmed
                    onClick={() => setEditableHandlerApi(item.id)}
                    className={`"text-[#12151a]  text-[30px] ${
                      item.id === 3 ? "hidden" : ""
                    }  hover:text-[#566f9f] active:text-[#949eb1]"`}
                  />
                ) : (
                  <CiEdit
                    onClick={() => setEditableHandler(item.id)}
                    className={`"text-[#12151a]  text-[30px] +${
                      item.id === 3 ? "unvisible" : ""
                    } hover:text-[#566f9f] active:text-[#949eb1]"`}
                  />
                )}
              </div>
            ))}
          </div>
          <FollowList />
        </div>
        <div className="w-full md:w-3/4 border-2 h-full flex justify-center items-center ">
          <div className="w-full h-full border-none md:border-2 flex flex-col items-center">
            <div className="border-2 rounded-full w-[70px] h-[70px] relative left-2 top-2 block md:hidden">
              <img
                src={profilePic}
                className=" w-full h-full rounded-full"
                alt=""
              />
            </div>
            {idParam === _id ? (
              <div className="  flex  justify-evenly items-start  w-full md:w-3/4  mt-4 md:mt-8 ">
                <div>
                  <button
                    className="border-2 border-black rounded-full hover:scale-105 transition-all duration-300 active:border-slate-600  active:scale-100  hover:text-slate-800  justify-center items-center  "
                    onClick={() => setModal(true)}
                  >
                    <MdAddPhotoAlternate size={27} />
                  </button>
                </div>
                <input
                  maxLength={200}
                  type="text"
                  className="w-3/4 h-[30px] text-sm   rounded-3xl pl-6 focus:outline-none"
                  placeholder="Write a tweet..."
                  value={tweet}
                  onChange={(e) => setTweet(e.target.value)}
                />
                <IoIosSend
                  size={27}
                  className=" text-[#3262b4]"
                  onClick={sendTweet}
                />
              </div>
            ) : null}
            <PostList profilePic={profilePic} />

            <PostModal setModal={setModal} modal={modal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
