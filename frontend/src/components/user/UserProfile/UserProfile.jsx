import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Navbar from "../Navbar/Navbar";
import dashboard_icon from "../../../assets/home.png";
import wishlist_icon from "../../../assets/wish-list.png";
import about_icon from "../../../assets/info.png";
import order_icon from "../../../assets/order.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UserProfile = (userDetails = "") => {
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    _id: user._id,
    userName: user.userName,
    email: user.email,
    mobile: user.mobile,
    profileImage: user.profileImage,
  });

  //Form Validation Schema
  const schema = yup.object().shape({
    userName: yup
      .string()
      .transform((value) => value.trim())
      .required("Username is required"),
      
    email: yup
      .string()
      .transform((value) => value.trim())
      .email("Email is invalid")
      .required("Email is required"),

    mobile: yup
      .string()
      .transform((value) => value.trim())
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [imageFile, setImageFile] = useState(null);
  const [profile, setProfile] = useState(user.profileImage);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file");
        return;
      }
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfile(imageUrl); // Use URL.createObjectURL for instant preview
    }
  };

  const imageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "trend_era");
    formData.append("cloud_name", "dasfiuptz");
    formData.append("folder", "Profile_Images");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dasfiuptz/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    try {
      let uploadedImageUrl = formData.profileImage;
      if (imageFile) {
        uploadedImageUrl = await imageUpload(imageFile);
        if (!uploadedImageUrl) {
          throw new Error("Failed to upload image");
        }
      }

      const updatedFormData = { ...formData, profileImage: uploadedImageUrl };
      const { data } = await api.put("/editProfile", updatedFormData);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

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
            <form
              className="profile-form"
              id="survey-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="profile-container">
                <img className="left-profile-pic" src={profile} alt="Profile" />
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
                <ul>
                  <li className="li">
                    <input
                      {...register("userName")}
                      id="userName"
                      className="input-text"
                      type="text"
                      name="userName"
                      placeholder="Your name"
                      value={formData.userName}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.userName && (
                      <p className="error">{errors.userName.message}</p>
                    )}
                  </li>

                  <li className="li">
                    <input
                      {...register("email")}
                      id="email"
                      className="input-text"
                      type="email"
                      name="email"
                      placeholder="Your email"
                      onChange={handleInputChange}
                      value={formData.email}
                    />
                    {errors.email && (
                      <p className="error">{errors.email.message}</p>
                    )}
                  </li>

                  <li className="li">
                    <input
                      {...register("mobile")}
                      id="mobile"
                      className="input-text"
                      type="tel"
                      name="mobile"
                      placeholder="Your number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.mobile && (
                      <p className="error">{errors.mobile.message}</p>
                    )}
                  </li>

                  <li>
                    <button id="submit" className="btn-submit" type="submit" disabled={loading} >
                      {loading ? "Uploading..." : "Submit"}
                    </button>
                  </li>
                </ul>
              </main>
            </form>
          </div>
          <div className="address-content"></div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
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
