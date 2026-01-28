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
import ArtistBooking from './pages/ArtistBooking';
import VenueBooking from './pages/VenueBooking';
import AddArtist from './pages/AddArtist';
import AddVenue from './pages/AddVenue';
import Footer from "./components/Footer/Footer";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, loading, user } = useAuth();
  
  if (loading) {
    return <div style={{ padding: "100px 20px", textAlign: "center" }}>Loading...</div>;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Check role if required
  if (requiredRole && user?.userType !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Dashboard Route Component - redirects based on user type
const DashboardRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div style={{ padding: "100px 20px", textAlign: "center" }}>Loading...</div>;
  }
  
  // Debug: Log user data
  console.log("DashboardRoute - User data:", user);
  console.log("DashboardRoute - UserType:", user?.userType);
  
  // Redirect based on user type (case-insensitive check)
  const userType = user?.userType?.toLowerCase();
  if (userType === "admin") {
    return <AdminDashboard />;
  } else if (userType === "vendor") {
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
        <Route path="/artist-booking" element={<ArtistBooking />} />
        <Route path="/venue-booking" element={<VenueBooking />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/add-artist" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AddArtist />
            </ProtectedRoute>
          } 
        />
        
        {/* Vendor Routes */}
        <Route 
          path="/vendor/add-venue" 
          element={
            <ProtectedRoute requiredRole="vendor">
              <AddVenue />
            </ProtectedRoute>
          } 
        />
        
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