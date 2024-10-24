import React, { useState } from "react";
import logo from "../../../assets/trend-era-logo2.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="Header">
      <img className="logo" src={logo} alt="Logo" />

      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className="profile">
        {isAuthenticated ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="profile-pic" src={user?.profileImage || ""} alt="Profile Picture" />
            <h1
              className="profile-name"
              onClick={() => navigate("/profile")}
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              {user?.userName || ""}
              <span>
                <i className="fa-solid fa-caret-down"></i>
              </span>
            </h1>
            {showLogout && (
              <div
                className="logout"
                onMouseEnter={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
              >
                <h1 className="logout-btn" onClick={handleLogout}>
                  <i className="fa-solid fa-sign-out-alt"></i>
                  Logout
                </h1>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button onClick={() => navigate("/login")} className="login-btn">
              Login/Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
