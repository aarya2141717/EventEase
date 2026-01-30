import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    securityQuestion: "What is your mother's maiden name?",
    securityAnswer: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setError("");

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          securityQuestion: formData.securityQuestion,
          securityAnswer: formData.securityAnswer,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset successful! Please login with your new password.");
        navigate("/login");
      } else {
        setError(data.message || "Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-root">
      <Navbar />

      <main className="page">
        <h2 className="page-title">Forgot Password</h2>
        <p className="page-sub">Verify your identity to reset password</p>

        <div className="forgot-card">
          <form onSubmit={handleSubmit}>
            <h3>Account Verification</h3>

            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px', padding: '10px', background: '#fee', borderRadius: '4px'}}>{error}</div>}

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

            <button type="submit" className="reset-btn" disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
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