import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/user/Login/Login.jsx";
import Register from "./components/user/Register/Register.jsx";
import { Provider, useSelector } from "react-redux";
import store from "./Redux/store.js";
import PrivateRoute from "./components/user/PrivateRoute.jsx";
import Home from "./components/user/Home/Home.jsx";
import UserProfile from "./components/user/UserProfile/UserProfile.jsx";
import AdminPage from "./components/admin/AdminPage/AdminPage.jsx";
import AdminRoutes from "./components/admin/AdminRoutes.jsx";
import AdminLogin from "./components/admin/Login/AdminLogin.jsx";

const AppContent = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isadminAuthenticated = useSelector((state) => state.admin.isAuthenticated);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login"element={!isAuthenticated ? <Login /> : <Navigate to="/" />}/>
        <Route path="/register"element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />


        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        <Route path="/admin/login"  element={!isadminAuthenticated ? <AdminLogin /> : <Navigate to={'/admin/Dashboard'} /> }/>
        <Route path="" element={<AdminRoutes />}>
          <Route path="/admin/Dashboard"  element={<AdminPage /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
