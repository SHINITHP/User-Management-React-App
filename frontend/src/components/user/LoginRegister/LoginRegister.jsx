import React, { useState } from "react";
import "./LoginRegister.css";
import logo from "../../../assets/trend-era-logo2.png";

const LoginRegister = () => {
  const [signState, setSignState] = useState("Sign Up");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();

  return (
    <div className="loginRegister">

      <div className="left_Container">

        <img src={logo} alt="" />
        <h1 className="left-greating">Welcome to Trend-Era!</h1>
        <p>SHAPING THE ERA OF MODERN LIVING</p>

      </div>

      <div className="right_Container">

        <h1>{signState === "Sign In" ? "Sign In" : "Create an account"}</h1>
        <form className={signState === "Sign In" ? "login_form" : "register_form"}
        >
          {signState === "Sign Up" ? (
            <>
              <div className="input_wrapper">
                <i className="fas fa-user input-icon"></i>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="form_inputs"
                  placeholder="Enter your Username"
                  required
                  type="text"
                />
              </div>

              <div className="input_wrapper">
                <i className="fas fa-phone input-icon"></i>
                <input
                  onChange={(e) => setNumber(e.target.value)}
                  className="form_inputs"
                  placeholder="Enter your Phone Number"
                  required
                  type="tel"
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="input_wrapper">
            <i className="fas fa-envelope input-icon"></i>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="form_inputs"
              placeholder="Enter your Email"
              required
              type="email"
            />
          </div>

          <div className="input_wrapper">
            <i className="fas fa-lock lock"></i>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="form_inputs"
              placeholder="Enter your Password"
              required
              type="password"
            />
            <label className="toggle-password">
              <input type="checkbox" />
              Show Password
            </label>
          </div>
          <button type="submit" className="btn-Submit">
            {signState === "Sign In" ? "Sign In" : "Create an Account"}
          </button>
        </form>
        <div className="login-prompt">
          {signState === "Sign Up" ? (
            <p>
              Already have an account?
              <span
                className="login-text"
                onClick={() => setSignState("Sign In")}
              >
                Sign In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account yet?
              <span
                className="login-text"
                onClick={() => setSignState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
