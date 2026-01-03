import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import Like from '../../assets/icons/Like';
import DropDown from '../../assets/icons/DropDown';
import uh1 from '../../assets/images/uh1.jpg';
import uh2 from '../../assets/images/uh2.jpg';
import uh3 from '../../assets/images/uh3.jpg';
import './UserDetailAcitivityScreen.css';

const UserDetailAcitivityScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const passedActivityData = location.state?.activityData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [travelers, setTravelers] = useState(2);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isIncludedOpen, setIsIncludedOpen] = useState(true);
  const [isMeetingOpen, setIsMeetingOpen] = useState(true);
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('8:00 AM');
  const datePickerRef = useRef(null);

  // Time slots data
  const timeSlots = [
    { time: '8:00 AM', available: true },
    { time: '8:30 AM', available: false },
    { time: '9:00 AM', available: true },
    { time: '9:30 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '2:30 PM', available: true },
  ];

  // Gallery images - will come from API later
  const galleryImages = [uh1, uh2, uh3, uh1, uh2, uh3, uh1];

  // Section refs for scroll detection
  const sectionRefs = {
    overview: useRef(null),
    included: useRef(null),
    meeting: useRef(null),
    itinerary: useRef(null),
    additional: useRef(null),
    cancellation: useRef(null),
    reviews: useRef(null),
  };

  const navRef = useRef(null);
  const stickyNavRef = useRef(null);

  // Mock data - will come from API later
  const activityData = {
    title: "  Rishikesh Adventure, River Rafting, Sky-Diving  Guided Tour",
    location: "Rishikesh, Uttrakhand",
    rating: 4.5,
    reviewCount: 38931,
    badgeOfExcellence: true,
    price: 3790.67,
    likelyToSellOut: true,
    exceptionalDeal: true,
    discountedKids: true,
    freeCancellation: true,
    bookedAhead: 63,
    overview: "Discover the Vatican and the Sistine Chapel, plus the option to add on St. Peter's Basilica. Navigate the vast halls, artwork, and history with a guide who gives special insights into the collections. Skip all entrance lines and explore the Gallery of the Maps, the Pineyard Courtyard, and other areas of the Vatican. Step inside the Sistine Chapel to admire 'The Creation of Adam' by Michelangelo and finish your tour at St. Peter's Basilica (if option selected).",
    highlights: [
      "Enjoy the Vatican highlights and Sistine Chapel with the insights of a guide",
      "Choose from several different departure times and enjoy fast-track entry",
      "Opt to include a visit inside St. Peter's Basilica to cap off your tour",
      "Upgrade to a private or small-group tour for more personal attention"
    ],
    whyChoose: "With options to add St. Peter's Basilica and book a small-group or private experience, this tour offers maximum flexibility.",
    included: [
      "Reserved Priority Access to the Vatican Museums (except St Peter's Tour Only option)",
      "Guided visit of St. Peter's Basilica (except: Wednesday morning & if Express option selected)",
      "Access to the Sistine Chapel (except St Peter's Tour Only option)",
      "Professional guide",
      "Headsets to hear the guide clearly"
    ],
    notIncluded: [
      "Gratuities",
      "If you book 'St. Peter Tour Only,' access to the Vatican & Sistine Chapel is NOT included"
    ],
    meetingPoints: [
      { name: "Vatican Museums Entrance", address: "Viale Vaticano, 00165 Roma RM, Italy" },
      { name: "St. Peter's Square", address: "Piazza San Pietro, 00120 Città del Vaticano, Vatican City" }
    ],
    endPoint: {
      name: "Saint Peter's Basilica",
      address: "Piazza San Pietro, 00120 Città del Vaticano, Vatican City"
    },
    itinerary: [
      {
        title: "Vatican City",
        description: "Vatican Museums tours with skip-the-line access are popular, yet even fast-track lines can be lengthy. This exclusive experience provides admission through a dedicated entrance, ensuring a queue-free visit.",
        duration: "5 minutes",
        admission: "Admission Ticket Free"
      },
      {
        title: "Vatican Museums",
        description: "Embark on an exclusive journey into the treasure trove of the Vatican Museums. Explore the intriguing Gallery of the Maps and Tapestries, immersed in tales of Vatican secrets. Marvel at captivating Italian maps, ancient tapestries, and Renaissance masterpieces that tell stories of power, faith, and artistry.",
        duration: "1 hour 15 minutes",
        admission: "Admission Ticket Included"
      },
      {
        title: "Cortile della Pigna",
        description: "The Pineyard Courtyard at the Vatican Museums is a serene haven, blending classic architecture with lush greenery. Donato Bramante's Pigna statue stands as a bronze centerpiece, creating a peaceful retreat from the museum's bustling galleries.",
        duration: "10 minutes",
        admission: "Admission Ticket Included"
      },
      {
        title: "Sistine Chapel",
        description: "Step into the legendary Sistine Chapel, where Michelangelo's ceiling frescoes await. Gaze up at 'The Creation of Adam' and other biblical scenes that have captivated millions. This is the highlight of any Vatican visit.",
        duration: "30 minutes",
        admission: "Admission Ticket Included"
      },
      {
        title: "St. Peter's Basilica",
        description: "Conclude your tour at the magnificent St. Peter's Basilica, one of the world's largest and most important churches. Admire Michelangelo's Pietà, Bernini's Baldacchino, and the stunning dome that dominates Rome's skyline.",
        duration: "45 minutes",
        admission: "Admission Ticket Included"
      }
    ],
    additionalInfo: [
      "Confirmation will be received at time of booking",
      "Not wheelchair accessible",
      "Near public transportation",
      "Most travelers can participate",
      "This experience requires good weather. If it's canceled due to poor weather, you'll be offered a different date or a full refund",
      "This experience requires a minimum number of travelers. If it's canceled because the minimum isn't met, you'll be offered a different date/experience or a full refund",
      "Face masks required for travelers in public areas",
      "Social distancing enforced throughout experience",
      "Regularly sanitized high-traffic areas",
      "Gear/equipment sanitized between uses"
    ],
    cancellationPolicy: "For a full refund, cancel at least 24 hours in advance of the start date of the experience.",
    reviews: [
      {
        author: "Steven_P",
        date: "Oct 2025",
        rating: 5,
        text: "Fantastic tour with an amazing tour guide, Laura. Just under 20 people- sounds like a lot but the tour experience still felt intimate. The Sistine Chapel was the highlight, but St. Peter's is breathtaking. Three hours flew by. We enjoyed every minute of it."
      },
      {
        author: "Judy_S",
        date: "Nov 2025",
        rating: 5,
        text: "Clear directions to the meeting point. Good to get the skip the line tickets. Even in November the line was very long. Excellent guide, Flavia, who gave detailed information about every place we visited. The Vatican Museums are amazing. Highly recommend this tour."
      },
      {
        author: "Michael_R",
        date: "Dec 2025",
        rating: 5,
        text: "Absolutely incredible experience! Our guide was knowledgeable and engaging. The skip-the-line access was worth every penny. The Sistine Chapel was breathtaking, and St. Peter's Basilica was the perfect ending to the tour."
      },
      {
        author: "Sarah_L",
        date: "Dec 2025",
        rating: 4,
        text: "Great tour overall. The guide was excellent and very informative. The only downside was that it was quite crowded, but that's expected at the Vatican. Would definitely recommend booking this tour."
      }
    ]
  };

  // Handle image navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Handle sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current || !stickyNavRef.current) return;

      const navTop = navRef.current.offsetTop;
      const scrollY = window.scrollY;

      // Check if we've scrolled past the navigation
      if (scrollY >= navTop) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }

      // Determine active section based on scroll position
      const sections = ['overview', 'included', 'meeting', 'itinerary', 'additional', 'cancellation', 'reviews'];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const ref = sectionRefs[section];
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section navigation
  const scrollToSection = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref.current) {
      const offset = 120; // Account for sticky nav
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Format date for display
  const formatDateDisplay = (date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Handle travelers change
  const handleTravelersChange = (delta) => {
    setTravelers((prev) => Math.max(1, Math.min(20, prev + delta)));
  };

  const handleCheckAvailability = () => {
    setShowAvailability(true);
    // Scroll to availability section
    setTimeout(() => {
      const availabilitySection = document.querySelector('.availability-section');
      if (availabilitySection) {
        const offset = 120; // Account for sticky nav
        const elementPosition = availabilitySection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return (activityData.price * travelers).toFixed(2);
  };

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

  // Check if a date is in the past
  const isPastDate = (dateString) => {
    const date = parseDateString(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!date) return true;
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
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        const calendar = document.querySelector('.custom-calendar-detail');
        if (calendar && !calendar.contains(e.target)) {
          setShowCalendar(false);
        }
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCalendar]);

  // Update current month when selected date changes
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate]);

  const handleDateClick = (day) => {
    const dateString = formatDateToString(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    
    if (isPastDate(dateString)) return;

    const clickedDate = parseDateString(dateString);
    setSelectedDate(clickedDate);
    setShowCalendar(false);
  };

  const handleReset = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    setSelectedDate(date);
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
    const selectedDateString = selectedDate ? formatDateToString(selectedDate) : '';

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateToString(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
      const isPast = isPastDate(dateString);
      const isSelected = dateString === selectedDateString;
      const isToday = dateString === todayString;

      let className = 'calendar-day';
      if (isPast) className += ' past-date';
      if (isSelected) className += ' selected-date';
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

  return (
    <div className="detail-activity-screen">
      <UserHeader />
      
      {/* Breadcrumbs */}
      
      {/* Main Content Container */}
      <div className="detail-content-wrapper">
        {/* Left Content */}
        <div className="detail-content-left">
          {/* Title and Rating */}
          <div className="activity-header">
            <h1 className="activity-title">{activityData.title}</h1>
            <div className="activity-meta">
              <div className="activity-rating">
               
               
               
              </div>
              <div className="activity-location">{activityData.location}</div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="gallery-container">
              {/* Main image first on mobile, thumbnails below */}
              <div className="gallery-main">
                <div className="gallery-main-image">
                  <img src={galleryImages[currentImageIndex]} alt={`Gallery image ${currentImageIndex + 1}`} />
                  <button 
                    className="gallery-nav-btn gallery-prev" 
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <DropDown style={{ transform: 'rotate(90deg)' }} />
                  </button>
                  <button 
                    className="gallery-nav-btn gallery-next" 
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <DropDown style={{ transform: 'rotate(-90deg)' }} />
                  </button>
                  <div className="gallery-image-counter">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </div>
                  <button 
                    className={`gallery-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label="Add to Wishlist"
                  >
                    <Like />
                  </button>
                </div>
              </div>
              
              {/* Thumbnails on the left for desktop, below for mobile */}
              <div className="gallery-thumbnails">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className={`gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget for Mobile - appears after gallery */}
          <div className="booking-widget-mobile-container">
            <div className="booking-widget-new">
              <div className="booking-price-new">
                From ₹{activityData.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per person
              </div>
              <div className="deal-badges-container">
               
                
              </div>
              <div className="booking-form-new">
                <div className="booking-fields-row">
                  <div className="booking-field-new">
                    <label className="booking-label">Date</label>
                    <div className="booking-input-wrapper-new date-input-wrapper-detail">
                      <span 
                        className="date-display-detail" 
                        onClick={handleDateInputClick}
                      >
                        {formatDateDisplay(selectedDate)}
                      </span>
                      {selectedDate && (
                        <button
                          type="button"
                          className="clear-date-btn-detail"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReset();
                          }}
                          aria-label="Clear date"
                        >
                          ×
                        </button>
                      )}
                      <span className="booking-input-arrow-new">▼</span>
                      {showCalendar && (
                        <div className="custom-calendar-detail">
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
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="booking-field-new">
                    <label className="booking-label">Travelers</label>
                    <div className="booking-input-wrapper-new booking-input-travelers-wrapper">
                      <svg className="person-icon-new" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <input 
                        type="text" 
                        value={travelers}
                        readOnly
                        className="booking-input-new booking-input-travelers"
                      />
                      <div className="travelers-controls-inline">
                        <button 
                          type="button"
                          className="traveler-btn-inline"
                          onClick={() => handleTravelersChange(-1)}
                          disabled={travelers <= 1}
                        >
                          −
                        </button>
                        <button 
                          type="button"
                          className="traveler-btn-inline"
                          onClick={() => handleTravelersChange(1)}
                          disabled={travelers >= 20}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="check-availability-btn-new" onClick={handleCheckAvailability}>Check Availability</button>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          {showAvailability && (
            <>
              <div className="availability-section">
                 
                <h2 className="activity-booking-title">Vatican Group - English</h2>
                <p className="activity-booking-description">
                  Vatican Museums, Sistine Chapel & St. Peter's Basilica tour with English-speaking guide & small group of 20 people or less.
                  <a href="#" className="read-more-link">Read more <span>▼</span></a>
                </p>
              
                <div className="time-slots-grid">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`time-slot-btn ${!slot.available ? 'unavailable' : ''} ${selectedTimeSlot === slot.time ? 'selected' : ''}`}
                      onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                      disabled={!slot.available}
                    >
                      {slot.time}
                      {!slot.available && <span className="unavailable-mark">✗</span>}
                    </button>
                  ))}
                </div>

                <div className="booking-summary">
                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>{travelers} {travelers === 1 ? 'Adult' : 'Adults'} × ₹{activityData.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="price-total">₹{calculateTotalPrice().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                    </div>
                  </div>

                  <div className="cancellation-policy-box">
                    <svg className="check-icon-green" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Free cancellation before 8:00 AM on {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''} (local time)</span>
                  </div>

                  <div className="book-now-container">
                    <button 
                      className="book-now-btn"
                      onClick={() => {
                        navigate('/checkout', {
                          state: {
                            activityData,
                            selectedDate,
                            travelers,
                            selectedTimeSlot,
                            galleryImages
                          }
                        });
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="availability-alert-below">
                <span className="alert-text">Only 8 spots left</span>
              </div>
            </>
          )}

          {/* Sticky Navigation */}
          <div ref={navRef} className="section-nav-container">
            <nav ref={stickyNavRef} className={`section-nav ${isNavSticky ? 'sticky' : ''}`}>
              <button 
                className={activeSection === 'overview' ? 'active' : ''}
                onClick={() => scrollToSection('overview')}
              >
                Overview
              </button>
              <button 
                className={activeSection === 'included' ? 'active' : ''}
                onClick={() => scrollToSection('included')}
              >
                What's Included
              </button>
              <button 
                className={activeSection === 'meeting' ? 'active' : ''}
                onClick={() => scrollToSection('meeting')}
              >
                Meeting and Pickup
              </button>
              <button 
                className={activeSection === 'itinerary' ? 'active' : ''}
                onClick={() => scrollToSection('itinerary')}
              >
                Itinerary
              </button>
              <button 
                className={activeSection === 'additional' ? 'active' : ''}
                onClick={() => scrollToSection('additional')}
              >
                Additional Info
              </button>
              <button 
                className={activeSection === 'cancellation' ? 'active' : ''}
                onClick={() => scrollToSection('cancellation')}
              >
                Cancellation Policy
              </button>
              <button 
                className={activeSection === 'reviews' ? 'active' : ''}
                onClick={() => scrollToSection('reviews')}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Overview Section */}
          <section ref={sectionRefs.overview} id="overview" className="content-section">
            <h2 className="section-title">Overview</h2>
            <p className="section-description">{activityData.overview}</p>
            <ul className="highlights-list">
              {activityData.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
           
          </section>

          {/* What's Included Section */}
          <section ref={sectionRefs.included} id="included" className="content-section">
            <div className="collapsible-section-header" onClick={() => setIsIncludedOpen(!isIncludedOpen)}>
              <h2 className="section-title">What's Included</h2>
              <div className={`section-toggle-icon ${isIncludedOpen ? 'open' : ''}`}>
                <DropDown />
              </div>
            </div>
            {isIncludedOpen && (
              <div className="included-content-new">
                <ul className="included-list-new">
                  {activityData.included.map((item, index) => (
                    <li key={index} className="included-item-new">
                      <span className="check-icon-new">✓</span>
                      <span className="included-text">{item}</span>
                    </li>
                  ))}
                  {activityData.notIncluded.map((item, index) => (
                    <li key={`not-${index}`} className="not-included-item-new">
                      <span className="cross-icon-new">✗</span>
                      <span className="included-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Meeting and Pickup Section */}
          <section ref={sectionRefs.meeting} id="meeting" className="content-section">
            <div className="collapsible-section-header" onClick={() => setIsMeetingOpen(!isMeetingOpen)}>
              <h2 className="section-title">Meeting and Pickup</h2>
              <div className={`section-toggle-icon ${isMeetingOpen ? 'open' : ''}`}>
                <DropDown />
              </div>
            </div>
            {isMeetingOpen && (
              <div className="meeting-content-new">
                <div className="departure-point">
                  <div className="departure-point-header">
                    <svg className="location-icon-new" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="departure-point-label">Departure Point</span>
                  </div>
                  <div className="departure-point-address">
                    {activityData.meetingPoints[0]?.address || activityData.endPoint.address}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Itinerary Section */}
          <section ref={sectionRefs.itinerary} id="itinerary" className="content-section">
            <h2 className="section-title">Itinerary</h2>
            <p className="itinerary-intro">
              The UNESCO-listed Vatican Museums are visited by tens of thousands of people each day, but you'll bypass the worst of its sightseeing crowds by entering with your guide through an exclusive entranceway, with your prebooked ticket in hand.
            </p>
            <p className="itinerary-intro">
              The halls and rooms of the museum complex comprise miles of historic art and antiquities, but you'll go straight to the highlights with your guide, who will share stories and context about the collections.
            </p>
            <div className="itinerary-list">
              {activityData.itinerary.map((item, index) => (
                <div key={index} className="itinerary-item">
                  <div className="itinerary-number">{index + 1}</div>
                  <div className="itinerary-content">
                    <h3 className="itinerary-title">{item.title}</h3>
                    <p className="itinerary-description">{item.description}</p>
                    <div className="itinerary-meta">
                      <span className="itinerary-duration">{item.duration}</span>
                      <span className="itinerary-separator">•</span>
                      <span className="itinerary-admission">{item.admission}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Info Section */}
          <section ref={sectionRefs.additional} id="additional" className="content-section">
            <h2 className="section-title">Additional Info</h2>
            <div className="additional-info-grid">
              <div className="additional-info-column">
                {activityData.additionalInfo.slice(0, 3).map((info, index) => (
                  <div key={index} className="additional-info-item">{info}</div>
                ))}
                <button className="show-more-btn">Show 7 more</button>
              </div>
              <div className="additional-info-column">
                <div className="additional-info-note">
                  St Peter's Basilica & Sistine Chapel are subject to last-minute closures for religious ceremonies. When this occurs, we're happy to offer customers an extended tour of the Vatican Museums. While we endeavour to tell tour groups ahead of time if there are any planned disruptions to the Basilica's opening hours, this is not always possible and in these cases we are unable to provide refunds or discounts.
                </div>
                <div className="additional-info-note">
                  On Wednesday mornings, access to St. Peter's Basilica is not included due to the Papal Audience. Entry is only possible after 1:00 PM.
                </div>
                <div className="additional-info-note">
                  St Peter's Basilica is not accessible on the express tours options
                </div>
                <div className="supplier-info">
                  Supplied by <a href="#" className="supplier-link">City Wonders Ltd</a>
                </div>
              </div>
            </div>
          </section>

          {/* Cancellation Policy Section */}
          <section ref={sectionRefs.cancellation} id="cancellation" className="content-section">
            <h2 className="section-title">Cancellation Policy</h2>
            <p className="cancellation-text">{activityData.cancellationPolicy}</p>
          </section>

          {/* Reviews Section */}
          <section ref={sectionRefs.reviews} id="reviews" className="content-section">
            <div className="reviews-header">
              <h2 className="section-title">Why travelers loved this</h2>
              <div className="reviews-summary">
                <span className="reviews-rating">{activityData.rating}</span>
                <span className="reviews-count">({activityData.reviewCount.toLocaleString()} Reviews)</span>
              </div>
            </div>
            <div className="reviews-grid">
              {activityData.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                  <div className="review-author">{review.author}</div>
                  <div className="review-date">{review.date}</div>
                  <p className="review-text">{review.text}</p>
                  {review.text.length > 150 && (
                    <button className="read-more-btn">Read more</button>
                  )}
                </div>
              ))}
            </div>
            <button className="view-all-reviews-btn">View all {activityData.reviewCount.toLocaleString()} reviews</button>
          </section>
        </div>

        {/* Right Booking Widget */}
        <div className="detail-content-right">
          <div className="booking-widget-new">
            {/* Image for mobile */}
            <div className="booking-widget-image-mobile">
              <img src={galleryImages[0]} alt={activityData.title} />
            </div>
            <div className="booking-price-new">
              From ₹{activityData.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per person
            </div>
            <div className="deal-badges-container">
             
              
            </div>
            <div className="booking-form-new">
              <div className="booking-fields-row">
                <div className="booking-field-new" ref={datePickerRef}>
                  <label className="booking-label">Date</label>
                  <div className="booking-input-wrapper-new date-input-wrapper-detail">
                    <span 
                      className="date-display-detail" 
                      onClick={handleDateInputClick}
                    >
                      {formatDateDisplay(selectedDate)}
                    </span>
                    {selectedDate && (
                      <button
                        type="button"
                        className="clear-date-btn-detail"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReset();
                        }}
                        aria-label="Clear date"
                      >
                        ×
                      </button>
                    )}
                    <span className="booking-input-arrow-new">▼</span>
                    {showCalendar && (
                      <div className="custom-calendar-detail">
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
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="booking-field-new">
                  <label className="booking-label">Travelers</label>
                  <div className="booking-input-wrapper-new booking-input-travelers-wrapper">
                    <svg className="person-icon-new" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input 
                      type="text" 
                      value={travelers}
                      readOnly
                      className="booking-input-new booking-input-travelers"
                    />
                    <div className="travelers-controls-inline">
                      <button 
                        type="button"
                        className="traveler-btn-inline"
                        onClick={() => handleTravelersChange(-1)}
                        disabled={travelers <= 1}
                      >
                        −
                      </button>
                      <button 
                        type="button"
                        className="traveler-btn-inline"
                        onClick={() => handleTravelersChange(1)}
                        disabled={travelers >= 20}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="check-availability-btn-new" onClick={handleCheckAvailability}>Check Availability</button>
            </div>
            {activityData.freeCancellation && (
              <div className="cancellation-info-new">
                <svg className="check-icon-green-new" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Free cancellation up to 24 hours before the experience starts (local time)
              </div>
            )}
            <div className="book-ahead-info-new">
              <svg className="book-ahead-icon-new" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
              Book ahead! On average, this is booked {activityData.bookedAhead} days in advance.
            </div>
          </div>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default UserDetailAcitivityScreen;

