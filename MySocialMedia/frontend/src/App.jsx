import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, getUserInfo } from "./redux/authSlice";

const PrivateRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.auth);
  return isLogin ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") ? true : false;
    dispatch(setIsLogin(isLogin));
  }, [dispatch]);

  const { isLogin } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.auth.userInfo);
  

  return (
    <div className=" bg-gradient-to-t from-gray-300 via-gray-400 to-gray-500">
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        />

        <Route path="/profile/:idParam" element={isLogin && <Profile />} />
      </Routes>
    </div>
  );
}

export default App;
