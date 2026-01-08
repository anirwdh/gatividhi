import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './SubadminHeader.css';

const SubadminHeader = ({ activeTab, setActiveTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleTabClick = (tab, path) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    navigate(path);
  };

  return (
    <header className="subadmin-header">
      <div className="subadmin-header-container">
        {/* Left side - Logo */}
        <div className="subadmin-header-left">
          <Link to="/subadmin/home" className="subadmin-header-logo">
            <img src={logo} alt="Gatividhi" className="subadmin-logo-image" />
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <nav className="subadmin-header-nav">
          <button
            onClick={() => handleTabClick('create', '/subadmin/home')}
            className={`subadmin-nav-link ${(activeTab === 'create' || location.pathname === '/subadmin/home' || location.pathname === '/subadmin') ? 'active' : ''}`}
          >
            Create New
          </button>
          <button
            onClick={() => handleTabClick('listings', '/subadmin/listings')}
            className={`subadmin-nav-link ${(activeTab === 'listings' || location.pathname === '/subadmin/listings' || location.pathname === '/subadmin/calendar' || location.pathname === '/subadmin/listing-detail') ? 'active' : ''}`}
          >
            Listings
          </button>
          <Link 
            to="/subadmin/bookings" 
            className={`subadmin-nav-link ${location.pathname === '/subadmin/bookings' ? 'active' : ''}`}
          >
            Bookings
          </Link>
          <Link 
            to="/subadmin/messages" 
            className={`subadmin-nav-link ${location.pathname === '/subadmin/messages' ? 'active' : ''}`}
          >
            Quries
          </Link>
        </nav>

        {/* Right side - Actions */}
        <div className="subadmin-header-right">
          
          
          <div 
            className="subadmin-user-menu"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <button className="subadmin-profile-btn" title="Account">
              <div className="subadmin-profile-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </button>
            {showUserMenu && (
              <div className="subadmin-dropdown-menu">
                <Link to="/subadmin/profile">My Profile</Link>
                <Link to="/subadmin/settings">Settings</Link>
                <hr />
                <Link to="/">Logout</Link>
              </div>
            )}
          </div>

          <button className="subadmin-menu-btn" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default SubadminHeader;

