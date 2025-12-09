import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// Import ForgotPassword when you create it

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add when you create ForgotPassword */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
    </Router>
  );
}
