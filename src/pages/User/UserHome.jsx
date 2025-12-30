import { useState, useEffect } from 'react';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import uh1 from '../../assets/images/uh1.jpg';
import uh2 from '../../assets/images/uh2.jpg';
import uh3 from '../../assets/images/uh3.jpg';
import Like from '../../assets/icons/Like';
import './UserHome.css';

const UserHome = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const backgroundImages = [uh1, uh2, uh3];
  
  // Tour cards data - will come from backend later
  const tourCards = [
    { id: 1, title: "All Inclusive Day Trip to Taj Mahal, Agra Fort and Baby Taj from Delhi by Car", location: "New Delhi, India", rating: 4.9, reviews: 1084, price: 6875, originalPrice: 7236, image: uh1, specialOffer: true },
    { id: 2, title: "Old & New Delhi City Tour - Half or Full Day Options Available", location: "New Delhi, India", rating: 4.9, reviews: 4704, price: 3498, image: uh2 },
    { id: 3, title: "The Great Indian Food Tour: Old Delhi Food and Heritage Walk", location: "New Delhi, India", rating: 5.0, reviews: 1622, price: 3959, image: uh3 },
    { id: 4, title: "4 Day Golden Triangle with Ranthambore Tiger Safari Tour from Delhi", location: "New Delhi, India", rating: 4.9, reviews: 107, price: 25895, image: uh1 },
    { id: 5, title: "Sunrise Taj Mahal Tour from Delhi with Agra Fort", location: "New Delhi, India", rating: 4.8, reviews: 892, price: 5899, image: uh2 },
    { id: 6, title: "Delhi Street Food Tour: Old Delhi Food Walk", location: "New Delhi, India", rating: 5.0, reviews: 2341, price: 2499, image: uh3 },
    { id: 7, title: "Private Day Trip to Agra from Delhi with Taj Mahal", location: "New Delhi, India", rating: 4.9, reviews: 567, price: 7899, image: uh1 },
    { id: 8, title: "Delhi Heritage Walk: Red Fort and Jama Masjid Tour", location: "New Delhi, India", rating: 4.7, reviews: 1234, price: 1999, image: uh2 },
    { id: 9, title: "Delhi Shopping Tour: Markets and Bazaars", location: "New Delhi, India", rating: 4.6, reviews: 456, price: 1799, image: uh3 },
    { id: 10, title: "Delhi by Night: Evening Food and Culture Tour", location: "New Delhi, India", rating: 4.8, reviews: 789, price: 3299, image: uh1 },
    { id: 11, title: "Agra Day Trip: Taj Mahal and Agra Fort from Delhi", location: "New Delhi, India", rating: 4.9, reviews: 2156, price: 6499, image: uh2 },
    { id: 12, title: "Spiritual Delhi: Temples and Religious Sites Tour", location: "New Delhi, India", rating: 4.8, reviews: 987, price: 2799, image: uh3 },
    { id: 13, title: "Delhi Photography Tour: Capture the City's Beauty", location: "New Delhi, India", rating: 4.7, reviews: 654, price: 3499, image: uh1 },
    { id: 14, title: "Delhi Architecture Tour: Modern and Historical Buildings", location: "New Delhi, India", rating: 4.9, reviews: 1234, price: 2999, image: uh2 },
    { id: 15, title: "Delhi Rickshaw Tour: Explore Old Delhi's Narrow Lanes", location: "New Delhi, India", rating: 5.0, reviews: 1876, price: 1999, image: uh3 },
  ];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 2000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Initialize temp dates when calendar opens
  useEffect(() => {
    if (showCalendar) {
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    }
  }, [showCalendar, startDate, endDate]);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Check if a date is in the past
  const isPastDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Handle date input click
  const handleDateInputClick = (e) => {
    e.preventDefault();
    setShowCalendar(!showCalendar);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const dateWrapper = document.querySelector('.date-input-wrapper');
      const calendar = document.querySelector('.custom-calendar');
      if (dateWrapper && !dateWrapper.contains(e.target) && 
          calendar && !calendar.contains(e.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCalendar]);

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
      // Start new selection
      setTempStartDate(dateString);
      setTempEndDate('');
    } else if (tempStartDate && !tempEndDate) {
      // Select end date
      const start = parseDateString(tempStartDate);
      const clicked = parseDateString(dateString);
      if (clicked < start) {
        // If clicked date is before start, make it the new start
        setTempStartDate(dateString);
        setTempEndDate(tempStartDate);
      } else {
        setTempEndDate(dateString);
      }
    }
  };

  const handleApply = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setShowCalendar(false);
  };

  const handleReset = () => {
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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
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

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', { query: searchQuery, startDate, endDate });
  };

  const formatDisplayDate = (start, end) => {
    if (!start && !end) return 'Select date';
    if (start && !end) {
      const date = new Date(start);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    return 'Select date';
  };


  return (
    <div className="user-home">
      <UserHeader />
      
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
      >
        <div className="hero-overlay"></div>
        
        {/* Image Carousel Indicators */}
        <div className="carousel-indicators">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">Do more with Gatividhi</h1>
          <p className="hero-subtitle">Turn Every Trip into an Adventure.</p>

          {/* Search Bar */}
          <form className="hero-search-bar" onSubmit={handleSearch}>
            <div className="search-field">
              <label htmlFor="where-to">Where to?</label>
              <input
                id="where-to"
                type="text"
                placeholder="Search for a place or activity"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label htmlFor="when">When</label>
              <div className="date-input-wrapper">
                <span className="date-display" onClick={handleDateInputClick}>
                  {formatDisplayDate(startDate, endDate)}
                </span>
                {(startDate || endDate) && (
                  <button
                    type="button"
                    className="clear-date-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    aria-label="Clear date"
                  >
                    ×
                  </button>
                )}
                {showCalendar && (
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
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <button 
                        type="button" 
                        className="calendar-apply-btn"
                        onClick={handleApply}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="search-button" aria-label="Search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* Why Book Section */}
      <section className="why-book-section">
        <h2 className="why-book-title">Why book with Gatividhi?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-pink">
              <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <path d="M13 8H3"></path>
                <path d="M17 12H3"></path>
                <path d="M9 16H3"></path>
              </svg>
            </div>
            <h3 className="feature-title">24/7 customer support</h3>
            <p className="feature-description">No matter the time zone, we're here to help.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-blue">
              <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="feature-title">Verified activities</h3>
            <p className="feature-description">Handpicked adventure and travel experiences you can trust.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-yellow">
              <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
              </svg>
            </div>
            <h3 className="feature-title">Instant booking</h3>
            <p className="feature-description">Quick confirmation with hassle-free booking..</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-teal">
              <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="12 6 16 14 12 10 8 14 12 6"></polygon>
              </svg>
            </div>
            <h3 className="feature-title">Curated adventures</h3>
            <p className="feature-description">Only the best rafting, trekking, bungee & more.</p>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="login-section">
        <div className="login-box">
          <h2 className="login-title">Log in to manage bookings & Gatividhi Rewards</h2>
          <p className="signup-prompt">
            Don't have an account yet? <a href="/signup" className="signup-link">Sign up</a>
          </p>
          <button className="login-button">Log in</button>
        </div>
       
      </section>

      {/* Based on Interest Section */}
      <section className="interest-section">
        <h2 className="interest-title">Based on your interest in New Delhi</h2>
        <div className="cards-container-wrapper">
          <div className="cards-container">
            {tourCards.map((card) => (
              <div key={`interest-${card.id}`} className="tour-card">
                <div className="tour-card-image-wrapper">
                  <div 
                    className="tour-card-image"
                    style={{ backgroundImage: `url(${card.image})` }}
                  >
                    {card.specialOffer && (
                      <span className="special-offer-badge">Special Offer</span>
                    )}
                    <button className="heart-icon" aria-label="Save">
                      <Like />
                    </button>
                  </div>
                </div>
                <div className="tour-card-content">
                  <p className="tour-location">{card.location}</p>
                  <div className="tour-rating">
                    <span className="rating-star">★</span>
                    <span className="rating-value">{card.rating}</span>
                    <span className="rating-reviews">({card.reviews.toLocaleString()})</span>
                  </div>
                  <h3 className="tour-title">{card.title}</h3>
                  <div className="tour-price">
                    {card.originalPrice ? (
                      <>
                        <span className="price-current">from ₹{card.price.toLocaleString()}</span>
                        <span className="price-original">₹{card.originalPrice.toLocaleString()}</span>
                      </>
                    ) : (
                      <span className="price-current">from ₹{card.price.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="price-note">Price varies by group size</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="top-destinations-section">
        <h2 className="destinations-title">Top Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh1})` }}
            >
              <span className="destination-name">Las Vegas</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh2})` }}
            >
              <span className="destination-name">Rome</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh3})` }}
            >
              <span className="destination-name">Paris</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh1})` }}
            >
              <span className="destination-name">London</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh2})` }}
            >
              <span className="destination-name">New York City</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh3})` }}
            >
              <span className="destination-name">Washington DC</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh1})` }}
            >
              <span className="destination-name">Cancun</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh2})` }}
            >
              <span className="destination-name">Florence</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh3})` }}
            >
              <span className="destination-name">Barcelona</span>
            </div>
          </div>
          <div className="destination-card">
            <div 
              className="destination-image"
              style={{ backgroundImage: `url(${uh1})` }}
            >
              <span className="destination-name">Oahu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Experiences This Season Section */}
      <section className="trending-section">
        <h2 className="trending-title">Top Experiences This Season</h2>
        <div className="cards-container-wrapper">
          <div className="cards-container">
            {tourCards.map((card) => (
              <div key={card.id} className="tour-card">
                <div className="tour-card-image-wrapper">
                  <div 
                    className="tour-card-image"
                    style={{ backgroundImage: `url(${card.image})` }}
                  >
                    {card.specialOffer && (
                      <span className="special-offer-badge">Special Offer</span>
                    )}
                    <button className="heart-icon" aria-label="Save">
                      <Like />
                    </button>
                  </div>
                </div>
                <div className="tour-card-content">
                  <p className="tour-location">{card.location}</p>
                  <div className="tour-rating">
                    <span className="rating-star">★</span>
                    <span className="rating-value">{card.rating}</span>
                    <span className="rating-reviews">({card.reviews.toLocaleString()})</span>
                  </div>
                  <h3 className="tour-title">{card.title}</h3>
                  <div className="tour-price">
                    {card.originalPrice ? (
                      <>
                        <span className="price-current">from ₹{card.price.toLocaleString()}</span>
                        <span className="price-original">₹{card.originalPrice.toLocaleString()}</span>
                      </>
                    ) : (
                      <span className="price-current">from ₹{card.price.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="price-note">Price varies by group size</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep Things Flexible Section */}
      
      {/* Free Cancellation Section */}
      <section className="cancellation-section">
        <div className="cancellation-content">
          <h2 className="cancellation-title">Free cancellation</h2>
          <p className="cancellation-description">
            You'll receive a full refund if you cancel at least 24 hours in advance of most experiences.
          </p>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-header">
              <span className="review-rating">Excellent</span>
              <div className="review-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </div>
            <p className="review-time">42 minutes ago</p>
            <p className="review-text">This tour was incredible</p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div className="review-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </div>
            <p className="review-time">47 minutes ago</p>
            <p className="review-text">Easy to use</p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div className="review-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </div>
            <p className="review-time">50 minutes ago</p>
            <p className="review-text">Exceptional Tour</p>
          </div>
        </div>
      </section>

      {/* Image Share Section */}
      <section className="image-share-section">
        <h2 className="image-share-title">Popular Experiences</h2>
        <div className="image-grid">
          <div className="image-card">
            <img src={uh1} alt="Adventure Experience 1" />
            <div className="image-overlay">
              <h3>Hot Air Balloon Rides</h3>
              <p>Experience breathtaking views from above</p>
            </div>
          </div>
          <div className="image-card">
            <img src={uh2} alt="Adventure Experience 2" />
            <div className="image-overlay">
              <h3>Mountain Lake Tours</h3>
              <p>Discover serene natural beauty</p>
            </div>
          </div>
          <div className="image-card">
            <img src={uh3} alt="Adventure Experience 3" />
            <div className="image-overlay">
              <h3>Paragliding Adventures</h3>
              <p>Soar through the skies</p>
            </div>
          </div>
        </div>
      </section>

      <UserFooter />
    </div>
  );
};

export default UserHome;

