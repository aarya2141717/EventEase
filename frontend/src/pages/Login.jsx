import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔐 STORE JWT TOKEN + USER
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Store user in context
        login(data.user);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <Navbar />

      <main className="page">
        <h2 className="page-title">Log In</h2>
        <p className="page-sub">Sign in to your account</p>

        <div className="login-card">
          <h3>Welcome Back</h3>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input"
              required
            />

            <label>Password</label>
            <div className="pw-row">
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input"
                required
              />

              <img
                src={
                  showPw
                    ? "/images/visibilityon.png"
                    : "/images/visibilityoff.png"
                }
                alt="toggle"
                className="eye-icon"
                onClick={() => setShowPw(!showPw)}
              />
            </div>

            <p className="forgot">
              <Link to="/forgot-password" className="link">
                Forgot password?
              </Link>
            </p>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="signup">
              Don't have an account?{" "}
              <Link to="/register" className="link">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}