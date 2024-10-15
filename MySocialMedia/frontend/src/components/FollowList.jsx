import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

function FollowList() {
  const { _id, followings, followers } = useSelector(
    (state) => state.auth.userInfo
  );

  return (
    <div className="flex-1   ">
      <div
        className={`   rounded-lg  w-[316px] h-[400px] bg-gray-500 overflow-auto scroll-hidden border-2 z- border-slate-400 transition-all duration-300 ease-in-out flex flex-col items-center `}
      >
         <h1 className=" font-bold text-[#b2c5eb] text-xl">Followings</h1>
        {followings && followings.length ? (
          followings.map((following, index) => (
            <Link
             
              to={`/profile/${following.user}`}
              key={index}
              className="flex flex-col justify-center items-center  bg-gradient-to-t w-[100px] h-[100px] rounded-full  from-slate-700 via-gray-400 to-gray-600 mb-6 mt-6 "
            >
              <img
                 className="w-16  h-16 rounded-full object-cover  "
                src={following.followingPic}
                alt=""
              />
              {/* <div className="text-white p-3 text-center  ">
                {following.followingUsername}
              </div> */}
            </Link>
          ))
        ) : (
          <div className="text-white text-center p-3 mt-20">NO ONE FOLLOWING</div>
        )}
      </div>
      <div
        className={`  rounded-lg  w-[316px] h-[400px]  bg-gray-500 overflow-auto scroll-hidden border-2 z- border-slate-400 transition-all duration-300 ease-in-out flex flex-col items-center`}
      >
        <h1 className=" font-bold text-[#d0d2d7] text-xl">Followers</h1>
        {followers&& followers.length ? (
          followers.map((follower, index) => (
            <Link
             
              to={`/profile/${follower.user}`}
              key={index}
              className="flex flex-col justify-center items-center  bg-gradient-to-t w-[100px] h-[100px] rounded-full  from-slate-700 via-gray-400 to-gray-600 mb-6 mt-6 "
            >
              <img
                className="w-16  h-16 rounded-full object-cover  "
                src={follower.followerPic}
                alt=""
              />
              {/* <div className="text-white p-3 text-center  ">
                {follower.followerUsername}
              </div> */}
            </Link>
          ))
        ) : (
            <div className="text-white text-center p-3 mt-20">NO ONE FOLLOWER</div>
        )}
      </div>
    </div>
  );
}

export default FollowList;
