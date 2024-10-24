import React, { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Modal = ({ onClose, user, actionType }) => {
  const [password, setPassword] = useState("");

  const schema = yup.object().shape({
    userName: yup
      .string()
      .transform((value) => value.trim())
      .required("Username is required"),
    password: actionType === "Add"
      ? yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required")
      : yup.string(),  // No validation on edit
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      reset({
        userName: user.userName,
        email: user.email,
        mobile: user.mobile,
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    console.log("Submitting form with action type:", actionType);

    if (actionType === "Edit") {
      const updatedUserData = {
        userName: data.userName,
        email: data.email,
        mobile: data.mobile,
      };

      axios
        .put(`http://localhost:5000/admin/users/${user?._id}`, updatedUserData, 
          {
            withCredentials: true,
          })
        .then((response) => {
          toast.success("User updated successfully!");
          onClose();
        })
        .catch((error) => {
          console.error("Error updating user", error);
          toast.error("Failed to update user.");
        });
    } else {
      const newUserData = {
        userName: data.userName,
        email: data.email,
        mobile: data.mobile,
        password: password,
      };

      axios
        .post(`http://localhost:5000/admin/users`, newUserData, 
          {
            withCredentials: true,
          })
        .then((response) => {
          toast.success("User created successfully!");
          onClose();
        })
        .catch((error) => {
          console.error("Error creating user", error);
          toast.error("Failed to create user.");
        });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ color: "black", width: "100%", textAlign: "center" }}>
          {actionType} User
        </h2>
        {user?.profileImage && (
          <div className="user-image-container">
            <img src={user.profileImage} alt="User" className="user-image" />
          </div>
        )}
        <form
          className="modal-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label>Name:</label>
            <input
              {...register("userName")}
              name="userName"
              type="text"
              placeholder="Enter Name"
            />
            {/* <p className="error"></p> */}
            {errors.userName && <p className="error">{errors.userName.message}</p>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              {...register("email")}
              name="email"
              type="email"
              placeholder="Enter Email"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Number:</label>
            <input
              {...register("mobile")}
              type="tel"
              name="mobile"
              placeholder="Enter Number"
            />
            {errors.mobile && <p className="error-message">{errors.mobile.message}</p>}
          </div>
          {actionType === "Add" && (
            <div className="form-group">
              <label>Password:</label>
              <input
                {...register("password")}
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
          )}
          <div className="modal-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
