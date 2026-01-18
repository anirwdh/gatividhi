import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './SubadminHeader.css';

const SubadminHeader = ({ activeTab, setActiveTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleTabClick = (tab, path) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    navigate(path);
    setShowMobileMenu(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowUserMenu(false); // Close user menu when opening mobile menu
  };

  const handleUserMenuClick = (e) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
    setShowMobileMenu(false); // Close mobile menu when opening user menu
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

        {/* Center - Navigation Links (Desktop) */}
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
        </nav>

        {/* Right side - Actions */}
        <div className="subadmin-header-right">
          {/* User Menu */}
          <div className="subadmin-user-menu">
            <button 
              className="subadmin-profile-btn" 
              title="Account"
              onClick={handleUserMenuClick}
            >
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

          {/* Mobile Menu Toggle */}
          <button 
            className="subadmin-menu-btn" 
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`subadmin-mobile-menu ${showMobileMenu ? 'open' : ''}`}>
        <div className="subadmin-mobile-menu-header">
          <div className="subadmin-mobile-menu-logo">
            <img src={logo} alt="Gatividhi" className="subadmin-logo-image" />
          </div>
          <button 
            className="subadmin-mobile-menu-close"
            onClick={() => setShowMobileMenu(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <nav className="subadmin-mobile-nav">
          <button
            onClick={() => handleTabClick('create', '/subadmin/home')}
            className={`subadmin-mobile-nav-link ${(activeTab === 'create' || location.pathname === '/subadmin/home' || location.pathname === '/subadmin') ? 'active' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Create New
          </button>
          <button
            onClick={() => handleTabClick('listings', '/subadmin/listings')}
            className={`subadmin-mobile-nav-link ${(activeTab === 'listings' || location.pathname === '/subadmin/listings' || location.pathname === '/subadmin/calendar' || location.pathname === '/subadmin/listing-detail') ? 'active' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Listings
          </button>
          <Link 
            to="/subadmin/bookings" 
            className={`subadmin-mobile-nav-link ${location.pathname === '/subadmin/bookings' ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Bookings
          </Link>
        </nav>

        <div className="subadmin-mobile-menu-footer">
          <div className="subadmin-mobile-user-section">
            <div className="subadmin-profile-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="subadmin-mobile-user-info">
              <span className="subadmin-mobile-user-name">Admin User</span>
              <span className="subadmin-mobile-user-role">Subadmin</span>
            </div>
          </div>
          
          <div className="subadmin-mobile-menu-actions">
            <Link to="/subadmin/profile" className="subadmin-mobile-action-btn" onClick={() => setShowMobileMenu(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              My Profile
            </Link>
            <Link to="/subadmin/settings" className="subadmin-mobile-action-btn" onClick={() => setShowMobileMenu(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
              </svg>
              Settings
            </Link>
            <Link to="/" className="subadmin-mobile-action-btn logout" onClick={() => setShowMobileMenu(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div 
          className="subadmin-mobile-menu-overlay"
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </header>
  );
};

export default SubadminHeader;

