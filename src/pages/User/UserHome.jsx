import { useState, useEffect } from 'react';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import uh1 from '../../assets/images/uh1.jpg';
import uh2 from '../../assets/images/uh2.jpg';
import uh3 from '../../assets/images/uh3.jpg';
import DropDown from '../../assets/icons/DropDown';
import Like from '../../assets/icons/Like';
import './UserHome.css';

const UserHome = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [trendingScrollPosition, setTrendingScrollPosition] = useState(0);
  const [interestScrollPosition, setInterestScrollPosition] = useState(0);

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

  // Set default date to today
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', { query: searchQuery, date: selectedDate });
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const scrollTrendingCards = (direction) => {
    const cardWidth = 315; // Card width (300px) + gap (15px)
    const cardsToScroll = 1; // Scroll one card at a time
    const cardsVisible = 4; // Number of cards visible
    const maxScroll = (tourCards.length - cardsVisible) * cardWidth;
    
    if (direction === 'left') {
      setTrendingScrollPosition(Math.max(0, trendingScrollPosition - cardWidth * cardsToScroll));
    } else {
      setTrendingScrollPosition(Math.min(maxScroll, trendingScrollPosition + cardWidth * cardsToScroll));
    }
  };

  const scrollInterestCards = (direction) => {
    const cardWidth = 315; // Card width (300px) + gap (15px)
    const cardsToScroll = 1; // Scroll one card at a time
    const cardsVisible = 4; // Number of cards visible
    const maxScroll = (tourCards.length - cardsVisible) * cardWidth;
    
    if (direction === 'left') {
      setInterestScrollPosition(Math.max(0, interestScrollPosition - cardWidth * cardsToScroll));
    } else {
      setInterestScrollPosition(Math.min(maxScroll, interestScrollPosition + cardWidth * cardsToScroll));
    }
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
                <input
                  id="when"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <span className="date-display">{formatDisplayDate(selectedDate)}</span>
                {selectedDate && (
                  <button
                    type="button"
                    className="clear-date-btn"
                    onClick={() => setSelectedDate('')}
                    aria-label="Clear date"
                  >
                    ×
                  </button>
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className="feature-title">24/7 customer support</h3>
            <p className="feature-description">No matter the time zone, we're here to help.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-blue">
              <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="8" rx="6" ry="6"></ellipse>
                <path d="M6 8c0-3.314 2.686-6 6-6s6 2.686 6 6"></path>
                <line x1="12" y1="14" x2="12" y2="20"></line>
                <path d="M8 20h8"></path>
                <line x1="10" y1="20" x2="10" y2="22"></line>
                <line x1="14" y1="20" x2="14" y2="22"></line>
              </svg>
            </div>
            <h3 className="feature-title">Earn rewards</h3>
            <p className="feature-description">Explore, earn, redeem, and repeat with our loyalty program.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-yellow">
              <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="feature-title">Millions of reviews</h3>
            <p className="feature-description">Plan and book with confidence using reviews from fellow travelers.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-teal">
              <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="feature-title">Plan your way</h3>
            <p className="feature-description">Stay flexible with free cancellation and the option to reserve now and pay later at no additional cost.</p>
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
          {interestScrollPosition > 0 && (
            <button className="scroll-button scroll-left" onClick={() => scrollInterestCards('left')} aria-label="Scroll left">
              <DropDown style={{ transform: 'rotate(90deg)', width: '20px', height: '20px' }} />
            </button>
          )}
          <div className="cards-container" style={{ transform: `translateX(-${interestScrollPosition}px)` }}>
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
          {interestScrollPosition < (tourCards.length - 4) * 315 && (
            <button className="scroll-button scroll-right" onClick={() => scrollInterestCards('right')} aria-label="Scroll right">
              <DropDown style={{ transform: 'rotate(-90deg)', width: '20px', height: '20px' }} />
            </button>
          )}
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
          {trendingScrollPosition > 0 && (
            <button className="scroll-button scroll-left" onClick={() => scrollTrendingCards('left')} aria-label="Scroll left">
              <DropDown style={{ transform: 'rotate(90deg)', width: '20px', height: '20px' }} />
            </button>
          )}
          <div className="cards-container" style={{ transform: `translateX(-${trendingScrollPosition}px)` }}>
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
          {trendingScrollPosition < (tourCards.length - 4) * 315 && (
            <button className="scroll-button scroll-right" onClick={() => scrollTrendingCards('right')} aria-label="Scroll right">
              <DropDown style={{ transform: 'rotate(-90deg)', width: '20px', height: '20px' }} />
            </button>
          )}
        </div>
      </section>

      {/* Keep Things Flexible Section */}
      <section className="flexible-section">
        <div className="flexible-content">
          <h2 className="flexible-title">Keep things flexible</h2>
          <p className="flexible-description">
            Use Reserve Now & Pay Later to secure the activities you don't want to miss without being locked in
          </p>
        </div>
        <hr className="section-divider" />
      </section>

      {/* Blank Middle Section */}
      <section className="blank-middle-section"></section>
      <hr className="section-divider" />

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

