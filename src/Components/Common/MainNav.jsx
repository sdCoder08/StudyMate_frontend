import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import './MainNav.css'; 

const MainNav = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="Main-navbar">
      <div className="Main-navbar-logo">
        <span><Link to="/">StudyMate</Link></span>
      </div>
      <div className="Main-navbar-links-container">
        <ul className="Main-Navbar-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/editor">Editor</Link></li>
            <li><Link to="/documents">Documents</Link></li>
        </ul>
      </div>
      <div className="Main-navbar-profile" onClick={handleProfileClick}>
        {/* <div className="profile-text">Profile</div> */}
        <div className="profile-icon">
          <FaUser/>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
