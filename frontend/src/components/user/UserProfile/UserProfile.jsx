import React, { useState } from "react";
import './UserProfile.css'
import Navbar from "../Navbar/Navbar";
import dashboard_icon from "../../../assets/home.png";
import wishlist_icon from "../../../assets/wish-list.png";
import about_icon from "../../../assets/info.png";
import order_icon from "../../../assets/order.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";



const UserProfile = (userDetails='', ) => {

  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    userName: user.userName,
    email: user.email,
    mobile: user.mobile,
    profileImage: user.profileImage,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, profileImage: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Navbar userDetails={userDetails} />
      <div className="main-content">
        <div className="left-content">
          <div className="left-Buttons">
            <button className="dashboard-btn">
              <img
                className="dashboard_icon"
                src={dashboard_icon}
                alt="Dashboard Icon"
              />
              Dashboard
            </button>
            <button className="dashboard-btn">
              <img
                className="dashboard_icon"
                src={wishlist_icon}
                alt="Wishlist Icon"
              />
              Wishlist
            </button>
            <button className="dashboard-btn">
              <img
                className="dashboard_icon"
                src={order_icon}
                alt="Orders Icon"
              />
              My Orders
            </button>
            <button className="dashboard-btn">
              <img
                className="dashboard_icon"
                src={about_icon}
                alt="About Us Icon"
              />
              About Us
            </button>
          </div>
        </div>
        <div className="right-content">
          <div className="personal-info">
            <form id="survey-form" onSubmit={handleSubmit}>
              <div className="profile-container">
                <img
                  className="left-profile-pic"
                  
                  alt="Profile"
                />
                <input
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="file-input"
                />

                <label htmlFor="file-input" className="edit-icon">
                  <i className="fas fa-edit"></i>
                </label>
              </div>

              <header className="header">
                <h1 id="title" className="h1">
                  Personal Info
                </h1>
              </header>

              <main>
                <div>
                  <ul className="ul">
                    <li className="li">
                      <label htmlFor="userName" className="label-main">
                        Name
                      </label>
                      <input
                        id="userName"
                        className="input-text"
                        type="text"
                        name="userName"
                        placeholder="Your name"
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                      />
                    </li>
                    <li className="li">
                      <label htmlFor="email" className="label-main">
                        Email
                      </label>
                      <input
                        id="email"
                        className="input-text"
                        type="email"
                        name="email"
                        placeholder="Your email"
                        onChange={handleInputChange}
                        value={formData.email}
                      />
                    </li>
                    <li className="li">
                      <label htmlFor="mobile" className="label-main">
                        Number
                      </label>
                      <input
                        id="mobile"
                        className="input-text"
                        type="tel"
                        name="mobile"
                        placeholder="Your number"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                      />
                    </li>
                  </ul>
                </div>

                <div>
                  <button id="submit" className="button" type="submit">
                    Submit
                  </button>
                </div>
              </main>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container for displaying toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default UserProfile;
