import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout"; // Örneğin, logout simgesi
import { setIsLogin, sendLogout } from "../redux/authSlice";
import axios from "axios";
import SearchUsers from "./SearchUsers";

function Navbar() {
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const inputRef = useRef(null); // Arama input'una referans
  const searchBoxRef = useRef(null);

  const navigate = useNavigate();

  const { idParam } = useParams();
  const { _id } = useSelector((state) => state.auth.userProfileInfo);

  const searchWithUsername = async () => {
    if (search.trim() === "") {
      setSearchUsers([]); // Arama kutusu boşsa sonuçları temizle
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/userInfo/search-user/${search}`,
        { withCredentials: true }
      );
      setSearchUsers(response.data.users); // Doğru yer burası
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Eğer tıklanan yer, arama input'u veya arama kutusu değilse kapat
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setOpenSearchBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Component unmount olduğunda event listener'ı temizle
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    searchWithUsername();
  }, [search, searchUsers.length]);

  const logout = () => {
    dispatch(sendLogout());
    localStorage.removeItem("isLogin");

    dispatch(setIsLogin(false));
    navigate("/login");
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") ? true : false;
    dispatch(setIsLogin(isLogin));
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-t from-gray-300 via-gray-400 to-gray-500 w-full h-24 flex items-center justify-between rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]">
      <img
        className="w-14 h-14 ml-3 rounded-full"
        src="/ali_icon-playstore.png"
        alt=""
      />
      <div className="flex flex-col h-full w-full justify-center items-center">
        <input
          onFocus={() => setOpenSearchBar(true)}
          ref={inputRef}
          placeholder="Search"
          type="text"
          className=" z-10 w-3/8 md:w-1/4 h-9 md:h-12 ml-4  mr-1 md:mr-2 md:ml-20  bg-slate-300 border-slate-300 border-2 text-sm  p-2 rounded-2xl  focus:border-gray-400 focus:outline-none placeholder:text-gray-500 "
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div ref={searchBoxRef} className=" absolute top-1 left-[506px] ">
          <SearchUsers
            searchUsers={searchUsers}
            openSearchBar={openSearchBar}
            setOpenSearchBar={setOpenSearchBar}
          />
        </div>
      </div>
      <div className="flex items-center mr-3 w-1/8 gap-6">
       
          <Link
            className={` 
            text-black hover:text-gray-500 active:text-gray-950`}
            to={"/"}
          >
            Home
          </Link>
        

        {isLogin && (
          <Link
            className={` text-black hover:text-gray-500 active:text-gray-950`}
            to={_id && "/profile/" + _id}
          >
            Profile
          </Link>
        )}

        {isLogin ? (
          <LogoutIcon
            onClick={logout}
            className="w-32 h-32  text-gray-700"
            sx={{ fontSize: 40 }}
          />
        ) : (
          <Link
            className="text-black hover:text-gray-500 active:text-gray-950"
            to={"/login"}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
