import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import DropDown from '../../assets/icons/DropDown';
import './UserHeader.css';

const UserHeader = () => {
  const [showDiscoverMenu, setShowDiscoverMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="user-header">
      <div className="user-header-container">
        {/* Left side - Logo and Navigation */}
        <div className="user-header-left">
          <a href="/" className="user-header-logo">
            <img src={logo} alt="Gatividhi" className="logo-image" />
           
          </a>
          
          <nav className="user-header-nav">
            <div 
              className="nav-item discover-menu"
              onMouseEnter={() => setShowDiscoverMenu(true)}
              onMouseLeave={() => setShowDiscoverMenu(false)}
            >
              <button className="nav-link">
                Discover
                <DropDown className="dropdown-arrow" />
              </button>
              {showDiscoverMenu && (
                <div className="dropdown-menu">
                  <a href="/tours">Tours & Activities</a>
                  <a href="/attractions">Attractions</a>
                  <a href="/experiences">Experiences</a>
                  <a href="/day-trips">Day Trips</a>
                </div>
              )}
            </div>
            
          </nav>
        </div>

        {/* Right side - Actions */}
        <div className="user-header-right">
          
          
          

          <div 
            className="user-menu"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <button className="header-icon-btn user-profile-btn" title="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <DropDown className="dropdown-arrow" />
            </button>
            {showUserMenu && (
              <div className="dropdown-menu user-dropdown">
                <a href="/profile">My Profile</a>
                <a href="/bookings">My Bookings</a>
                <a href="/settings">Settings</a>
                <hr />
                <a href="/logout">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
