import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
 
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userId");
  const isAuthenticated = token && user;

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace/>
};

export default PrivateRoute;
