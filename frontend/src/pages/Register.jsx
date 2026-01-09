import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    securityQuestion: "What is your mother's maiden name?",
    securityAnswer: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    
    try {
      console.log("📤 Sending signup request to http://localhost:5000/api/auth/signup");
      console.log("📋 Data:", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        userType: userType,
        location: formData.location,
      });

      // Send signup request to backend
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          userType: userType,
          location: formData.location,
        }),
      });

      console.log("📬 Response status:", response.status);
      const data = await response.json();
      console.log("📬 Response data:", data);

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        // Redirect to login page
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert(`Error during registration: ${error.message}`);
    }
  };

  return (
    <div className="register-root">
      {/* Header - Same as Login */}
      <header className="topbar">
        <div className="container header-inner">
          <div className="brand">
            <div className="logo">EE</div>
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
        <h2 className="page-title">Create Account</h2>
        <p className="page-sub">Join thousands using EventEase</p>

        <div className="register-card">
          <form onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div className="form-section">
              <h3>I am a:</h3>
              <div className="user-type-selector">
                <div className="user-type-options">
                  <button
                    type="button"
                    className={`user-type-btn ${userType === "customer" ? "active" : ""}`}
                    onClick={() => setUserType("customer")}
                  >
                    <div className="user-icon">👤</div>
                    <span>Customer</span>
                    <small>Book venues & artists</small>
                  </button>
                  
                  <button
                    type="button"
                    className={`user-type-btn ${userType === "provider" ? "active" : ""}`}
                    onClick={() => setUserType("provider")}
                  >
                    <div className="user-icon">🏢</div>
                    <span>Service Provider</span>
                    <small>List venues or artists</small>
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="form-section">
              <h3>Personal Details</h3>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location (City) *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="input"
                  required
                />
                <small className="helper-text">
                  {userType === "customer" 
                    ? "We'll show events near you" 
                    : "We'll show your services to customers in this area"}
                </small>
              </div>
            </div>

            {/* Password Section */}
            <div className="form-section">
              <h3>Security Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="input"
                    required
                  />
                  <div className="password-hint">
                    <span className={`hint-item ${formData.password.length >= 6 ? 'valid' : ''}`}>
                      ✓ At least 6 characters
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="input"
                    required
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <span className="error-text">Passwords don't match</span>
                  )}
                </div>
              </div>

              {/* Security Question - For Forgot Password */}
              <div className="form-group">
                <label>Security Question *</label>
                <select
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  {securityQuestions.map((question, index) => (
                    <option key={index} value={question}>{question}</option>
                  ))}
                </select>
                <small className="helper-text">
                  We'll ask this if you forget your password
                </small>
              </div>

              <div className="form-group">
                <label>Security Answer *</label>
                <input
                  type="text"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  placeholder="Enter your answer"
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="terms-check">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  I agree to the <Link to="/terms" className="link">Terms of Service</Link> and <Link to="/privacy" className="link">Privacy Policy</Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="register-btn">
              Create Account
            </button>

            {/* Login Link */}
            <p className="login-link">
              Already have an account? <Link to="/login" className="link">Log in</Link>
            </p>
          </form>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="auth-footer">
        <div className="container">
          <p>© 2025 EventEase. Making events easy for everyone.</p>
        </div>
      </footer>
    </div>
  );
} 