import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    securityQuestion: "What is your mother's maiden name?",
    securityAnswer: "",
    newPassword: "",
    confirmPassword: ""
  });

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What city were you born in?",
    "What is your favorite book?",
    "What was your childhood nickname?",
    "What is the name of your elementary school?"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Forgot Password Data:", formData);
    alert("Password reset successful! Please login.");

    // Later: API call + redirect to login
  };

  return (
    <div className="forgot-root">
      {/* Header (same as Login/Register) */}
      <header className="topbar">
        <div className="container header-inner">
          <div className="brand">
            <img src="/images/logo.png" alt="EventEase" className="logo" />
            <div className="brand-text">
              <span className="brand-title">EventEase</span>
              <small className="brand-tag">Book venue & artists - fast</small>
            </div>
          </div>

          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/venues">Venues</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button className="cta">Book now</button>
            <Link to="/login">
              <button className="login-outline">Log In</button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="page">
        <h2 className="page-title">Forgot Password</h2>
        <p className="page-sub">Verify your identity to reset password</p>

        <div className="forgot-card">
          <form onSubmit={handleSubmit}>
            <h3>Account Verification</h3>

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your registered email"
              className="input"
              required
            />

            <label>Security Question</label>
            <select
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleChange}
              className="input"
              required
            >
              {securityQuestions.map((q, index) => (
                <option key={index} value={q}>{q}</option>
              ))}
            </select>

            <label>Security Answer</label>
            <input
              type="text"
              name="securityAnswer"
              value={formData.securityAnswer}
              onChange={handleChange}
              placeholder="Enter your answer"
              className="input"
              required
            />

            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Create new password"
              className="input"
              required
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="input"
              required
            />

            <button type="submit" className="reset-btn">
              Reset Password
            </button>

            <p className="back-login">
              Remember your password? <Link to="/login" className="link">Log in</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}