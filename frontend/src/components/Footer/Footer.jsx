import React from 'react'
import { Link } from 'react-router-dom'
import "../Footer/Footer.css"
function Footer() {
  return (
<>
            <footer className="footer">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>EventEase</h3>
                  <p>EventEase is your ultimate platform for booking events, venues, and artists effortlessly. We bring together the best venues and performers under one roof, making event planning seamless and enjoyable. Whether it's a corporate party, wedding, or music festival, we've got you covered.</p>
                </div>
                <div className="footer-section">
                  <h3>Services</h3>
                  <ul>
                    <li><Link to="/venue">Venue</Link></li>
                    <li><Link to="/artists">Artists</Link></li>
                    <li><a href="#">Videography</a></li>
                    <li><a href="#">Wedding Plans</a></li>
                    <li><a href="#">Entertainment</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h3>Quick Lines</h3>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/venue">Venue</Link></li>
                    <li><Link to="/artists">Artists</Link></li>
                    <li><Link to="/eventspace">EventSpace</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    
                  </ul>
                </div>
                <div className="footer-section">
                  <h3>Contact us</h3>
                  <p>Kathmandu, Nepal<br />+977 9823812398<br />info@eventease.com</p>
                </div>
              </div>
            </footer>
</>


  )
}

export default Footer