import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VenueDetails from './pages/VenueDetails';
import ArtistDetails from './pages/ArtistDetails';
import Venue from './pages/Venue';
import Artists from './pages/Artists';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/venue/:venueId" element={<VenueDetails />} />
        <Route path="/artist/:artistId" element={<ArtistDetails />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/venue/:venueId" element={<VenueDetails />} />
        <Route path="/artist/:artistId" element={<ArtistDetails />} />
      </Routes>
    </Router>
  );
}
