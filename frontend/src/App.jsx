import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VenueDetails from './pages/VenueDetails';
import ArtistDetails from './pages/ArtistDetails';
import Venue from './pages/Venue';
import Artists from './pages/Artists';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import UserDashboard from './pages/UserDashboard';
import Footer from "./components/Footer/Footer";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div style={{ padding: "100px 20px", textAlign: "center" }}>Loading...</div>;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Dashboard Route Component - redirects based on user type
const DashboardRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div style={{ padding: "100px 20px", textAlign: "center" }}>Loading...</div>;
  }
  
  // Redirect based on user type
  if (user?.userType === "admin") {
    return <AdminDashboard />;
  } else if (user?.userType === "vendor") {
    return <VendorDashboard />;
  } else {
    return <UserDashboard />;
  }
};

function AppRoutes() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/venue/:venueId" element={<VenueDetails />} />
        <Route path="/artist/:artistId" element={<ArtistDetails />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/artists" element={<Artists />} />
        
        {/* Dashboard Route - Protected and redirects based on user type */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardRoute />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect to home by default */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
