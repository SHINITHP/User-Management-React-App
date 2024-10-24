import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../../assets/trend-era-logo2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../../Redux/userSlice";



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.user);
  // console.log('user :',user);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form data handling
  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await dispatch(login({ email: formData.email, password: formData.password }));
  
      if (login.fulfilled.match(result)) {
        const { user } = result.payload
        console.log('result.payload.user.user :',user)
        navigate('/');
        toast.success(result.payload.message); 
        localStorage.setItem('token', result.payload.token)
        localStorage.setItem('userId', result.payload.user.userId);
        localStorage.setItem('user', JSON.stringify(user));
      } else if (login.rejected.match(result)) {
        toast.error(result.payload); 
      } else {
        toast.error("Unexpected login response");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
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
              {/* <input type="checkbox" />
              Show Password */}
            </label>
          </div>
          <button type="submit" className="btn-Submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
          </button>
          {error && <p>{error}</p>}
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
