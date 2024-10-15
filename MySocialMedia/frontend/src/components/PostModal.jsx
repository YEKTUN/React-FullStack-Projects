import React, { useState } from "react";
import { GiSplitCross } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { sendPost } from "../redux/postSlice";

function PostModal({ setModal, modal }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmtit = () => {
    
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("description", description);

    try {
      if(description.length > 0 && selectedFile) {
        
        dispatch(sendPost(formData));
    
      }else{
        alert("Please add description and image");}
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={` cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 w-[350px]  h-[350px]  bg-gradient-to-t from-black via-gray-500 to-gray-700 border-none rounded-2xl  ${
        modal ? "  pointer-events-auto opacity-100" : " opacity-0 pointer-events-none "
      } transition-all duration-300  `}
    >
      <GiSplitCross
        onClick={() => setModal(false)}
        size={25}
        className="absolute top-2 right-2 hover:text-[#566f9f] active:text-[#949eb1] text-red-500"
      />
      <div className="ml-4 mt-4 flex flex-col w-5/6 gap-y-3 ">
        <label htmlFor="description">Desription</label>
        <textarea
          maxLength={200}
          className="pl-1 h-[100px] rounded-lg text-sm"
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
        
          className="rounded-lg text-sm "
          type="file"
          id="image"
          placeholder="İmage"
          onChange={handleFileChange}
        />
        <div className="flex justify-evenly">
          <button
            onClick={handleSubmtit}
            className="w-1/3 border-2 text-center text-white bg-[#212121] rounded-full hover:scale-105 transition-all duration-300 active:border-slate-600  active:scale-100  hover:text-slate-500"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
