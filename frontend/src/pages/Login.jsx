import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";


export default function Login() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="login-root">
      <header className="topbar">
        <div className="container header-inner">
          <div className="brand">
            <Link to="/">
              <img src="/images/logo.png" alt="EventEase" className="logo" />
            </Link>
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
            <button className="login-outline">Log In</button>
          </nav>
        </div>
      </header>

      <main className="page">
        <h2 className="page-title">Log In</h2>
        <p className="page-sub">Sign in to your account</p>

        <div className="login-card">
          <h3>Welcome Back</h3>

          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" className="input" />

          <label>Password</label>
          <div className="pw-row">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              className="input"
            />

            <img
              src={showPw ? "/images/visibilityon.png" : "/images/visibilityoff.png"}
              alt="toggle"
              className="eye-icon"
              onClick={() => setShowPw(!showPw)}
            />
          </div>

          <p className="forgot">
            <Link to="/forgot-password" className="link">Forgot password?</Link>
          </p>

          <button className="login-btn">Log In</button>

          <p className="signup">
            Don't have an account? <Link to="/register" className="link">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}