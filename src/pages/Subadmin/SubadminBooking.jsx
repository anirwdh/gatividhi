import { useState, useEffect } from 'react';
import SubadminHeader from './SubadminHeader';
import SubadminFooter from './SubadminFooter';
import './SubadminBooking.css';

const SubadminBooking = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Any status');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock activities/tours list - will come from backend
  const activities = [
    { id: 1, name: 'Tour', type: 'category' },
    { id: 2, name: 'Activity', type: 'category' },
    { id: 3, name: 'Bungee Jumping', type: 'activity', category: 'Activity' },
    { id: 4, name: 'River Rafting', type: 'activity', category: 'Activity' },
    { id: 5, name: 'Rock Climbing', type: 'activity', category: 'Activity' },
    { id: 6, name: 'Paragliding', type: 'activity', category: 'Activity' },
    { id: 7, name: 'Skydiving', type: 'activity', category: 'Activity' },
    { id: 8, name: 'Ziplining', type: 'activity', category: 'Activity' },
    { id: 9, name: 'Hot Air Balloon', type: 'activity', category: 'Activity' },
    { id: 10, name: 'Scuba Diving', type: 'activity', category: 'Activity' },
    { id: 11, name: 'City Tour', type: 'activity', category: 'Tour' },
    { id: 12, name: 'Mountain Trek', type: 'activity', category: 'Tour' },
    { id: 13, name: 'Heritage Walk', type: 'activity', category: 'Tour' },
    { id: 14, name: 'Wildlife Safari', type: 'activity', category: 'Tour' },
    { id: 15, name: 'Beach Tour', type: 'activity', category: 'Tour' },
    { id: 16, name: 'Cultural Tour', type: 'activity', category: 'Tour' },
    { id: 17, name: 'Photography Tour', type: 'activity', category: 'Tour' },
    { id: 18, name: 'Food Tour', type: 'activity', category: 'Tour' },
  ];

  // Generate more booking data
  const generateBooking = (id, customerName, customerImg, email, phone, activityName, status, statusColor, total, date, travelers, selectedDate, timeSlot, price) => ({
    id: id.toString(),
    orderId: `#${id}`,
    customer: {
      name: customerName,
      avatar: `https://i.pravatar.cc/150?img=${customerImg}`,
      email: email,
      phone: phone
    },
    activityName: activityName,
    status: status,
    statusColor: statusColor,
    total: total,
    date: date,
    contactInfo: {
      firstName: customerName.split(' ')[0],
      lastName: customerName.split(' ')[1] || '',
      email: email,
      confirmEmail: email,
      phoneCountry: '+1',
      phoneNumber: phone.replace(/\D/g, '').slice(-10)
    },
    bookingDetails: {
      travelers: travelers,
      selectedDate: selectedDate,
      selectedTimeSlot: timeSlot,
      price: price
    }
  });

  // Mock bookings data - will come from backend
  const bookings = [
    generateBooking(390561, 'James Miller', 12, 'james.miller@example.com', '+1 (555) 123-4567', 'Bungee Jumping', 'Paid', 'paid', 1620.00, new Date('2024-01-08'), 2, new Date('2024-02-15'), '9:00 AM', 810.00),
    generateBooking(390562, 'Michelle Black', 47, 'michelle.black@example.com', '+1 (555) 234-5678', 'River Rafting', 'Delivered', 'delivered', 950.00, new Date('2024-01-10'), 2, new Date('2024-02-20'), '10:00 AM', 475.00),
    generateBooking(390563, 'Sarah Johnson', 45, 'sarah.johnson@example.com', '+1 (555) 345-6789', 'Bungee Jumping', 'Completed', 'completed', 1620.00, new Date('2024-01-12'), 2, new Date('2024-02-25'), '11:00 AM', 810.00),
    generateBooking(390564, 'Robert Wilson', 33, 'robert.wilson@example.com', '+1 (555) 456-7890', 'Rock Climbing', 'Paid', 'paid', 1200.00, new Date('2024-01-15'), 1, new Date('2024-03-01'), '8:00 AM', 1200.00),
    generateBooking(390565, 'Emily Davis', 25, 'emily.davis@example.com', '+1 (555) 567-8901', 'Paragliding', 'Paid', 'paid', 1450.00, new Date('2024-01-18'), 2, new Date('2024-03-05'), '2:00 PM', 725.00),
    generateBooking(390566, 'Michael Brown', 15, 'michael.brown@example.com', '+1 (555) 678-9012', 'City Tour', 'Delivered', 'delivered', 680.00, new Date('2024-01-20'), 3, new Date('2024-03-10'), '10:00 AM', 226.67),
    generateBooking(390567, 'Jessica Taylor', 28, 'jessica.taylor@example.com', '+1 (555) 789-0123', 'Mountain Trek', 'Completed', 'completed', 1890.00, new Date('2024-01-22'), 2, new Date('2024-03-15'), '7:00 AM', 945.00),
    generateBooking(390568, 'David Martinez', 18, 'david.martinez@example.com', '+1 (555) 890-1234', 'Skydiving', 'Paid', 'paid', 2100.00, new Date('2024-01-25'), 1, new Date('2024-03-20'), '11:00 AM', 2100.00),
    generateBooking(390569, 'Amanda White', 31, 'amanda.white@example.com', '+1 (555) 901-2345', 'Ziplining', 'Delivered', 'delivered', 1100.00, new Date('2024-01-28'), 4, new Date('2024-03-25'), '1:00 PM', 275.00),
    generateBooking(390570, 'Christopher Lee', 22, 'christopher.lee@example.com', '+1 (555) 012-3456', 'River Rafting', 'Paid', 'paid', 1425.00, new Date('2024-02-01'), 3, new Date('2024-04-01'), '9:00 AM', 475.00),
    generateBooking(390571, 'Jennifer Garcia', 38, 'jennifer.garcia@example.com', '+1 (555) 123-4568', 'Hot Air Balloon', 'Completed', 'completed', 1750.00, new Date('2024-02-03'), 2, new Date('2024-04-05'), '6:00 AM', 875.00),
    generateBooking(390572, 'Matthew Anderson', 29, 'matthew.anderson@example.com', '+1 (555) 234-5679', 'Scuba Diving', 'Paid', 'paid', 1950.00, new Date('2024-02-05'), 2, new Date('2024-04-10'), '8:00 AM', 975.00),
    generateBooking(390573, 'Lisa Thomas', 42, 'lisa.thomas@example.com', '+1 (555) 345-6780', 'Heritage Walk', 'Delivered', 'delivered', 850.00, new Date('2024-02-08'), 5, new Date('2024-04-12'), '10:00 AM', 170.00),
    generateBooking(390574, 'Daniel Jackson', 35, 'daniel.jackson@example.com', '+1 (555) 456-7891', 'Wildlife Safari', 'Paid', 'paid', 2200.00, new Date('2024-02-10'), 4, new Date('2024-04-15'), '5:00 AM', 550.00),
    generateBooking(390575, 'Ashley Harris', 27, 'ashley.harris@example.com', '+1 (555) 567-8902', 'Bungee Jumping', 'Completed', 'completed', 2430.00, new Date('2024-02-12'), 3, new Date('2024-04-20'), '3:00 PM', 810.00),
    generateBooking(390576, 'Ryan Clark', 19, 'ryan.clark@example.com', '+1 (555) 678-9013', 'Beach Tour', 'Delivered', 'delivered', 720.00, new Date('2024-02-15'), 6, new Date('2024-04-22'), '11:00 AM', 120.00),
    generateBooking(390577, 'Stephanie Lewis', 44, 'stephanie.lewis@example.com', '+1 (555) 789-0124', 'Cultural Tour', 'Paid', 'paid', 980.00, new Date('2024-02-18'), 4, new Date('2024-04-25'), '2:00 PM', 245.00),
    generateBooking(390578, 'Kevin Walker', 36, 'kevin.walker@example.com', '+1 (555) 890-1235', 'Photography Tour', 'Completed', 'completed', 1350.00, new Date('2024-02-20'), 2, new Date('2024-04-28'), '7:00 AM', 675.00),
    generateBooking(390579, 'Nicole Hall', 23, 'nicole.hall@example.com', '+1 (555) 901-2346', 'Food Tour', 'Paid', 'paid', 650.00, new Date('2024-02-22'), 2, new Date('2024-05-01'), '6:00 PM', 325.00),
    generateBooking(390580, 'Brandon Allen', 16, 'brandon.allen@example.com', '+1 (555) 012-3457', 'Rock Climbing', 'Delivered', 'delivered', 1800.00, new Date('2024-02-25'), 2, new Date('2024-05-05'), '9:00 AM', 900.00),
    generateBooking(390581, 'Rachel Young', 39, 'rachel.young@example.com', '+1 (555) 123-4569', 'Paragliding', 'Paid', 'paid', 2175.00, new Date('2024-02-28'), 3, new Date('2024-05-08'), '1:00 PM', 725.00),
    generateBooking(390582, 'Justin King', 41, 'justin.king@example.com', '+1 (555) 234-5680', 'City Tour', 'Completed', 'completed', 1020.00, new Date('2024-03-01'), 5, new Date('2024-05-10'), '10:00 AM', 204.00),
    generateBooking(390583, 'Megan Wright', 26, 'megan.wright@example.com', '+1 (555) 345-6791', 'Mountain Trek', 'Paid', 'paid', 2835.00, new Date('2024-03-03'), 3, new Date('2024-05-12'), '6:00 AM', 945.00),
    generateBooking(390584, 'Tyler Lopez', 20, 'tyler.lopez@example.com', '+1 (555) 456-7802', 'Skydiving', 'Delivered', 'delivered', 2100.00, new Date('2024-03-05'), 1, new Date('2024-05-15'), '10:00 AM', 2100.00),
    generateBooking(390585, 'Brittany Hill', 34, 'brittany.hill@example.com', '+1 (555) 567-8913', 'Ziplining', 'Paid', 'paid', 1375.00, new Date('2024-03-08'), 5, new Date('2024-05-18'), '2:00 PM', 275.00),
  ];

  const [filteredBookings, setFilteredBookings] = useState(bookings);

  // Filter bookings by selected activity, status, and search query
  useEffect(() => {
    let filtered = bookings;

    // Filter by activity
    if (selectedActivity && selectedActivity.type === 'activity') {
      filtered = filtered.filter(booking => 
        booking.activityName === selectedActivity.name
      );
    }

    // Filter by status
    if (filterStatus !== 'Any status') {
      filtered = filtered.filter(booking => 
        booking.status === filterStatus
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(booking => 
        booking.customer.name.toLowerCase().includes(query) ||
        booking.orderId.toLowerCase().includes(query) ||
        booking.activityName.toLowerCase().includes(query) ||
        booking.customer.email.toLowerCase().includes(query)
      );
    }

    setFilteredBookings(filtered);
  }, [selectedActivity, filterStatus, searchQuery]);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  // Format full date with time
  const formatFullDate = (date) => {
    if (!date) return '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setSelectedBooking(null); // Reset selected booking when switching activities
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseDetail = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="subadmin-booking-page">
      <SubadminHeader />
      
      <div className="booking-page-container">
        {/* Left Sidebar - Activities List */}
        <aside className="booking-sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-title">Listings</h2>
            <ul className="sidebar-list">
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className={`sidebar-item ${selectedActivity?.id === activity.id ? 'active' : ''}`}
                  onClick={() => handleActivityClick(activity)}
                >
                  <span className="sidebar-item-text">{activity.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Center Panel - Bookings Table */}
        <main className="booking-main">
          <div className="booking-header">
            <h1 className="booking-title">Bookings</h1>
            <div className="booking-header-actions">
              <div className="search-container">
                {showSearch && (
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name, order ID, activity..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                )}
                <button 
                  className="header-action-btn"
                  onClick={() => {
                    setShowSearch(!showSearch);
                    if (showSearch) {
                      setSearchQuery('');
                    }
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="booking-filters">
            <select 
              className="filter-select" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>Any status</option>
              <option>Paid</option>
              <option>Delivered</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Bookings Table */}
          <div className="bookings-table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Activity</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className={selectedBooking?.id === booking.id ? 'selected' : ''}
                    onClick={() => handleBookingClick(booking)}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="order-id">{booking.orderId}</td>
                    <td>
                      <div className="customer-cell">
                        <img src={booking.customer.avatar} alt={booking.customer.name} className="customer-avatar" />
                        <span className="customer-name">{booking.customer.name}</span>
                      </div>
                    </td>
                    <td className="activity-name">{booking.activityName}</td>
                    <td>
                      <span className={`status-badge status-${booking.statusColor}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="total-amount">${booking.total.toFixed(2)}</td>
                    <td className="booking-date">{formatDate(booking.date)}</td>
                    <td>
                      <button className="row-action-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Right Sidebar - Booking Details */}
        {selectedBooking && (
          <aside className="booking-detail-panel">
            <div className="detail-panel-header">
              <h2 className="detail-panel-title">Order {selectedBooking.orderId}</h2>
              <button className="close-detail-btn" onClick={handleCloseDetail}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="detail-panel-status">
              <span className={`status-badge status-${selectedBooking.statusColor}`}>
                {selectedBooking.status}
              </span>
              <span className="detail-date">{formatFullDate(selectedBooking.date)}</span>
            </div>

            {/* Customer Info */}
            <div className="customer-info-section">
              <div className="customer-avatar-large">
                <img src={selectedBooking.customer.avatar} alt={selectedBooking.customer.name} />
              </div>
              <h3 className="customer-name-large">{selectedBooking.customer.name}</h3>
              <a 
                href={`tel:${selectedBooking.contactInfo.phoneCountry}${selectedBooking.contactInfo.phoneNumber}`}
                className="call-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call {selectedBooking.contactInfo.phoneCountry} {selectedBooking.contactInfo.phoneNumber}
              </a>
            </div>

            {/* Order Details */}
            <div className="order-details-section">
              <h3 className="section-title">Order Details</h3>
              
              {/* Contact Information */}
              <div className="detail-subsection">
                <h4 className="subsection-title">Contact Information</h4>
                <div className="detail-info-grid">
                  <div className="detail-info-item">
                    <label>First Name</label>
                    <p>{selectedBooking.contactInfo.firstName}</p>
                  </div>
                  <div className="detail-info-item">
                    <label>Last Name</label>
                    <p>{selectedBooking.contactInfo.lastName}</p>
                  </div>
                  <div className="detail-info-item">
                    <label>Email</label>
                    <p>{selectedBooking.contactInfo.email}</p>
                  </div>
                  <div className="detail-info-item">
                    <label>Phone</label>
                    <p>{selectedBooking.contactInfo.phoneCountry} {selectedBooking.contactInfo.phoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div className="detail-subsection">
                <h4 className="subsection-title">Booking Information</h4>
                <div className="detail-info-grid">
                  <div className="detail-info-item">
                    <label>Activity</label>
                    <p>{selectedBooking.activityName}</p>
                  </div>
                  <div className="detail-info-item">
                    <label>Travelers</label>
                    <p>{selectedBooking.bookingDetails.travelers} {selectedBooking.bookingDetails.travelers === 1 ? 'Adult' : 'Adults'}</p>
                  </div>
                  <div className="detail-info-item">
                    <label>Date</label>
                    <p>{formatDate(selectedBooking.bookingDetails.selectedDate)}</p>
                  </div>
                  <div className="detail-info-item">
                    <label>Time</label>
                    <p>{selectedBooking.bookingDetails.selectedTimeSlot}</p>
                  </div>
                  <div className="detail-info-item">
                    <label>Price per Person</label>
                    <p>${selectedBooking.bookingDetails.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="detail-panel-footer">
              <div className="total-section">
                <span className="total-label">Total</span>
                <span className="total-amount">${selectedBooking.total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        )}
      </div>

      <SubadminFooter />
    </div>
  );
};

export default SubadminBooking;
