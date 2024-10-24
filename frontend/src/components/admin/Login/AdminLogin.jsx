import React, { useState } from "react";
import logo from "../../../assets/trend-era-logo2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/adminSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ email, password }));

      if (login.fulfilled.match(result)) {
        const { admin } = result.payload;
        navigate("/admin/Dashboard");
        localStorage.setItem("token", result.payload.token);
        localStorage.setItem("admin", JSON.stringify(admin));
        toast.success(result.payload.message);
      } else if (login.rejected.match(result)) {
        toast.error(result.payload);
      } else {
        toast.error("An unexpected error occurred");
        console.log(error);
      }
    } catch (error) {
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
        <h1 style={{ marginBottom: "30px" }}> Admin </h1>
        <form onSubmit={onSubmit} className={"login_form"}>
          <div className="input_wrapper">
            <i className="fas fa-envelope input-icon"></i>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
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
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="form_inputs"
              placeholder="Enter your Password"
              required
              type="password"
            />
            <p className="error-message" style={{ bottom: "16px" }}></p>

            {/* <label className="toggle-password">
              <input type="checkbox" />
              Show Password
            </label> */}
          </div>
          <button type="submit" className="btn-Submit">
            {/* {loading ? 'Loading...' : 'Sign In'} */}Sign In
          </button>
          {/* {error && <p>{error}</p>} */}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
