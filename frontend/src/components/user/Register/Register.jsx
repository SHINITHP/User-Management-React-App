import React, { useEffect, useState } from "react";
import "./Register.css";
import logo from "../../../assets/trend-era-logo2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// For Form-validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Form-Validation End

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Form Validation Schema
  const schema = yup.object().shape({
    userName: yup.string().required("Username is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    mobile: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
  });

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Form data handling
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        data
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          userName: "",
          email: "",
          mobile: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Registration failed");
      console.log(error);
    }
  };

  return (
    <div className="loginRegister">
      <div className="left_Container">
        <img src={logo} alt="" />
        <h1 className="left-greating">Welcome to Trend-Era!</h1>
        <p>SHAPING THE ERA OF MODERN LIVING</p>
      </div>

      <div className="right_Container">
        <h1 style={{ marginBottom: "30px" }}>Create an account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={"register_form"}>
          <div className="input_wrapper">
            <i className="fas fa-user input-icon" style={{ top: "40%" }}></i>
            <input
              {...register("userName")}
              name="userName"
              value={formData.userName}
              onChange={handleInputChanges}
              className="form_inputs"
              placeholder="Enter your Username"
              required
              type="text"
            />
            {errors.userName && (
              <p className="error-message">{errors.userName.message}</p>
            )}
          </div>

          <div className="input_wrapper">
            <i className="fas fa-phone input-icon" style={{ top: "45%" }}></i>
            <input
              {...register("mobile")}
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChanges}
              className="form_inputs"
              placeholder="Enter your Phone Number"
              required
              type="tel"
            />
            {errors.mobile && (
              <p className="error-message">{errors.mobile.message}</p>
            )}
          </div>

          <div className="input_wrapper">
            <i className="fas fa-envelope input-icon"></i>
            <input
              {...register("email")}
              name="email"
              value={formData.email}
              onChange={handleInputChanges}
              className="form_inputs"
              placeholder="Enter your Email"
              required
              type="email"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="input_wrapper">
            <i className="fas fa-lock lock" style={{ top: "27%" }}></i>
            <input
              {...register("password")}
              name="password"
              value={formData.password}
              onChange={handleInputChanges}
              className="form_inputs"
              placeholder="Enter your Password"
              required
              type="password"
            />
            {errors.password && (
              <p className="error-message" style={{ bottom: "16px" }}>
                {errors.password.message}
              </p>
            )}

            <label className="toggle-password">
              <input type="checkbox" />
              Show Password
            </label>
          </div>
          <button type="submit" className="btn-Submit">
            Create an Account
          </button>
        </form>
        <div className="login-prompt" style={{ marginTop: "10px" }}>
          <p>
            Already have an account?
            <span className="login-text" onClick={() => navigate("/login")}>
              Sign In
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
