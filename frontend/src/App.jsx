import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegister from "./components/user/LoginRegister/LoginRegister.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
