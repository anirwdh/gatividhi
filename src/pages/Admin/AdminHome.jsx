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
import './AdminHome.css';

const AdminHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('listings');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [createSubadminData, setCreateSubadminData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [createSubadminErrors, setCreateSubadminErrors] = useState({});
  const [subadmins] = useState([
    { id: 1, name: 'Saurabh Sharma', phone: '+91 9876543210', email: 'saurabh@example.com' },
    { id: 2, name: 'Ankit Verma', phone: '+91 9876501234', email: 'ankit@example.com' },
    { id: 3, name: 'Priya Singh', phone: '+91 9876123450', email: 'priya@example.com' },
    { id: 4, name: 'Rahul Mehta', phone: '+91 9812345678', email: 'rahul@example.com' },
    { id: 5, name: 'Neha Gupta', phone: '+91 9823456789', email: 'neha@example.com' },
    { id: 6, name: 'Amit Yadav', phone: '+91 9834567890', email: 'amit@example.com' },
    { id: 7, name: 'Kriti Jain', phone: '+91 9845678901', email: 'kriti@example.com' },
    { id: 8, name: 'Vikas Rao', phone: '+91 9856789012', email: 'vikas@example.com' },
    { id: 9, name: 'Rohan Patel', phone: '+91 9867890123', email: 'rohan@example.com' },
    { id: 10, name: 'Simran Kaur', phone: '+91 9878901234', email: 'simran@example.com' },
    { id: 11, name: 'Arjun Malhotra', phone: '+91 9889012345', email: 'arjun@example.com' },
    { id: 12, name: 'Pooja Nair', phone: '+91 9890123456', email: 'pooja@example.com' }
  ]);
  const [currentSubadminPage, setCurrentSubadminPage] = useState(1);
  const subadminsPerPage = 6;
  const [adminListingsPage, setAdminListingsPage] = useState(1);
  const adminListingsPerPage = 12;
  const [adminSortBy, setAdminSortBy] = useState('Featured');
  const [selectedPaymentActivity, setSelectedPaymentActivity] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentFilterStatus, setPaymentFilterStatus] = useState('Any status');
  const [paymentShowSearch, setPaymentShowSearch] = useState(false);
  const [paymentSearchQuery, setPaymentSearchQuery] = useState('');
  const [listingRequests, setListingRequests] = useState([
    { id: 101, title: 'Rishikesh River Rafting Adventure', image: uh1, subadminName: 'Saurabh Sharma' },
    { id: 102, title: 'Manali Snow Trek Experience', image: uh2, subadminName: 'Ankit Verma' },
    { id: 103, title: 'Shimla Mountain View Stay', image: uh3, subadminName: 'Priya Singh' }
  ]);
  const [approvedListings, setApprovedListings] = useState([]);
  const adminListingCards = [
    { id: 1, title: "Vatican Museums, Sistine Chapel & St Peter's Basilica Guided Tour", location: 'Rome, Italy', rating: 4.5, reviews: 38926, price: 3785, duration: '3 hours', image: uh1, bestSeller: true, freeCancellation: true },
    { id: 2, title: 'Colosseum Arena Floor, Roman Forum and Palatine Hill Guided Tour', location: 'Rome, Italy', rating: 4.4, reviews: 7270, price: 6921, duration: '2 hours 30 minutes', image: uh2, freeCancellation: true },
    { id: 3, title: 'Skip-the-Line Group Tour of the Vatican, Sistine Chapel & St. Peter\'s Basilica', location: 'Rome, Italy', rating: 4.6, reviews: 12498, price: 5299, duration: '3 hours', image: uh3, freeCancellation: true },
    { id: 4, title: 'Vatican Museums, Sistine Chapel & St. Peters Basilica Guided Tour', location: 'Rome, Italy', rating: 4.5, reviews: 182, price: 11353, duration: '3 hours', image: uh1, freeCancellation: true },
    { id: 5, title: 'Rome: Colosseum, Roman Forum, and Palatine Hill Guided Tour', location: 'Rome, Italy', rating: 4.5, reviews: 8781, price: 4521, duration: '2 hours 30 minutes', image: uh2, likelyToSellOut: true, freeCancellation: true },
    { id: 6, title: 'Vatican Museums and Sistine Chapel Skip-the-Line Tickets', location: 'Rome, Italy', rating: 4.3, reviews: 75, price: 3899, duration: '2 hours', image: uh3, likelyToSellOut: true, freeCancellation: true },
    { id: 7, title: 'Colosseum Underground & Ancient Rome', location: 'Rome, Italy', rating: 4.7, reviews: 3456, price: 7899, duration: '3 hours', image: uh1, likelyToSellOut: true, freeCancellation: true },
    { id: 8, title: 'Rome by Golf Cart Private Tour: Beyond the Landmarks', location: 'Rome, Italy', rating: 5, reviews: 4312, price: 12499, duration: '4 hours', image: uh2, freeCancellation: true },
    { id: 9, title: 'Trevi Fountain, Pantheon & Spanish Steps Walking Tour', location: 'Rome, Italy', rating: 4.6, reviews: 5678, price: 2499, duration: '2 hours', image: uh3, freeCancellation: true },
    { id: 10, title: 'Rome Food Tour: Trastevere Neighborhood', location: 'Rome, Italy', rating: 4.8, reviews: 2341, price: 3299, duration: '3 hours 30 minutes', image: uh1, freeCancellation: true },
    { id: 11, title: 'Vatican Early Access Tour with Sistine Chapel', location: 'Rome, Italy', rating: 4.7, reviews: 8923, price: 6899, duration: '3 hours', image: uh2, bestSeller: true, freeCancellation: true },
    { id: 12, title: 'Rome Catacombs and Appian Way Tour', location: 'Rome, Italy', rating: 4.5, reviews: 1234, price: 4599, duration: '3 hours', image: uh3, freeCancellation: true },
    { id: 13, title: 'Rome Night Tour: Colosseum and Ancient City', location: 'Rome, Italy', rating: 4.6, reviews: 3456, price: 5499, duration: '2 hours 30 minutes', image: uh1, freeCancellation: true },
    { id: 14, title: 'Pompeii Day Trip from Rome with Mount Vesuvius', location: 'Rome, Italy', rating: 4.8, reviews: 5678, price: 8999, duration: '12 hours', image: uh2, bestSeller: true, freeCancellation: true },
    { id: 15, title: "Tivoli Gardens and Villa d'Este Day Trip", location: 'Rome, Italy', rating: 4.4, reviews: 2345, price: 6799, duration: '6 hours', image: uh3, freeCancellation: true },
    { id: 16, title: 'Rome Segway Tour: Ancient City Highlights', location: 'Rome, Italy', rating: 4.7, reviews: 4567, price: 4299, duration: '3 hours', image: uh1, freeCancellation: true },
    { id: 17, title: 'Ostia Antica Archaeological Site Tour', location: 'Rome, Italy', rating: 4.5, reviews: 1234, price: 3499, duration: '4 hours', image: uh2, freeCancellation: true },
    { id: 18, title: 'Rome Cooking Class: Pasta and Tiramisu Making', location: 'Rome, Italy', rating: 4.9, reviews: 7890, price: 5999, duration: '4 hours', image: uh3, bestSeller: true, freeCancellation: true },
    { id: 19, title: 'Rome Bike Tour: Appian Way and Catacombs', location: 'Rome, Italy', rating: 4.6, reviews: 3456, price: 4799, duration: '4 hours', image: uh1, freeCancellation: true },
    { id: 20, title: 'Vatican Gardens Tour with Skip-the-Line Access', location: 'Rome, Italy', rating: 4.7, reviews: 2345, price: 6499, duration: '2 hours', image: uh2, freeCancellation: true },
    { id: 21, title: 'Rome Sunset Walking Tour with Aperitivo', location: 'Rome, Italy', rating: 4.8, reviews: 5678, price: 3799, duration: '3 hours', image: uh3, freeCancellation: true },
    { id: 22, title: 'Roman Gladiator School Experience', location: 'Rome, Italy', rating: 4.5, reviews: 1234, price: 5299, duration: '2 hours', image: uh1, freeCancellation: true },
    { id: 23, title: 'Rome Photography Tour: Best Instagram Spots', location: 'Rome, Italy', rating: 4.6, reviews: 3456, price: 4499, duration: '3 hours', image: uh2, freeCancellation: true },
    { id: 24, title: 'Rome Wine Tasting Tour in Trastevere', location: 'Rome, Italy', rating: 4.7, reviews: 4567, price: 5999, duration: '3 hours', image: uh3, freeCancellation: true },
    { id: 25, title: 'Rome Helicopter Tour: Aerial City Views', location: 'Rome, Italy', rating: 5, reviews: 234, price: 24999, duration: '30 minutes', image: uh1, freeCancellation: true },
    { id: 26, title: 'Rome Street Art and Graffiti Tour', location: 'Rome, Italy', rating: 4.4, reviews: 1234, price: 2999, duration: '2 hours', image: uh2, freeCancellation: true },
    { id: 27, title: 'Rome Jewish Ghetto and Synagogue Tour', location: 'Rome, Italy', rating: 4.6, reviews: 2345, price: 3999, duration: '2 hours 30 minutes', image: uh3, freeCancellation: true },
    { id: 28, title: 'Rome Ghost Tour: Haunted Places and Legends', location: 'Rome, Italy', rating: 4.5, reviews: 3456, price: 3499, duration: '2 hours', image: uh1, freeCancellation: true },
    { id: 29, title: 'Rome Vespa Tour: Classic City Experience', location: 'Rome, Italy', rating: 4.8, reviews: 5678, price: 7999, duration: '3 hours', image: uh2, bestSeller: true, freeCancellation: true },
    { id: 30, title: 'Rome Art Gallery and Museum Tour', location: 'Rome, Italy', rating: 4.7, reviews: 4567, price: 5499, duration: '4 hours', image: uh3, freeCancellation: true },
    { id: 31, title: 'Rome River Cruise: Tiber River Experience', location: 'Rome, Italy', rating: 4.5, reviews: 2345, price: 4299, duration: '1 hour 30 minutes', image: uh1, freeCancellation: true },
    { id: 32, title: 'Rome Shopping Tour: Designer Outlets', location: 'Rome, Italy', rating: 4.4, reviews: 1234, price: 3499, duration: '4 hours', image: uh2, freeCancellation: true },
    { id: 33, title: 'Rome Architecture Tour: Modern and Ancient', location: 'Rome, Italy', rating: 4.6, reviews: 3456, price: 4799, duration: '3 hours', image: uh3, freeCancellation: true },
    { id: 34, title: 'Rome Family Tour: Kid-Friendly Activities', location: 'Rome, Italy', rating: 4.8, reviews: 5678, price: 5999, duration: '4 hours', image: uh1, freeCancellation: true },
    { id: 35, title: 'Rome Opera and Classical Music Tour', location: 'Rome, Italy', rating: 4.7, reviews: 2345, price: 6999, duration: '3 hours', image: uh2, freeCancellation: true },
    { id: 36, title: 'Rome Day Trip: Florence by High-Speed Train', location: 'Rome, Italy', rating: 4.9, reviews: 7890, price: 12999, duration: '12 hours', image: uh3, bestSeller: true, freeCancellation: true }
  ];
  const paymentActivities = [
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
    { id: 18, name: 'Food Tour', type: 'activity', category: 'Tour' }
  ];
  const generatePayment = (id, customerName, customerImg, email, phone, activityName, status, statusColor, total, date, travelers, selectedDate, timeSlot, price, subadminOwner) => ({
    id: id.toString(),
    orderId: `#${id}`,
    customer: {
      name: customerName,
      avatar: `https://i.pravatar.cc/150?img=${customerImg}`,
      email,
      phone
    },
    activityName,
    status,
    statusColor,
    total,
    date,
    contactInfo: {
      firstName: customerName.split(' ')[0],
      lastName: customerName.split(' ')[1] || '',
      email,
      confirmEmail: email,
      phoneCountry: '+1',
      phoneNumber: phone.replace(/\D/g, '').slice(-10)
    },
    bookingDetails: {
      travelers,
      selectedDate,
      selectedTimeSlot: timeSlot,
      price
    },
    subadminOwner
  });
  const payments = [
    generatePayment(590561, 'James Miller', 12, 'james.miller@example.com', '+1 (555) 123-4567', 'Bungee Jumping', 'Paid', 'paid', 1620.0, new Date('2024-01-08'), 2, new Date('2024-02-15'), '9:00 AM', 810.0, 'Saurabh Sharma'),
    generatePayment(590562, 'Michelle Black', 47, 'michelle.black@example.com', '+1 (555) 234-5678', 'River Rafting', 'Paid', 'paid', 950.0, new Date('2024-01-10'), 2, new Date('2024-02-20'), '10:00 AM', 475.0, 'Ankit Verma'),
    generatePayment(590563, 'Sarah Johnson', 45, 'sarah.johnson@example.com', '+1 (555) 345-6789', 'Bungee Jumping', 'Completed', 'completed', 1620.0, new Date('2024-01-12'), 2, new Date('2024-02-25'), '11:00 AM', 810.0, 'Priya Singh'),
    generatePayment(590564, 'Robert Wilson', 33, 'robert.wilson@example.com', '+1 (555) 456-7890', 'Rock Climbing', 'Paid', 'paid', 1200.0, new Date('2024-01-15'), 1, new Date('2024-03-01'), '8:00 AM', 1200.0, 'Rahul Mehta'),
    generatePayment(590565, 'Emily Davis', 25, 'emily.davis@example.com', '+1 (555) 567-8901', 'Paragliding', 'Paid', 'paid', 1450.0, new Date('2024-01-18'), 2, new Date('2024-03-05'), '2:00 PM', 725.0, 'Neha Gupta'),
    generatePayment(590566, 'Michael Brown', 15, 'michael.brown@example.com', '+1 (555) 678-9012', 'City Tour', 'Paid', 'paid', 680.0, new Date('2024-01-20'), 3, new Date('2024-03-10'), '10:00 AM', 226.67, 'Amit Yadav'),
    generatePayment(590567, 'Jessica Taylor', 28, 'jessica.taylor@example.com', '+1 (555) 789-0123', 'Mountain Trek', 'Completed', 'completed', 1890.0, new Date('2024-01-22'), 2, new Date('2024-03-15'), '7:00 AM', 945.0, 'Kriti Jain'),
    generatePayment(590568, 'David Martinez', 18, 'david.martinez@example.com', '+1 (555) 890-1234', 'Skydiving', 'Paid', 'paid', 2100.0, new Date('2024-01-25'), 1, new Date('2024-03-20'), '11:00 AM', 2100.0, 'Vikas Rao'),
    generatePayment(590569, 'Amanda White', 31, 'amanda.white@example.com', '+1 (555) 901-2345', 'Ziplining', 'Paid', 'paid', 1100.0, new Date('2024-01-28'), 4, new Date('2024-03-25'), '1:00 PM', 275.0, 'Rohan Patel'),
    generatePayment(590570, 'Christopher Lee', 22, 'christopher.lee@example.com', '+1 (555) 012-3456', 'River Rafting', 'Paid', 'paid', 1425.0, new Date('2024-02-01'), 3, new Date('2024-04-01'), '9:00 AM', 475.0, 'Simran Kaur')
  ];
  const [filteredPayments, setFilteredPayments] = useState(payments);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const handleAcceptRequest = (request) => {
    setApprovedListings(prev => [...prev, request]);
    setListingRequests(prev => prev.filter(r => r.id !== request.id));
  };

  const handleRejectRequest = (request) => {
    setListingRequests(prev => prev.filter(r => r.id !== request.id));
  };

  const handleCreateSubadminChange = (e) => {
    const { name, value } = e.target;
    setCreateSubadminData(prev => ({
      ...prev,
      [name]: value
    }));
    if (createSubadminErrors[name]) {
      setCreateSubadminErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  useEffect(() => {
    let filtered = payments;
    if (selectedPaymentActivity && selectedPaymentActivity.type === 'activity') {
      filtered = filtered.filter(p => p.activityName === selectedPaymentActivity.name);
    }
    if (paymentFilterStatus !== 'Any status') {
      filtered = filtered.filter(p => p.status === paymentFilterStatus);
    }
    if (paymentSearchQuery.trim() !== '') {
      const query = paymentSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.customer.name.toLowerCase().includes(query) ||
        p.orderId.toLowerCase().includes(query) ||
        p.activityName.toLowerCase().includes(query) ||
        p.customer.email.toLowerCase().includes(query) ||
        p.subadminOwner.toLowerCase().includes(query)
      );
    }
    setFilteredPayments(filtered);
  }, [selectedPaymentActivity, paymentFilterStatus, paymentSearchQuery]);

  const formatDate = (date) => {
    if (!date) return '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const formatFullDate = (date) => {
    if (!date) return '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const handlePaymentActivityClick = (activity) => {
    setSelectedPaymentActivity(activity);
    setSelectedPayment(null);
  };

  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment);
  };

  const handleClosePaymentDetail = () => {
    setSelectedPayment(null);
  };

  const handleAdminListingsPageChange = (page) => {
    setAdminListingsPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminListingsPrevPage = () => {
    if (adminListingsPage > 1) {
      handleAdminListingsPageChange(adminListingsPage - 1);
    }
  };

  const handleAdminListingsNextPage = () => {
    const totalAdminListingPages = Math.ceil(adminListingCards.length / adminListingsPerPage);
    if (adminListingsPage < totalAdminListingPages) {
      handleAdminListingsPageChange(adminListingsPage + 1);
    }
  };

  const getAdminListingPageNumbers = () => {
    const pages = [];
    const totalAdminListingPages = Math.ceil(adminListingCards.length / adminListingsPerPage);
    const maxVisiblePages = 7;

    if (totalAdminListingPages <= maxVisiblePages) {
      for (let i = 1; i <= totalAdminListingPages; i += 1) {
        pages.push(i);
      }
    } else if (adminListingsPage <= 4) {
      for (let i = 1; i <= 5; i += 1) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalAdminListingPages);
    } else if (adminListingsPage >= totalAdminListingPages - 3) {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = totalAdminListingPages - 4; i <= totalAdminListingPages; i += 1) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = adminListingsPage - 1; i <= adminListingsPage + 1; i += 1) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalAdminListingPages);
    }

    return pages;
  };

  const validateCreateSubadmin = () => {
    const errors = {};

    if (!createSubadminData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!createSubadminData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{7,15}$/.test(createSubadminData.phone.trim())) {
      errors.phone = 'Enter a valid phone number';
    }

    if (!createSubadminData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createSubadminData.email.trim())) {
      errors.email = 'Enter a valid email address';
    }

    if (!createSubadminData.password.trim()) {
      errors.password = 'Password is required';
    } else if (createSubadminData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setCreateSubadminErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubadminSubmit = (e) => {
    e.preventDefault();
    const isValid = validateCreateSubadmin();
    if (isValid) {
      console.log('Create subadmin:', createSubadminData);
      setCreateSubadminData({
        name: '',
        phone: '',
        email: '',
        password: ''
      });
    }
  };

  const totalSubadminPages = Math.ceil(subadmins.length / subadminsPerPage);
  const paginatedSubadmins = subadmins.slice(
    (currentSubadminPage - 1) * subadminsPerPage,
    currentSubadminPage * subadminsPerPage
  );
  const totalAdminListingPages = Math.ceil(adminListingCards.length / adminListingsPerPage);
  const adminListingsStartIndex = (adminListingsPage - 1) * adminListingsPerPage;
  const adminListingsEndIndex = adminListingsStartIndex + adminListingsPerPage;
  const adminListingPageCards = adminListingCards.slice(adminListingsStartIndex, adminListingsEndIndex);

  return (
    <div className="subadmin-dashboard-wrapper">
      <div className="subadmin-home">
        <main className="subadmin-main-content">
          <div
            className="subadmin-content-container"
            style={activeSection === 'payments' && selectedPayment ? { gridTemplateColumns: '1fr' } : undefined}
          >
            {!(activeSection === 'payments' && selectedPayment) && (
            <aside className={`form-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <div className="sidebar-content">
                <h3 className="sidebar-title">Admin Panel</h3>
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
                    className={`sidebar-nav-item ${activeSection === 'createSubadmin' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('createSubadmin')}
                  >
                    <span className="nav-item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                      </svg>
                    </span>
                    <span className="nav-item-text">Create Subadmin</span>
                  </button>
                  <button
                    type="button"
                    className={`sidebar-nav-item ${activeSection === 'listingRequests' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('listingRequests')}
                  >
                    <span className="nav-item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7h18"></path>
                        <path d="M3 12h18"></path>
                        <path d="M3 17h18"></path>
                      </svg>
                    </span>
                    <span className="nav-item-text">Listings Requests</span>
                  </button>
                  <button
                    type="button"
                    className={`sidebar-nav-item ${activeSection === 'payments' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('payments')}
                  >
                    <span className="nav-item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                        <circle cx="8" cy="15" r="1.5"></circle>
                        <circle cx="16" cy="15" r="1.5"></circle>
                      </svg>
                    </span>
                    <span className="nav-item-text">Payments</span>
                  </button>
                  <button
                    type="button"
                    className={`sidebar-nav-item ${activeSection === 'subadmins' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('subadmins')}
                  >
                    <span className="nav-item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <span className="nav-item-text">SubAdmins</span>
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
            )}

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
                <h1 className="mobile-title">Admin Dashboard</h1>
              </div>
              
              <div className="form-header">
                <h1 className="form-main-title">Admin Dashboard</h1>
                <h2 className="form-sub-title">
                  Manage SubAdmins, Listings and Payments
                </h2>
              </div>

              <div className="create-activity-form">
                {activeSection === 'subadmins' && (
                  <section className="form-section">
                    <h2 className="form-section-title">SubAdmins</h2>
                    <p className="form-section-subtitle">
                      View and manage all registered subadmins.
                    </p>
                    <div className="booking-header">
                      <h1 className="booking-title">Subadmin List</h1>
                    </div>
                    <div className="bookings-table-container">
                      <table className="bookings-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedSubadmins.map((subadmin) => (
                            <tr
                              key={subadmin.id}
                              onClick={() => navigate(`/admin/subadmin/${subadmin.id}/packages`, { state: { subadmin } })}
                              style={{ cursor: 'pointer' }}
                            >
                              <td className="activity-name">{subadmin.name}</td>
                              <td className="booking-date">{subadmin.phone}</td>
                              <td className="order-id">{subadmin.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {totalSubadminPages > 1 && (
                      <div className="booking-filters">
                        <div className="pagination-controls">
                          <button
                            type="button"
                            className="header-action-btn"
                            disabled={currentSubadminPage === 1}
                            onClick={() => setCurrentSubadminPage((prev) => Math.max(prev - 1, 1))}
                          >
                            Prev
                          </button>
                          <span className="pagination-info">
                            Page {currentSubadminPage} of {totalSubadminPages}
                          </span>
                          <button
                            type="button"
                            className="header-action-btn"
                            disabled={currentSubadminPage === totalSubadminPages}
                            onClick={() =>
                              setCurrentSubadminPage((prev) =>
                                Math.min(prev + 1, totalSubadminPages)
                              )
                            }
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {activeSection === 'listings' && (
                  <section className="form-section">
                    <h2 className="form-section-title">Listings</h2>
                    <p className="form-section-subtitle">
                      Monitor and control all activity listings across subadmins.
                    </p>
                    <div className="results-header">
                      <div className="results-count">
                        {adminListingCards.length}+ results
                      </div>
                      <div className="sort-dropdown">
                        <label>Sort by:</label>
                        <select
                          value={adminSortBy}
                          onChange={(e) => {
                            setAdminSortBy(e.target.value);
                            setAdminListingsPage(1);
                          }}
                        >
                          <option>Featured</option>
                          <option>Price: Low to High</option>
                          <option>Price: High to Low</option>
                          <option>Rating</option>
                          <option>Duration</option>
                        </select>
                      </div>
                    </div>

                    <div className="tour-cards-grid">
                      {adminListingPageCards.map((card) => (
                        <div
                          key={card.id}
                          className="activity-card"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            const normalizedListing = {
                              ...card,
                              images: card.image ? [card.image] : [],
                              dateOptions: card.dateOptions || { everyday: false, everyWeekend: false },
                              contactInfo: card.contactInfo || { email: '', phone: '', website: '' },
                              itinerary: Array.isArray(card.itinerary) ? card.itinerary : [],
                              timeSlots: Array.isArray(card.timeSlots) ? card.timeSlots : []
                            };
                            navigate('/admin/listing-detail', { 
                              state: { 
                                listingData: normalizedListing,
                                backPath: '/admin' 
                              } 
                            });
                          }}
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
                                type="button"
                                className="heart-icon"
                                aria-label="Save"
                                onClick={(e) => {
                                  e.stopPropagation();
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
                              <span className="price-text">
                                from ₹
                                {card.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {totalAdminListingPages > 1 && (
                      <div className="pagination-container">
                        <div className="pagination">
                          <button
                            type="button"
                            className="pagination-btn prev-btn"
                            onClick={handleAdminListingsPrevPage}
                            disabled={adminListingsPage === 1}
                            aria-label="Previous page"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Previous
                          </button>

                          <div className="pagination-numbers">
                            {getAdminListingPageNumbers().map((page, index) => {
                              if (page === 'ellipsis') {
                                return (
                                  <span
                                    key={`admin-ellipsis-${index}`}
                                    className="pagination-ellipsis"
                                  >
                                    ...
                                  </span>
                                );
                              }

                              return (
                                <button
                                  type="button"
                                  key={page}
                                  className={`pagination-number ${
                                    adminListingsPage === page ? 'active' : ''
                                  }`}
                                  onClick={() => handleAdminListingsPageChange(page)}
                                  aria-label={`Go to page ${page}`}
                                  aria-current={adminListingsPage === page ? 'page' : undefined}
                                >
                                  {page}
                                </button>
                              );
                            })}
                          </div>

                          <button
                            type="button"
                            className="pagination-btn next-btn"
                            onClick={handleAdminListingsNextPage}
                            disabled={adminListingsPage === totalAdminListingPages}
                            aria-label="Next page"
                          >
                            Next
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {activeSection === 'listingRequests' && (
                  <section className="form-section">
                    <h2 className="form-section-title">Listings Requests</h2>
                    <p className="form-section-subtitle">
                      Review new listings submitted by subadmins.
                    </p>
                    <div className="listings-container">
                      <div className="listings-scroll">
                        {listingRequests.length > 0 ? (
                          listingRequests.map((req) => (
                            <div
                              key={req.id}
                              className="listing-card tour-card"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                const normalizedListing = {
                                  ...req,
                                  images: req.image ? [req.image] : [],
                                  dateOptions: req.dateOptions || { everyday: false, everyWeekend: false },
                                  contactInfo: req.contactInfo || { email: '', phone: '', website: '' },
                                  itinerary: Array.isArray(req.itinerary) ? req.itinerary : [],
                                  timeSlots: Array.isArray(req.timeSlots) ? req.timeSlots : []
                                };
                                navigate('/admin/listing-detail', { 
                                  state: { 
                                    listingData: normalizedListing,
                                    backPath: '/admin' 
                                  } 
                                });
                              }}
                            >
                              <div className="tour-card-image-wrapper">
                                <div
                                  className="tour-card-image"
                                  style={{ backgroundImage: `url(${req.image})` }}
                                ></div>
                              </div>
                              <div className="tour-card-content listing-card-content">
                                <p className="tour-location">Submitted by {req.subadminName}</p>
                                <h3 className="tour-title listing-title">{req.title}</h3>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                  <button
                                    className="submit-btn"
                                    onClick={() => handleAcceptRequest(req)}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className="header-action-btn"
                                    onClick={() => handleRejectRequest(req)}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="empty-listings">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <p className="empty-message">No listing requests</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {activeSection === 'payments' && (
                  <section className="form-section">
                    <h2 className="form-section-title">Payments</h2>
                    <p className="form-section-subtitle">
                      Track payouts, earnings and payment history.
                    </p>
                    <div
                      className="booking-page-container"
                      style={{ overflowX: 'auto', overflowY: 'hidden', width: '100%' }}
                    >
                      <main className="booking-main">
                        <div className="booking-header">
                          <h1 className="booking-title">Payments</h1>
                          <div className="booking-header-actions">
                            <div className="search-container">
                              {paymentShowSearch && (
                                <input
                                  type="text"
                                  className="search-input"
                                  placeholder="Search by name, order ID, activity..."
                                  value={paymentSearchQuery}
                                  onChange={(e) => setPaymentSearchQuery(e.target.value)}
                                  autoFocus
                                />
                              )}
                              <button
                                className="header-action-btn"
                                onClick={() => {
                                  setPaymentShowSearch(!paymentShowSearch);
                                  if (paymentShowSearch) {
                                    setPaymentSearchQuery('');
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

                        <div className="booking-filters">
                          <select
                            className="filter-select"
                            value={paymentFilterStatus}
                            onChange={(e) => setPaymentFilterStatus(e.target.value)}
                          >
                            <option>Any status</option>
                            <option>Paid</option>
                            <option>Delivered</option>
                            <option>Completed</option>
                          </select>
                        </div>

                        <div className="bookings-table-container" style={{ overflowX: 'auto' }}>
                          <table className="bookings-table" style={{ minWidth: '900px' }}>
                            <thead>
                              <tr>
                                <th><input type="checkbox" /></th>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Activity</th>
                                <th>Subadmin</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPayments.map((payment) => (
                                <tr
                                  key={payment.id}
                                  className={selectedPayment?.id === payment.id ? 'selected' : ''}
                                  onClick={() => handlePaymentClick(payment)}
                                >
                                  <td>
                                    <input type="checkbox" />
                                  </td>
                                  <td className="order-id">{payment.orderId}</td>
                                  <td>
                                    <div className="customer-cell">
                                      <img src={payment.customer.avatar} alt={payment.customer.name} className="customer-avatar" />
                                      <span className="customer-name">{payment.customer.name}</span>
                                    </div>
                                  </td>
                                  <td className="activity-name">{payment.activityName}</td>
                                  <td className="activity-name">{payment.subadminOwner}</td>
                                  <td>
                                    <span className={`status-badge status-${payment.statusColor}`}>
                                      {payment.status}
                                    </span>
                                  </td>
                                  <td className="total-amount">${payment.total.toFixed(2)}</td>
                                  <td className="booking-date">{formatDate(payment.date)}</td>
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

                      {selectedPayment && (
                        <aside className="booking-detail-panel">
                          <div className="detail-panel-header">
                            <h2 className="detail-panel-title">Order {selectedPayment.orderId}</h2>
                            <button className="close-detail-btn" onClick={handleClosePaymentDetail}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              <span style={{ marginLeft: '0.5rem', fontWeight: 600 }}>Close</span>
                            </button>
                          </div>
                          <div className="detail-panel-status">
                            <span className={`status-badge status-${selectedPayment.statusColor}`}>
                              {selectedPayment.status}
                            </span>
                            <span className="detail-date">{formatFullDate(selectedPayment.date)}</span>
                          </div>

                          <div className="customer-info-section">
                            <div className="customer-avatar-large">
                              <img src={selectedPayment.customer.avatar} alt={selectedPayment.customer.name} />
                            </div>
                            <h3 className="customer-name-large">{selectedPayment.customer.name}</h3>
                            <a
                              href={`tel:${selectedPayment.contactInfo.phoneCountry}${selectedPayment.contactInfo.phoneNumber}`}
                              className="call-button"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                              </svg>
                              Call {selectedPayment.contactInfo.phoneCountry} {selectedPayment.contactInfo.phoneNumber}
                            </a>
                          </div>

                          <div className="order-details-section">
                            <h3 className="section-title">Payment Details</h3>
                            <div className="detail-subsection">
                              <h4 className="subsection-title">Contact Information</h4>
                              <div className="detail-info-grid">
                                <div className="detail-info-item">
                                  <label>First Name</label>
                                  <p>{selectedPayment.contactInfo.firstName}</p>
                                </div>
                                <div className="detail-info-item">
                                  <label>Last Name</label>
                                  <p>{selectedPayment.contactInfo.lastName}</p>
                                </div>
                                <div className="detail-info-item">
                                  <label>Email</label>
                                  <p>{selectedPayment.contactInfo.email}</p>
                                </div>
                                <div className="detail-info-item">
                                  <label>Phone</label>
                                  <p>{selectedPayment.contactInfo.phoneCountry} {selectedPayment.contactInfo.phoneNumber}</p>
                                </div>
                              </div>
                            </div>

                            <div className="detail-subsection">
                              <h4 className="subsection-title">Booking Information</h4>
                              <div className="detail-info-grid">
                                <div className="detail-info-item">
                                  <label>Activity</label>
                                  <p>{selectedPayment.activityName}</p>
                                </div>
                                <div className="detail-info-item">
                                  <label>Subadmin</label>
                                  <p>{selectedPayment.subadminOwner}</p>
                                </div>
                                <div className="detail-info-item">
                                  <label>Travelers</label>
                                  <p>{selectedPayment.bookingDetails.travelers} {selectedPayment.bookingDetails.travelers === 1 ? 'Adult' : 'Adults'}</p>
                                </div>
                                <div className="detail-info-item">
                                  <label>Date</label>
                                  <p>{formatDate(selectedPayment.bookingDetails.selectedDate)}</p>
                                </div>
                                <div className="detail-info-item">
                                  <label>Time</label>
                                  <p>{selectedPayment.bookingDetails.selectedTimeSlot}</p>
                                </div>
                                <div className="detail-info-item">
                                  <label>Price per Person</label>
                                  <p>${selectedPayment.bookingDetails.price.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="detail-panel-footer">
                            <div className="total-section">
                              <span className="total-label">Total</span>
                              <span className="total-amount">${selectedPayment.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </aside>
                      )}
                    </div>
                  </section>
                )}

                {activeSection === 'createSubadmin' && (
                  <section className="form-section">
                    <h2 className="form-section-title">Create Subadmin</h2>
                    <p className="form-section-subtitle">
                      Quickly onboard a new subadmin into the platform.
                    </p>
                    <form onSubmit={handleCreateSubadminSubmit}>
                      <div className="contact-info-grid">
                        <div className="form-field-group">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={createSubadminData.name}
                            onChange={handleCreateSubadminChange}
                            className={`form-input ${createSubadminErrors.name ? 'error' : ''}`}
                            placeholder="Enter subadmin name"
                          />
                          {createSubadminErrors.name && (
                            <span className="error-message">{createSubadminErrors.name}</span>
                          )}
                        </div>
                        <div className="form-field-group">
                          <label className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={createSubadminData.phone}
                            onChange={handleCreateSubadminChange}
                            className={`form-input ${createSubadminErrors.phone ? 'error' : ''}`}
                            placeholder="Enter phone number"
                          />
                          {createSubadminErrors.phone && (
                            <span className="error-message">{createSubadminErrors.phone}</span>
                          )}
                        </div>
                      </div>
                      <div className="contact-info-grid">
                        <div className="form-field-group">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={createSubadminData.email}
                            onChange={handleCreateSubadminChange}
                            className={`form-input ${createSubadminErrors.email ? 'error' : ''}`}
                            placeholder="Enter email address"
                          />
                          {createSubadminErrors.email && (
                            <span className="error-message">{createSubadminErrors.email}</span>
                          )}
                        </div>
                        <div className="form-field-group">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            name="password"
                            value={createSubadminData.password}
                            onChange={handleCreateSubadminChange}
                            className={`form-input ${createSubadminErrors.password ? 'error' : ''}`}
                            placeholder="Create password"
                          />
                          {createSubadminErrors.password && (
                            <span className="error-message">{createSubadminErrors.password}</span>
                          )}
                        </div>
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="submit-btn">
                          Create Subadmin
                        </button>
                      </div>
                    </form>
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

export default AdminHome;
