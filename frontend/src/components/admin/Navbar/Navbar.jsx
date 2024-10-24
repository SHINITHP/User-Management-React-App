import React, { useState } from "react";
import logo from "../../../assets/trend-era-logo2.png";
import Modal from "../Action/Modal";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { logout } from '../../../Redux/adminSlice'
import { useNavigate } from "react-router-dom";




const Navbar = ({ onSearch, addUser }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };


  return (
    <div className="Header">
      <img className="logo" src={logo} alt="Logo" />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <i
        className="fas fa-user-plus"
        style={{ fontSize: "20pt", cursor: "pointer" }}
        onClick={() => {
          setModalOpen(true);
          setAction("Add");
        }}
      ></i>

      <div
        className="profile"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="profile-pic" src={logo} alt="Profile Picture" />
          <h1 className="profile-name">
            Profile{" "}
            <span>
              <i className="fa-solid fa-caret-down"></i>
            </span>
          </h1>
          {showLogout && (
            <div className="logout">
              <h1 className="logout-btn" onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt"></i>
                Logout
              </h1>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setModalOpen(false);
            addUser();
          }}
          actionType={action}
        />
      )}
    </div>
  );
};

export default Navbar;
