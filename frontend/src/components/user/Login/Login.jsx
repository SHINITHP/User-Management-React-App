import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../../assets/trend-era-logo2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form data handling
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/get/login",
        data
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          email: "",
          password: "",
        });
        // navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login failed");
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
        <h1 style={{ marginBottom: "30px" }}>Sign In</h1>
        <form onSubmit={onSubmit} className={"login_form"}>
          <div className="input_wrapper">
            <i className="fas fa-envelope input-icon"></i>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChanges}
              className="form_inputs"
              placeholder="Enter your Email"
              required
              type="email"
            />

            <p className="error-message"></p>
          </div>

          <div className="input_wrapper">
            <i className="fas fa-lock lock" style={{ top: "27%" }}></i>
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChanges}
              className="form_inputs"
              placeholder="Enter your Password"
              required
              type="password"
            />
            <p className="error-message" style={{ bottom: "16px" }}></p>

            <label className="toggle-password">
              <input type="checkbox" />
              Show Password
            </label>
          </div>
          <button type="submit" className="btn-Submit">
            Sign In
          </button>
        </form>
        <div className="login-prompt" style={{ marginTop: "10px" }}>
          <p>
            Don't have an account yet?
            <span className="login-text" onClick={() => navigate("/register")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
