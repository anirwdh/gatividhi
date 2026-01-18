import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubadminFooter from '../Subadmin/SubadminFooter';
import Like from '../../assets/icons/Like';
import uh1 from '../../assets/images/uh1.jpg';
import uh2 from '../../assets/images/uh2.jpg';
import uh3 from '../../assets/images/uh3.jpg';
import '../Subadmin/SubadminHome.css';
import '../Subadmin/SubadminBooking.css';
import '../User/UserAllActivitiesScreen.css';
import './TeamHome.css';

const TeamHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('listings');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const handleListingClick = (listing) => {
    navigate('/gatividhiteam/listing-detail', { state: { listingData: listing } });
  };

  const handleBookingClick = (booking) => {
    navigate('/gatividhiteam/edit-booking', { state: { bookingData: booking } });
  };

  // Dummy data for listings
  const [adminListingCards] = useState([
    { id: 1, title: 'Rome Colosseum Skip-the-Line Tour', location: 'Rome, Italy', rating: 4.8, reviews: 2341, price: 4599, duration: '3 hours', image: uh1, bestSeller: true, freeCancellation: true },
    { id: 2, title: 'Vatican Museums & Sistine Chapel Tour', location: 'Rome, Italy', rating: 4.9, reviews: 1876, price: 5999, duration: '4 hours', image: uh2, freeCancellation: true },
    { id: 3, title: 'Rome Food Tour - Trastevere District', location: 'Rome, Italy', rating: 4.7, reviews: 1234, price: 3499, duration: '3 hours', image: uh3, freeCancellation: true },
    { id: 4, title: 'Rome Night Walking Tour with Dinner', location: 'Rome, Italy', rating: 4.6, reviews: 987, price: 4299, duration: '4 hours', image: uh1, freeCancellation: true },
    { id: 5, title: 'Ancient Rome Underground Tour', location: 'Rome, Italy', rating: 4.8, reviews: 1543, price: 5299, duration: '3 hours', image: uh2, freeCancellation: true },
    { id: 6, title: 'Rome Bike Tour City Highlights', location: 'Rome, Italy', rating: 4.5, reviews: 876, price: 2999, duration: '4 hours', image: uh3, freeCancellation: true },
    { id: 7, title: 'Rome Pasta Making Class', location: 'Rome, Italy', rating: 4.9, reviews: 2109, price: 6999, duration: '3 hours', image: uh1, freeCancellation: true },
    { id: 8, title: 'Rome Photography Tour', location: 'Rome, Italy', rating: 4.7, reviews: 654, price: 3799, duration: '3 hours', image: uh2, freeCancellation: true },
    { id: 9, title: 'Rome Wine Tasting Experience', location: 'Rome, Italy', rating: 4.8, reviews: 1432, price: 4999, duration: '2 hours', image: uh3, freeCancellation: true },
    { id: 10, title: 'Rome Hop-On Hop-Off Bus Tour', location: 'Rome, Italy', rating: 4.4, reviews: 3210, price: 2499, duration: '24 hours', image: uh1, freeCancellation: true },
    { id: 11, title: 'Rome Segway Tour', location: 'Rome, Italy', rating: 4.6, reviews: 789, price: 3999, duration: '3 hours', image: uh2, freeCancellation: true },
    { id: 12, title: 'Rome Cooking Class with Local Chef', location: 'Rome, Italy', rating: 4.9, reviews: 1876, price: 7999, duration: '4 hours', image: uh3, freeCancellation: true }
  ]);

  // Dummy data for bookings
  const [bookings] = useState([
    { id: 1, customerName: 'John Smith', activity: 'Rome Colosseum Tour', date: '2024-01-15', time: '10:00 AM', status: 'confirmed', amount: 4599 },
    { id: 2, customerName: 'Emma Johnson', activity: 'Vatican Museums Tour', date: '2024-01-16', time: '2:00 PM', status: 'confirmed', amount: 5999 },
    { id: 3, customerName: 'Michael Brown', activity: 'Rome Food Tour', date: '2024-01-17', time: '6:00 PM', status: 'pending', amount: 3499 },
    { id: 4, customerName: 'Sarah Davis', activity: 'Ancient Rome Tour', date: '2024-01-18', time: '9:00 AM', status: 'confirmed', amount: 5299 },
    { id: 5, customerName: 'James Wilson', activity: 'Rome Bike Tour', date: '2024-01-19', time: '11:00 AM', status: 'cancelled', amount: 2999 },
    { id: 6, customerName: 'Lisa Anderson', activity: 'Pasta Making Class', date: '2024-01-20', time: '3:00 PM', status: 'confirmed', amount: 6999 },
    { id: 7, customerName: 'Robert Taylor', activity: 'Rome Photography Tour', date: '2024-01-21', time: '8:00 AM', status: 'confirmed', amount: 3799 },
    { id: 8, customerName: 'Maria Garcia', activity: 'Wine Tasting', date: '2024-01-22', time: '5:00 PM', status: 'pending', amount: 4999 }
  ]);

  return (
    <div className="subadmin-dashboard-wrapper">
      <div className="subadmin-home">
        <main className="subadmin-main-content">
          <div className="subadmin-content-container">
            <aside className={`form-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <div className="sidebar-content">
                <h3 className="sidebar-title">Team Panel</h3>
                <nav className="sidebar-nav">
                  <button
                    type="button"
                    className={`sidebar-nav-item ${activeSection === 'listings' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('listings')}
                  >
                    <span className="nav-item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                        <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                        <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                        <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                      </svg>
                    </span>
                    <span className="nav-item-text">Listings</span>
                  </button>
                  <button
                    type="button"
                    className={`sidebar-nav-item ${activeSection === 'bookings' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('bookings')}
                  >
                    <span className="nav-item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                        <circle cx="8" cy="15" r="1.5"></circle>
                        <circle cx="16" cy="15" r="1.5"></circle>
                      </svg>
                    </span>
                    <span className="nav-item-text">Bookings</span>
                  </button>
                </nav>
              </div>
              {/* Mobile Menu Overlay */}
              {mobileMenuOpen && (
                <div 
                  className="mobile-menu-overlay"
                  onClick={() => setMobileMenuOpen(false)}
                />
              )}
            </aside>

            <div className="create-activity-form-wrapper">
              {/* Mobile Header with Hamburger Menu */}
              <div className="mobile-header">
                <button 
                  className="hamburger-menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <h1 className="mobile-title">Team Dashboard</h1>
              </div>
              
              <div className="form-header">
                <h1 className="form-main-title">Team Dashboard</h1>
                <h2 className="form-sub-title">
                  Manage Listings and Bookings
                </h2>
              </div>

              <div className="create-activity-form">
                {activeSection === 'listings' && (
                  <section className="form-section">
                    <h3 className="form-section-title">Activity Listings</h3>
                    <div className="tour-cards-grid">
                      {adminListingCards.map((card) => (
                        <div key={card.id} className="activity-card" onClick={() => handleListingClick(card)}>
                          <div className="activity-card-image-wrapper">
                            <div 
                              className="activity-card-image"
                              style={{ backgroundImage: `url(${card.image})` }}
                            />
                            {card.bestSeller && (
                              <span className="card-badge best-seller">Best Seller</span>
                            )}
                            {card.freeCancellation && (
                              <span className="card-badge likely-sellout">Free Cancellation</span>
                            )}
                            <button className="heart-icon" onClick={(e) => { e.stopPropagation(); }}>
                              <Like />
                            </button>
                          </div>
                          <div className="activity-card-content">
                            <div className="card-rating">
                              <span className="rating-star">⭐</span>
                              <span className="rating-value">{card.rating}</span>
                              <span className="rating-reviews">({card.reviews})</span>
                            </div>
                            <h3 className="card-title">{card.title}</h3>
                            <div className="card-details">
                              <span className="detail-badge">📍 {card.location}</span>
                              <span className="card-duration">⏱️ {card.duration}</span>
                            </div>
                            <div className="card-price">
                              <span className="price-text">₹{card.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activeSection === 'bookings' && (
                  <section className="form-section">
                    <h3 className="form-section-title">Booking Management</h3>
                    <div className="bookings-table-container">
                      <table className="bookings-table">
                        <thead>
                          <tr>
                            <th>Booking ID</th>
                            <th>Customer Name</th>
                            <th>Activity</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr 
                              key={booking.id} 
                              className="booking-row"
                              onClick={() => handleBookingClick(booking)}
                            >
                              <td>#{booking.id.toString().padStart(4, '0')}</td>
                              <td>{booking.customerName}</td>
                              <td>{booking.activity}</td>
                              <td>{booking.date}</td>
                              <td>{booking.time}</td>
                              <td>
                                <span className={`status-badge status-${booking.status}`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td>₹{booking.amount.toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <SubadminFooter />
    </div>
  );
};

export default TeamHome;