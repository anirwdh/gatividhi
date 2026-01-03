import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import uh1 from '../../assets/images/uh1.jpg';
import uh2 from '../../assets/images/uh2.jpg';
import uh3 from '../../assets/images/uh3.jpg';
import Like from '../../assets/icons/Like';
import './UserAllActivitiesScreen.css';

const UserAllActivitiesScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationState = location.state || {};
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdultsDropdown, setShowAdultsDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [startDate, setStartDate] = useState(navigationState.startDate || '');
  const [endDate, setEndDate] = useState(navigationState.endDate || '');
  const [searchQuery, setSearchQuery] = useState(navigationState.searchQuery || '');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [sortBy, setSortBy] = useState('Featured');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Tour cards data - expanded for pagination demo
  const tourCards = [
    { id: 1, title: "Vatican Museums, Sistine Chapel & St Peter's Basilica Guided Tour", location: "Rome, Italy", rating: 4.5, reviews: 38926, price: 3785, duration: "3 hours", image: uh1, bestSeller: true, freeCancellation: true },
    { id: 2, title: "Colosseum Arena Floor, Roman Forum and Palatine Hill Guided Tour", location: "Rome, Italy", rating: 4.4, reviews: 7270, price: 6921, duration: "2 hours 30 minutes", image: uh2, freeCancellation: true },
    { id: 3, title: "Skip-the-Line Group Tour of the Vatican, Sistine Chapel & St. Peter's Basilica", location: "Rome, Italy", rating: 4.6, reviews: 12498, price: 5299, duration: "3 hours", image: uh3, freeCancellation: true },
    { id: 4, title: "Vatican Museums, Sistine Chapel & St. Peters Basilica Guided Tour", location: "Rome, Italy", rating: 4.5, reviews: 182, price: 11353, duration: "3 hours", image: uh1, freeCancellation: true },
    { id: 5, title: "Rome: Colosseum, Roman Forum, and Palatine Hill Guided Tour", location: "Rome, Italy", rating: 4.5, reviews: 8781, price: 4521, duration: "2 hours 30 minutes", image: uh2, likelyToSellOut: true, freeCancellation: true },
    { id: 6, title: "Vatican Museums and Sistine Chapel Skip-the-Line Tickets", location: "Rome, Italy", rating: 4.3, reviews: 75, price: 3899, duration: "2 hours", image: uh3, likelyToSellOut: true, freeCancellation: true },
    { id: 7, title: "Colosseum Underground & Ancient Rome", location: "Rome, Italy", rating: 4.7, reviews: 3456, price: 7899, duration: "3 hours", image: uh1, likelyToSellOut: true, freeCancellation: true },
    { id: 8, title: "Rome by Golf Cart Private Tour: Beyond the Landmarks", location: "Rome, Italy", rating: 5.0, reviews: 4312, price: 12499, duration: "4 hours", image: uh2, freeCancellation: true },
    { id: 9, title: "Trevi Fountain, Pantheon & Spanish Steps Walking Tour", location: "Rome, Italy", rating: 4.6, reviews: 5678, price: 2499, duration: "2 hours", image: uh3, freeCancellation: true },
    { id: 10, title: "Rome Food Tour: Trastevere Neighborhood", location: "Rome, Italy", rating: 4.8, reviews: 2341, price: 3299, duration: "3 hours 30 minutes", image: uh1, freeCancellation: true },
    { id: 11, title: "Vatican Early Access Tour with Sistine Chapel", location: "Rome, Italy", rating: 4.7, reviews: 8923, price: 6899, duration: "3 hours", image: uh2, bestSeller: true, freeCancellation: true },
    { id: 12, title: "Rome Catacombs and Appian Way Tour", location: "Rome, Italy", rating: 4.5, reviews: 1234, price: 4599, duration: "3 hours", image: uh3, freeCancellation: true },
    { id: 13, title: "Rome Night Tour: Colosseum and Ancient City", location: "Rome, Italy", rating: 4.6, reviews: 3456, price: 5499, duration: "2 hours 30 minutes", image: uh1, freeCancellation: true },
    { id: 14, title: "Pompeii Day Trip from Rome with Mount Vesuvius", location: "Rome, Italy", rating: 4.8, reviews: 5678, price: 8999, duration: "12 hours", image: uh2, bestSeller: true, freeCancellation: true },
    { id: 15, title: "Tivoli Gardens and Villa d'Este Day Trip", location: "Rome, Italy", rating: 4.4, reviews: 2345, price: 6799, duration: "6 hours", image: uh3, freeCancellation: true },
    { id: 16, title: "Rome Segway Tour: Ancient City Highlights", location: "Rome, Italy", rating: 4.7, reviews: 4567, price: 4299, duration: "3 hours", image: uh1, freeCancellation: true },
    { id: 17, title: "Ostia Antica Archaeological Site Tour", location: "Rome, Italy", rating: 4.5, reviews: 1234, price: 3499, duration: "4 hours", image: uh2, freeCancellation: true },
    { id: 18, title: "Rome Cooking Class: Pasta and Tiramisu Making", location: "Rome, Italy", rating: 4.9, reviews: 7890, price: 5999, duration: "4 hours", image: uh3, bestSeller: true, freeCancellation: true },
    { id: 19, title: "Rome Bike Tour: Appian Way and Catacombs", location: "Rome, Italy", rating: 4.6, reviews: 3456, price: 4799, duration: "4 hours", image: uh1, freeCancellation: true },
    { id: 20, title: "Vatican Gardens Tour with Skip-the-Line Access", location: "Rome, Italy", rating: 4.7, reviews: 2345, price: 6499, duration: "2 hours", image: uh2, freeCancellation: true },
    { id: 21, title: "Rome Sunset Walking Tour with Aperitivo", location: "Rome, Italy", rating: 4.8, reviews: 5678, price: 3799, duration: "3 hours", image: uh3, freeCancellation: true },
    { id: 22, title: "Roman Gladiator School Experience", location: "Rome, Italy", rating: 4.5, reviews: 1234, price: 5299, duration: "2 hours", image: uh1, freeCancellation: true },
    { id: 23, title: "Rome Photography Tour: Best Instagram Spots", location: "Rome, Italy", rating: 4.6, reviews: 3456, price: 4499, duration: "3 hours", image: uh2, freeCancellation: true },
    { id: 24, title: "Rome Wine Tasting Tour in Trastevere", location: "Rome, Italy", rating: 4.7, reviews: 4567, price: 5999, duration: "3 hours", image: uh3, freeCancellation: true },
    { id: 25, title: "Rome Helicopter Tour: Aerial City Views", location: "Rome, Italy", rating: 5.0, reviews: 234, price: 24999, duration: "30 minutes", image: uh1, freeCancellation: true },
    { id: 26, title: "Rome Street Art and Graffiti Tour", location: "Rome, Italy", rating: 4.4, reviews: 1234, price: 2999, duration: "2 hours", image: uh2, freeCancellation: true },
    { id: 27, title: "Rome Jewish Ghetto and Synagogue Tour", location: "Rome, Italy", rating: 4.6, reviews: 2345, price: 3999, duration: "2 hours 30 minutes", image: uh3, freeCancellation: true },
    { id: 28, title: "Rome Ghost Tour: Haunted Places and Legends", location: "Rome, Italy", rating: 4.5, reviews: 3456, price: 3499, duration: "2 hours", image: uh1, freeCancellation: true },
    { id: 29, title: "Rome Vespa Tour: Classic City Experience", location: "Rome, Italy", rating: 4.8, reviews: 5678, price: 7999, duration: "3 hours", image: uh2, bestSeller: true, freeCancellation: true },
    { id: 30, title: "Rome Art Gallery and Museum Tour", location: "Rome, Italy", rating: 4.7, reviews: 4567, price: 5499, duration: "4 hours", image: uh3, freeCancellation: true },
    { id: 31, title: "Rome River Cruise: Tiber River Experience", location: "Rome, Italy", rating: 4.5, reviews: 2345, price: 4299, duration: "1 hour 30 minutes", image: uh1, freeCancellation: true },
    { id: 32, title: "Rome Shopping Tour: Designer Outlets", location: "Rome, Italy", rating: 4.4, reviews: 1234, price: 3499, duration: "4 hours", image: uh2, freeCancellation: true },
    { id: 33, title: "Rome Architecture Tour: Modern and Ancient", location: "Rome, Italy", rating: 4.6, reviews: 3456, price: 4799, duration: "3 hours", image: uh3, freeCancellation: true },
    { id: 34, title: "Rome Family Tour: Kid-Friendly Activities", location: "Rome, Italy", rating: 4.8, reviews: 5678, price: 5999, duration: "4 hours", image: uh1, freeCancellation: true },
    { id: 35, title: "Rome Opera and Classical Music Tour", location: "Rome, Italy", rating: 4.7, reviews: 2345, price: 6999, duration: "3 hours", image: uh2, freeCancellation: true },
    { id: 36, title: "Rome Day Trip: Florence by High-Speed Train", location: "Rome, Italy", rating: 4.9, reviews: 7890, price: 12999, duration: "12 hours", image: uh3, bestSeller: true, freeCancellation: true },
  ];

  const filterTags = [
    "Walking Tours",
    "Half-day Tours",
    "Skip the line Tickets",
    "Museum Tickets & Passes",
    "Private and Luxury",
    "Bus Tours",
    "Food & Drink",
    "Day Trips",
    "Multi-day Tours",
    "Cultural Tours"
  ];

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDatePicker && !e.target.closest('.date-btn') && !e.target.closest('.date-picker-dropdown')) {
        setShowDatePicker(false);
      }
      if (showAdultsDropdown && !e.target.closest('.adults-btn') && !e.target.closest('.adults-dropdown')) {
        setShowAdultsDropdown(false);
      }
    };

    if (showDatePicker || showAdultsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDatePicker, showAdultsDropdown]);

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDateString = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const isPastDate = (dateString) => {
    const date = parseDateString(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!date) return false;
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateInRange = (dateString, start, end) => {
    if (!start || !end) return false;
    const date = parseDateString(dateString);
    const startDate = parseDateString(start);
    const endDate = parseDateString(end);
    if (!date || !startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const handleDateClick = (day) => {
    const dateString = formatDateToString(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    
    if (isPastDate(dateString)) return;

    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(dateString);
      setTempEndDate('');
    } else if (tempStartDate && !tempEndDate) {
      const start = parseDateString(tempStartDate);
      const clicked = parseDateString(dateString);
      if (clicked < start) {
        setTempStartDate(dateString);
        setTempEndDate(tempStartDate);
      } else {
        setTempEndDate(dateString);
      }
    }
  };

  const handleApplyDates = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setShowDatePicker(false);
  };

  const handleResetDates = () => {
    setTempStartDate('');
    setTempEndDate('');
    setStartDate('');
    setEndDate('');
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const today = new Date();
    const todayString = formatDateToString(today);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateToString(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
      const isPast = isPastDate(dateString);
      const isStart = dateString === tempStartDate;
      const isEnd = dateString === tempEndDate;
      const isInRange = isDateInRange(dateString, tempStartDate, tempEndDate);
      const isToday = dateString === todayString;

      let className = 'calendar-day';
      if (isPast) className += ' past-date';
      if (isStart) className += ' start-date';
      if (isEnd) className += ' end-date';
      if (isInRange && !isStart && !isEnd) className += ' in-range';
      if (isToday) className += ' today';

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => !isPast && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const formatDisplayDate = (start, end) => {
    if (!start && !end) return 'Select Dates';
    if (start && !end) {
      const date = new Date(start);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    return 'Select Dates';
  };

  const toggleFilter = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Calculate pagination
  const totalPages = Math.ceil(tourCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageCards = tourCards.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of content when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, current page, and pages around current
      if (currentPage <= 4) {
        // Show first 5 pages, ellipsis, last page
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page, ellipsis, last 5 pages
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="all-activities-screen">
      <UserHeader />
      
      <div className="activities-content">
        {/* Breadcrumbs */}
      

        {/* Page Title */}
        <h1 className="page-title">
          {navigationState.destination 
            ? `All ${navigationState.destination} Tours & Excursions in 2026`
            : navigationState.searchQuery
            ? `All ${navigationState.searchQuery.charAt(0).toUpperCase() + navigationState.searchQuery.slice(1)} Tours & Excursions in 2026`
            : 'All Rome Tours & Excursions in 2026'}
        </h1>

        {/* Filter Bar Container */}
        <div className="filter-bar-container">
          <div className="filter-bar">
            <button 
              className="filter-btn date-btn"
              onClick={() => {
                const willShow = !showDatePicker;
                setShowDatePicker(willShow);
                setShowFilters(false);
                setShowAdultsDropdown(false);
                if (willShow) {
                  setTempStartDate(startDate);
                  setTempEndDate(endDate);
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {formatDisplayDate(startDate, endDate)}
            </button>

            <button 
              className="filter-btn adults-btn"
              onClick={() => {
                setShowAdultsDropdown(!showAdultsDropdown);
                setShowDatePicker(false);
                setShowFilters(false);
              }}
            >
              {adults} {adults === 1 ? 'Adult' : 'Adults'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <button 
              className="filter-btn filters-btn"
              onClick={() => {
                setShowFilters(!showFilters);
                setShowDatePicker(false);
                setShowAdultsDropdown(false);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
            </button>

            {/* Filter Tags */}
            <div className="filter-tags-container">
              <div className="filter-tags">
                {filterTags.map((tag) => (
                  <button
                    key={tag}
                    className={`filter-tag ${selectedFilters.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Date Picker Dropdown */}
          {showDatePicker && (
            <div className="date-picker-dropdown">
              <div className="custom-calendar">
                <div className="calendar-header">
                  <button 
                    type="button" 
                    className="calendar-nav-btn" 
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <h3 className="calendar-month-year">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button 
                    type="button" 
                    className="calendar-nav-btn" 
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>
                <div className="calendar-weekdays">
                  <div className="calendar-weekday">Sun</div>
                  <div className="calendar-weekday">Mon</div>
                  <div className="calendar-weekday">Tue</div>
                  <div className="calendar-weekday">Wed</div>
                  <div className="calendar-weekday">Thu</div>
                  <div className="calendar-weekday">Fri</div>
                  <div className="calendar-weekday">Sat</div>
                </div>
                <div className="calendar-days">
                  {renderCalendar()}
                </div>
                <div className="calendar-actions">
                  <button 
                    type="button" 
                    className="calendar-reset-btn"
                    onClick={handleResetDates}
                  >
                    Reset
                  </button>
                  <button 
                    type="button" 
                    className="calendar-apply-btn"
                    onClick={handleApplyDates}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Adults Dropdown */}
          {showAdultsDropdown && (
            <div className="adults-dropdown">
              <div className="adults-selector">
                <label>Adults</label>
                <div className="adults-controls">
                  <button 
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults === 1}
                  >
                    −
                  </button>
                  <span>{adults}</span>
                  <button onClick={() => setAdults(adults + 1)}>+</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results and Sort */}
        <div className="results-header">
          <div className="results-count">
            {tourCards.length}+ results
          </div>
          <div className="sort-dropdown">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1); // Reset to first page when sort changes
            }}>
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Duration</option>
            </select>
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="tour-cards-grid">
          {currentPageCards.map((card) => (
            <div 
              key={card.id} 
              className="activity-card"
              onClick={() => navigate(`/activity/${card.id}`, { state: { activityData: card } })}
              style={{ cursor: 'pointer' }}
            >
              <div className="activity-card-image-wrapper">
                <div 
                  className="activity-card-image"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  {card.bestSeller && (
                    <span className="card-badge best-seller">Best Seller</span>
                  )}
                  {card.likelyToSellOut && (
                    <span className="card-badge likely-sellout">Likely to Sell Out</span>
                  )}
                  <button 
                    className="heart-icon" 
                    aria-label="Save"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle wishlist toggle
                    }}
                  >
                    <Like />
                  </button>
                </div>
              </div>
              <div className="activity-card-content">
                <div className="card-rating">
                  <span className="rating-star">★</span>
                  <span className="rating-value">{card.rating}</span>
                  <span className="rating-reviews">({card.reviews.toLocaleString()})</span>
                </div>
                <h3 className="card-title">{card.title}</h3>
                <div className="card-details">
                  {card.freeCancellation && (
                    <span className="detail-badge">Free Cancellation</span>
                  )}
                  <span className="card-duration">{card.duration}</span>
                </div>
                <div className="card-price">
                  <span className="price-text">from ₹{card.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              <button
                className="pagination-btn prev-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>

              <div className="pagination-numbers">
                {getPageNumbers().map((page, index) => {
                  if (page === 'ellipsis') {
                    return (
                      <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn next-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <UserFooter />
    </div>
  );
};

export default UserAllActivitiesScreen;

