import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchUsers({ searchUsers, openSearchBar, setOpenSearchBar, }) {
  // searchUsers undefined ya da null olursa boş bir array döndürüyoruz.
  if (!Array.isArray(searchUsers)) {
    return null;
  }
  const {images}=useSelector((state)=>state.posts)
  const clickHandler = () => {
    setOpenSearchBar(!openSearchBar);
  
   
  };

  return (
    <div
      className={`absolute ml-[70px] rounded-lg top-16 w-[316px] min-h-[250px] max-h-[250px] bg-gray-500 overflow-auto scroll-hidden border-2 z- border-slate-400 transition-all duration-300 ease-in-out ${
        openSearchBar ? " pointer-events-auto  opacity-100 translate-y-0 scale-100" : " pointer-events-none opacity-0 translate-y-5 scale-95"
      }`}
    >
      {searchUsers.length > 0 ? (
        searchUsers.map((user, index) => (
          
          <Link
          onClick={clickHandler}
            to={`/profile/${user._id}`}
            key={index}
            className="flex justify-center bg-gradient-to-t from-slate-700 via-gray-400 to-gray-600 mb-6 mt-6 items-center"
          >
            <img
              className="w-10 h-10 rounded-full object-cover absolute left-4"
              src={user.profilePic}
              alt=""
            />
            <div className="text-white p-3 text-center relative left-6">
              {user.username}
            </div>
          </Link>
        ))
      ) : (
        <div className="text-white text-center p-3">No users found</div>
      )}
    </div>
  );
}

export default SearchUsers;
