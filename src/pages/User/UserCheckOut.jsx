import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import uh1 from '../../assets/images/uh1.jpg';
import uh2 from '../../assets/images/uh2.jpg';
import uh3 from '../../assets/images/uh3.jpg';
import './UserCheckOut.css';

const UserCheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get booking details from navigation state
  const bookingData = location.state || {};
  const activityData = bookingData.activityData || {};
  const selectedDate = bookingData.selectedDate || new Date();
  const travelers = bookingData.travelers || 2;
  const selectedTimeSlot = bookingData.selectedTimeSlot || '9:00 AM';
  const galleryImages = bookingData.galleryImages || [uh1, uh2, uh3];

  // Form state
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phoneCountry: '+1',
    phoneNumber: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay-upi');
  
  // Section visibility state
  const [activeSection, setActiveSection] = useState(1); // 1 = contact, 2 = activity, 3 = payment

  // Calculate total price
  const calculateTotalPrice = () => {
    const price = activityData.price || 0;
    return (price * travelers).toFixed(2);
  };

  // Format date for display
  const formatDateDisplay = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate contact section
  const isContactValid = () => {
    const trimmedEmail = contactInfo.email.trim().toLowerCase();
    const trimmedConfirmEmail = contactInfo.confirmEmail.trim().toLowerCase();
    return (
      contactInfo.firstName.trim() !== '' &&
      contactInfo.lastName.trim() !== '' &&
      trimmedEmail !== '' &&
      trimmedConfirmEmail !== '' &&
      trimmedEmail === trimmedConfirmEmail &&
      contactInfo.phoneNumber.trim() !== ''
    );
  };

  // Handle next button clicks
  const handleNext = (sectionNumber) => {
    if (sectionNumber === 1 && isContactValid()) {
      setActiveSection(2);
    } else if (sectionNumber === 2) {
      setActiveSection(3);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Booking details:', {
      contactInfo,
      bookingData,
      paymentMethod
    });
  };

  return (
    <div className="checkout-screen">
      <UserHeader />
      
      <div className="checkout-container">
        {/* Left Column - Form Sections */}
        <div className="checkout-left">
          {/* Section 1: Contact Details */}
          <section className="checkout-section">
            <div className="section-number">1</div>
            <div className="section-content">
              <h2 className="section-title">Contact details</h2>
              <p className="section-description">
                We'll use this information to send you confirmation and updates about your booking.
              </p>

              {/* Login/Signup Prompt */}
              <div className="login-prompt-box">
                <svg className="person-icon-prompt" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Log in or Sign-up for a faster checkout and to redeem available Gatividhi Rewards.</span>
              </div>

              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={contactInfo.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={contactInfo.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    Email
                    <svg className="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="field-hint">We'll send booking confirmation emails here.</p>
                </div>

                <div className="form-field">
                  <label htmlFor="confirmEmail">Confirm Email</label>
                  <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    value={contactInfo.confirmEmail}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="field-hint">Just to ensure we got the right email.</p>
                </div>

                <div className="form-field">
                  <label htmlFor="phoneNumber">
                    Phone number
                    <svg className="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </label>
                  <div className="phone-input-group">
                    <select
                      name="phoneCountry"
                      value={contactInfo.phoneCountry}
                      onChange={handleInputChange}
                      className="phone-country-select"
                    >
                      <option value="+1">(+1) United States</option>
                      <option value="+91">(+91) India</option>
                      <option value="+44">(+44) United Kingdom</option>
                    </select>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={contactInfo.phoneNumber}
                      onChange={handleInputChange}
                      className="phone-number-input"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="button" 
                  className="next-btn"
                  onClick={() => handleNext(1)}
                  disabled={!isContactValid()}
                >
                  Next
                </button>
              </form>
            </div>
          </section>

          {/* Section 2: Activity Details */}
          {activeSection >= 2 && (
          <section className="checkout-section">
            <div className="section-number">2</div>
            <div className="section-content">
              <div className="activity-details-header">
                <h2 className="section-title">Activity details</h2>
                <button className="edit-link">Edit</button>
              </div>

              <div className="activity-details-card">
                <div className="activity-image-small">
                  <img src={galleryImages[0]} alt={activityData.title} />
                </div>
                <div className="activity-details-info">
                  <h3 className="activity-title-small">{activityData.title}</h3>
                  <div className="activity-booking-details">
                    <div className="booking-detail-item">
                      <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>{travelers} {travelers === 1 ? 'Adult' : 'Adults'}</span>
                    </div>
                    <div className="booking-detail-item">
                      <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{formatDateDisplay(selectedDate)} • {selectedTimeSlot}</span>
                    </div>
                    <div className="booking-detail-item">
                      <svg className="check-icon-green" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Free cancellation before {selectedTimeSlot} on {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                    </div>
                  </div>
                  <a href="#" className="operator-link">Details about the experience operator</a>
                </div>
              </div>

              {/* Primary Traveler */}
              <div className="primary-traveler-section">
                <h3 className="subsection-title">Primary traveler (Adult)</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="primaryFirstName">First name</label>
                    <input
                      type="text"
                      id="primaryFirstName"
                      name="primaryFirstName"
                      value={contactInfo.firstName}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="primaryLastName">Last name</label>
                    <input
                      type="text"
                      id="primaryLastName"
                      name="primaryLastName"
                      value={contactInfo.lastName}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                className="next-btn"
                onClick={() => handleNext(2)}
              >
                Next
              </button>
            </div>
          </section>
          )}

          {/* Section 3: Payment Details */}
          {activeSection >= 3 && (
          <section className="checkout-section">
            <div className="section-number">3</div>
            <div className="section-content">
              <h2 className="section-title">Payment details</h2>
              <p className="section-subtitle">Pay with</p>

              <div className="payment-methods">
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay-upi"
                    checked={paymentMethod === 'razorpay-upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-method-content">
                    <span className="payment-method-name">Razorpay UPI</span>
                    <div className="payment-logos">
                      <svg className="payment-logo" width="40" height="24" viewBox="0 0 40 24" fill="none">
                        <rect width="40" height="24" rx="4" fill="#4F46E5"/>
                        <text x="20" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">UPI</text>
                      </svg>
                    </div>
                  </div>
                  <div className="payment-security">
                    <svg className="lock-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Checkout</span>
                  </div>
                </label>
              </div>

              <div className="payment-disclaimer">
                <p>
                  You will be charged the total amount once your order is confirmed by the Operator. By clicking 'Book Now', you agree to Gatividhi's Customer Terms of Use and Privacy Statement, and you also agree to enter into a direct contract with the supplier of the experience as described on the listing page. You also consent to receive updates from Gatividhi, including inspirations, tips, and other information, from which you can unsubscribe at any time.
                </p>
              </div>

              <button type="submit" className="book-now-btn-checkout">
                <svg className="lock-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Book Now
              </button>
            </div>
          </section>
          )}
        </div>

        {/* Right Column - Booking Summary */}
        <div className="checkout-right">
          <div className="booking-summary-widget">
            <div className="summary-activity-image">
              <img src={galleryImages[0]} alt={activityData.title} />
            </div>
            <div className="summary-content">
              <h3 className="summary-activity-title">{activityData.title}</h3>
              
              <div className="summary-booking-details">
                <div className="summary-detail-item">
                  <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>{travelers} {travelers === 1 ? 'Adult' : 'Adults'}</span>
                </div>
                <div className="summary-detail-item">
                  <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{formatDateDisplay(selectedDate)} • {selectedTimeSlot}</span>
                </div>
                <div className="summary-price">
                  ₹{parseFloat(calculateTotalPrice()).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} for {travelers} {travelers === 1 ? 'Adult' : 'Adults'}
                </div>
                <div className="summary-detail-item">
                  <svg className="check-icon-green" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Free cancellation before {selectedTimeSlot} on {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                </div>
              </div>

              <div className="promo-code-section">
                <svg className="pencil-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <a href="#" className="promo-code-link">Enter Promo Code</a>
              </div>

              <div className="total-price-section">
                <span className="total-label">Total price (INR):</span>
                <span className="total-amount">₹{parseFloat(calculateTotalPrice()).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Book with Confidence Section */}
            <div className="confidence-section">
            
              <div className="confidence-rating">
              
             
                <svg className="trustpilot-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <p className="reviews-count">Based on 296,896 traveler reviews</p>

              <div className="confidence-feature">
                <h4 className="feature-title">Exceptional flexibility</h4>
                <p className="feature-description">Free cancellation and lowest price guarantee</p>
              </div>

              <div className="confidence-feature">
                <h4 className="feature-title">24/7 global support</h4>
                <p className="feature-description">Our award-winning customer service team is here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default UserCheckOut;

