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
<<<<<<< HEAD
            <Link to="/">
              <img src="/images/logo.png" alt="EventEase" className="logo" />
            </Link>
=======
            <img src="/images/logo.png" alt="EventEase" className="logo" />
>>>>>>> origin/pranish
            <div className="brand-text">
              <span className="brand-title">EventEase</span>
              <small className="brand-tag">Book venue & artists - fast</small>
            </div>
          </div>

          <nav className="nav">
<<<<<<< HEAD
            <Link to="/">Home</Link>
            <Link to="/venues">Venues</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/dashboard">Dashboard</Link>
=======
            <a href="#">Home</a>
            <a href="#">Venues</a>
            <a href="#">Artists</a>
            <a href="#">Dashboard</a>
>>>>>>> origin/pranish
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
<<<<<<< HEAD
              src={showPw ? "/images/visibilityon.png" : "/images/visibilityoff.png"}
              alt="toggle"
              className="eye-icon"
              onClick={() => setShowPw(!showPw)}
            />
          </div>

          <p className="forgot">
            <Link to="/forgot-password" className="link">Forgot password?</Link>
          </p>
=======
  src={showPw ? "/images/visibilityon.png" : "/images/visibilityoff.png"}
  alt="toggle"
  className="eye-icon"
  onClick={() => setShowPw(!showPw)}
/>

          </div>

          <p className="forgot">
  <Link to="/forgot-password" className="link">Forgot password?</Link>
</p>
>>>>>>> origin/pranish

          <button className="login-btn">Log In</button>

          <p className="signup">
<<<<<<< HEAD
            Don't have an account? <Link to="/register" className="link">Sign up</Link>
          </p>
=======
  Don't have an account? <Link to="/register" className="link">Sign up</Link>
</p>
>>>>>>> origin/pranish
        </div>
      </main>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/pranish
