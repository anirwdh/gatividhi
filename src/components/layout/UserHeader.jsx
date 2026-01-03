import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import DropDown from '../../assets/icons/DropDown';
import './UserHeader.css';

const UserHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDiscoverMenu, setShowDiscoverMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearchModal, setShowMobileSearchModal] = useState(false);
  
  // Hide search on home page
  const isHomePage = location.pathname === '/';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/activities', { state: { searchQuery: searchQuery.trim() } });
      setSearchQuery('');
      setShowMobileSearchModal(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMobileSearchClick = () => {
    setShowMobileSearchModal(true);
  };

  const handleCloseMobileSearch = () => {
    setShowMobileSearchModal(false);
    setSearchQuery('');
  };


  return (
    <>
      <header className="user-header">
      <div className="user-header-container">
        {/* Left side - Logo and Navigation */}
        <div className="user-header-left">
          <a href="/" className="user-header-logo">
            <img src={logo} alt="Gatividhi" className="logo-image" />
           
          </a>

          {/* Mobile Search Icon - shown only on mobile, after logo */}
          {!isHomePage && (
            <button 
              className="mobile-search-icon-btn"
              onClick={handleMobileSearchClick}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          )}
          
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

        {/* Center - Search Field (hidden on home page) */}
        {!isHomePage && (
          <>
            {/* Desktop Search */}
            <div className="user-header-search">
              <form onSubmit={handleSearch} className="header-search-form">
                <div className="header-search-wrapper">
                  <svg className="header-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input
                    type="text"
                    className="header-search-input"
                    placeholder="Search destinations, activities..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                </div>
              </form>
            </div>
          </>
        )}

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

      {/* Mobile Search Modal - rendered via portal to body */}
      {showMobileSearchModal && typeof document !== 'undefined' && createPortal(
        <div className="mobile-search-modal-overlay" onClick={handleCloseMobileSearch}>
          <div className="mobile-search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-search-modal-header">
              <h2>Search</h2>
              <button 
                className="mobile-search-close-btn"
                onClick={handleCloseMobileSearch}
                aria-label="Close search"
              >
                ×
              </button>
            </div>
            <div className="mobile-search-modal-content">
              <form onSubmit={handleSearch} className="mobile-search-form">
                <div className="mobile-search-wrapper">
                  <svg className="mobile-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input
                    type="text"
                    className="mobile-search-input"
                    placeholder="Search destinations, activities..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    autoFocus
                  />
                </div>
                <button type="submit" className="mobile-search-submit-btn">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default UserHeader;
