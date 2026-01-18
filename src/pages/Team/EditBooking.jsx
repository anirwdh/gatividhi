import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SubadminFooter from '../Subadmin/SubadminFooter';
import uh1 from '../../assets/images/uh1.jpg';
import uh2 from '../../assets/images/uh2.jpg';
import uh3 from '../../assets/images/uh3.jpg';
import './EditBooking.css';

const EditBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get booking details from navigation state
  const bookingData = location.state?.bookingData || {
    id: 1,
    customerName: 'John Smith',
    activity: 'Rome Colosseum Tour',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    amount: 4599,
    travelers: 2,
    contactInfo: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phoneCountry: '+91',
      phoneNumber: '9876543210'
    },
    activityData: {
      title: 'Rome Colosseum Skip-the-Line Tour',
      location: 'Rome, Italy',
      price: 4599,
      rating: 4.8,
      reviews: 2341,
      image: uh1
    },
    galleryImages: [uh1, uh2, uh3]
  };

  // Only allow editing date and time
  const [bookingDetails, setBookingDetails] = useState({
    selectedDate: bookingData.date ? new Date(bookingData.date) : new Date(),
    selectedTimeSlot: bookingData.time || '9:00 AM',
    status: bookingData.status || 'confirmed',
    specialRequests: bookingData.specialRequests || ''
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Calculate total price
  const calculateTotalPrice = () => {
    const price = bookingData.activityData?.price || 0;
    const travelers = bookingDetails.travelers || bookingData.travelers || 1;
    return (price * travelers).toFixed(2);
  };

  // Format date for display
  const formatDateDisplay = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle booking details changes
  const handleBookingDetailsChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  // Handle save changes
  const handleSave = () => {
    console.log('Saving booking changes:', {
      bookingDetails,
      bookingId: bookingData.id
    });
    
    // Here you would send the data to your API
    alert('Booking date and time updated successfully!');
    setHasChanges(false);
    navigate('/gatividhiteam');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  // Available time slots
  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <div className="edit-booking-screen">
      <div className="edit-booking-header">
        <button 
          className="back-to-bookings-btn"
          onClick={() => navigate('/gatividhiteam')}
        >
          ← Back to Bookings
        </button>
        <h1 className="edit-booking-title">Reschedule Booking - {bookingData.customerName}</h1>
        <div className="booking-id-display">Booking ID: #{bookingData.id.toString().padStart(4, '0')}</div>
      </div>
      
      <div className="edit-booking-container">
        {/* Left Column - Form Sections */}
        <div className="edit-booking-left">
          {/* Section 1: Contact Details */}
          <section className="edit-booking-section">
            <div className="section-number">1</div>
            <div className="section-content">
              <div className="section-header">
                <h2 className="section-title">Reschedule Booking</h2>
                <span className="edit-indicator">Team Edit Mode</span>
              </div>
              <p className="section-description">
                Adjust the date and time for customer convenience. Customer contact information cannot be modified.
              </p>

              {/* Customer Information (Read-only) */}
              <div className="customer-info-readonly">
                <h3 className="subsection-title">Customer Information</h3>
                <div className="customer-detail-grid">
                  <div className="customer-detail-item">
                    <span className="customer-label">Name:</span>
                    <span className="customer-value">{bookingData.contactInfo?.firstName || ''} {bookingData.contactInfo?.lastName || ''}</span>
                  </div>
                  <div className="customer-detail-item">
                    <span className="customer-label">Email:</span>
                    <span className="customer-value">{bookingData.contactInfo?.email || ''}</span>
                  </div>
                  <div className="customer-detail-item">
                    <span className="customer-label">Phone:</span>
                    <span className="customer-value">{bookingData.contactInfo?.phoneCountry || ''} {bookingData.contactInfo?.phoneNumber || ''}</span>
                  </div>
                  <div className="customer-detail-item">
                    <span className="customer-label">Travelers:</span>
                    <span className="customer-value">{bookingData.travelers || 1} {bookingData.travelers === 1 ? 'Adult' : 'Adults'}</span>
                  </div>
                </div>
              </div>

              {/* Activity Details */}
              <div className="activity-details-card">
                <div className="activity-image-small">
                  <img src={bookingData.galleryImages?.[0] || uh1} alt={bookingData.activityData?.title} />
                </div>
                <div className="activity-details-info">
                  <h3 className="activity-title-small">{bookingData.activityData?.title}</h3>
                  <div className="activity-booking-details">
                    <div className="booking-detail-item">
                      <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>{bookingData.travelers || 1} {(bookingData.travelers || 1) === 1 ? 'Adult' : 'Adults'}</span>
                    </div>
                    <div className="booking-detail-item">
                      <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{formatDateDisplay(bookingDetails.selectedDate)} • {bookingDetails.selectedTimeSlot}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editable Booking Details */}
              <div className="booking-details-edit-section">
                <h3 className="subsection-title">Reschedule Details</h3>
                
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="bookingDate">New Booking Date</label>
                    <input
                      type="date"
                      id="bookingDate"
                      value={bookingDetails.selectedDate.toISOString().split('T')[0]}
                      onChange={(e) => handleBookingDetailsChange('selectedDate', new Date(e.target.value))}
                      className="team-edit-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="form-field">
                    <label htmlFor="timeSlot">New Time Slot</label>
                    <select
                      id="timeSlot"
                      value={bookingDetails.selectedTimeSlot}
                      onChange={(e) => handleBookingDetailsChange('selectedTimeSlot', e.target.value)}
                      className="team-edit-input"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="specialRequests">Reschedule Notes (Optional)</label>
                  <textarea
                    id="specialRequests"
                    value={bookingDetails.specialRequests}
                    onChange={(e) => handleBookingDetailsChange('specialRequests', e.target.value)}
                    className="team-edit-input"
                    rows="3"
                    placeholder="Notes about the reschedule (e.g., customer requested morning slot, special requirements...)"
                  />
                </div>
              </div>

              <div className="team-edit-actions">
                <button 
                  type="button" 
                  className="cancel-edit-btn"
                  onClick={() => navigate('/gatividhiteam')}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="save-changes-btn"
                  onClick={handleSave}
                  disabled={!hasChanges}
                >
                  Update Booking
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="edit-booking-right">
          <div className="booking-summary-widget">
            <div className="summary-activity-image">
              <img src={bookingData.galleryImages?.[0] || uh1} alt={bookingData.activityData?.title} />
            </div>
            <div className="summary-content">
              <h3 className="summary-activity-title">{bookingData.activityData?.title}</h3>
              
              <div className="summary-booking-details">
                <div className="summary-detail-item">
                  <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>{bookingData.travelers || 1} {(bookingData.travelers || 1) === 1 ? 'Adult' : 'Adults'}</span>
                </div>
                <div className="summary-detail-item">
                  <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{formatDateDisplay(bookingDetails.selectedDate)} • {bookingDetails.selectedTimeSlot}</span>
                </div>
                <div className="summary-detail-item">
                  <span className={`status-badge status-${bookingDetails.status}`}>
                    {bookingDetails.status.charAt(0).toUpperCase() + bookingDetails.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="summary-price">
                ₹{parseFloat(calculateTotalPrice()).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} for {bookingData.travelers || 1} {(bookingData.travelers || 1) === 1 ? 'Adult' : 'Adults'}
              </div>

              <div className="total-price-section">
                <span className="total-label">Total price (INR):</span>
                <span className="total-amount">₹{parseFloat(calculateTotalPrice()).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Customer Information Summary */}
            <div className="customer-info-summary">
              <h4 className="customer-info-title">Customer Information</h4>
              <div className="customer-detail">
                <span className="customer-label">Name:</span>
                <span className="customer-value">{bookingData.contactInfo?.firstName || ''} {bookingData.contactInfo?.lastName || ''}</span>
              </div>
              <div className="customer-detail">
                <span className="customer-label">Email:</span>
                <span className="customer-value">{bookingData.contactInfo?.email || ''}</span>
              </div>
              <div className="customer-detail">
                <span className="customer-label">Phone:</span>
                <span className="customer-value">{bookingData.contactInfo?.phoneCountry || ''} {bookingData.contactInfo?.phoneNumber || ''}</span>
              </div>
            </div>

            {/* Team Actions */}
            <div className="team-actions-section">
              <h4 className="team-actions-title">Team Actions</h4>
              <button className="team-action-btn contact-customer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact Customer
              </button>
              <button className="team-action-btn send-reminder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Send Reminder
              </button>
              <button className="team-action-btn cancel-booking">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      <SubadminFooter />
    </div>
  );
};

export default EditBooking;