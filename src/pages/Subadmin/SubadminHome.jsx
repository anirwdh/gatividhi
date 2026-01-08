import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SubadminHeader from './SubadminHeader';
import SubadminFooter from './SubadminFooter';
import SubadminListing from './SubadminListing';
import './SubadminHome.css';

const SubadminHome = () => {
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('create');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    price: '',
    images: [],
    included: [''],
    notIncluded: [''],
    departurePoint: '',
    dropPoint: '',
    itinerary: [{
      title: '',
      description: '',
      duration: '',
      admission: ''
    }],
    dateOptions: {
      everyday: false,
      everyWeekend: false
    },
    startDate: '',
    endDate: '',
    timeSlots: [],
    itineraryIntro: '',
    contactInfo: {
      email: '',
      phone: '',
      website: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [currentTimeSlot, setCurrentTimeSlot] = useState('');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeSection, setActiveSection] = useState('images');
  const [userName, setUserName] = useState('Saurabh'); // Will come from backend later
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Section refs for scroll navigation
  const sectionRefs = {
    images: useRef(null),
    basicInfo: useRef(null),
    included: useRef(null),
    meeting: useRef(null),
    itinerary: useRef(null),
    dateOptions: useRef(null),
    timeSlots: useRef(null),
    contactInfo: useRef(null)
  };

  // Set active tab based on route
  useEffect(() => {
    if (location.pathname === '/subadmin/listings' || location.pathname === '/subadmin/calendar') {
      setActiveTab('listings');
    } else {
      setActiveTab('create');
    }
  }, [location.pathname]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header and sidebar

      const sections = [
        { id: 'images', ref: sectionRefs.images },
        { id: 'basicInfo', ref: sectionRefs.basicInfo },
        { id: 'included', ref: sectionRefs.included },
        { id: 'meeting', ref: sectionRefs.meeting },
        { id: 'itinerary', ref: sectionRefs.itinerary },
        { id: 'dateOptions', ref: sectionRefs.dateOptions },
        { id: 'timeSlots', ref: sectionRefs.timeSlots },
        { id: 'contactInfo', ref: sectionRefs.contactInfo }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          
          if (scrollPosition >= sectionTop - 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref.current) {
      const offset = 100; // Account for header
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 20) {
      setErrors(prev => ({
        ...prev,
        images: 'Maximum 20 images allowed'
      }));
      return;
    }
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    // Clear error when images are added
    if (errors.images && formData.images.length + newImages.length >= 5) {
      setErrors(prev => ({
        ...prev,
        images: ''
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle included/not included items
  const handleIncludedChange = (index, value) => {
    const newIncluded = [...formData.included];
    newIncluded[index] = value;
    setFormData(prev => ({
      ...prev,
      included: newIncluded
    }));
  };

  const handleNotIncludedChange = (index, value) => {
    const newNotIncluded = [...formData.notIncluded];
    newNotIncluded[index] = value;
    setFormData(prev => ({
      ...prev,
      notIncluded: newNotIncluded
    }));
  };

  const addIncludedItem = () => {
    setFormData(prev => ({
      ...prev,
      included: [...prev.included, '']
    }));
  };

  const removeIncludedItem = (index) => {
    if (formData.included.length > 1) {
      setFormData(prev => ({
        ...prev,
        included: prev.included.filter((_, i) => i !== index)
      }));
    }
  };

  const addNotIncludedItem = () => {
    setFormData(prev => ({
      ...prev,
      notIncluded: [...prev.notIncluded, '']
    }));
  };

  const removeNotIncludedItem = (index) => {
    if (formData.notIncluded.length > 1) {
      setFormData(prev => ({
        ...prev,
        notIncluded: prev.notIncluded.filter((_, i) => i !== index)
      }));
    }
  };

  // Handle itinerary changes
  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index][field] = value;
    setFormData(prev => ({
      ...prev,
      itinerary: newItinerary
    }));
  };

  const addItineraryItem = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, {
        title: '',
        description: '',
        duration: '',
        admission: ''
      }]
    }));
  };

  const removeItineraryItem = (index) => {
    if (formData.itinerary.length > 1) {
      setFormData(prev => ({
        ...prev,
        itinerary: prev.itinerary.filter((_, i) => i !== index)
      }));
    }
  };

  // Handle date options
  const handleDateOptionChange = (option) => {
    setFormData(prev => ({
      ...prev,
      dateOptions: {
        ...prev.dateOptions,
        [option]: !prev.dateOptions[option]
      }
    }));
  };

  // Handle time slots
  const handleAddTimeSlot = () => {
    if (currentTimeSlot.trim()) {
      setFormData(prev => ({
        ...prev,
        timeSlots: [...prev.timeSlots, currentTimeSlot.trim()]
      }));
      setCurrentTimeSlot('');
    }
  };

  const handleRemoveTimeSlot = (index) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index)
    }));
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
    if (!date) return '';
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
    if (!date) return true;
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (day, isStartDate) => {
    const dateString = formatDateToString(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    if (isPastDate(dateString)) return;

    if (isStartDate) {
      setFormData(prev => ({ ...prev, startDate: dateString }));
      setShowStartCalendar(false);
    } else {
      if (formData.startDate && dateString < formData.startDate) {
        setErrors(prev => ({ ...prev, endDate: 'End date must be after start date' }));
        return;
      }
      setFormData(prev => ({ ...prev, endDate: dateString }));
      setShowEndCalendar(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendar = (isStartDate) => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const today = new Date();
    const todayString = formatDateToString(today);
    const selectedDateString = isStartDate ? formData.startDate : formData.endDate;

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

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
          onClick={() => !isPast && handleDateClick(day, isStartDate)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Update current month when calendar opens
  useEffect(() => {
    if (showStartCalendar && formData.startDate) {
      const date = parseDateString(formData.startDate);
      if (date) {
        setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
      }
    }
  }, [showStartCalendar]);

  useEffect(() => {
    if (showEndCalendar && formData.endDate) {
      const date = parseDateString(formData.endDate);
      if (date) {
        setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
      }
    }
  }, [showEndCalendar]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (startDateRef.current && !startDateRef.current.contains(e.target)) {
        const calendar = document.querySelector('.start-date-calendar');
        if (calendar && !calendar.contains(e.target)) {
          setShowStartCalendar(false);
        }
      }
      if (endDateRef.current && !endDateRef.current.contains(e.target)) {
        const calendar = document.querySelector('.end-date-calendar');
        if (calendar && !calendar.contains(e.target)) {
          setShowEndCalendar(false);
        }
      }
    };

    if (showStartCalendar || showEndCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showStartCalendar, showEndCalendar]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (formData.images.length < 5) newErrors.images = 'Minimum 5 images are required';
    if (!formData.departurePoint.trim()) newErrors.departurePoint = 'Departure point is required';
    if (!formData.dropPoint.trim()) newErrors.dropPoint = 'Drop point is required';
    if (!formData.contactInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo.email)) {
      newErrors['contactInfo.email'] = 'Valid email is required';
    }
    if (!formData.contactInfo.phone.trim()) newErrors['contactInfo.phone'] = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would send the data to your API
      alert('Activity created successfully!');
    }
  };

  // Create New Activity Form Component
  const CreateActivityForm = () => (
    <div className="subadmin-home">
      <main className="subadmin-main-content">
        <div className="subadmin-content-container">
          {/* Sidebar Navigation */}
          <aside className="form-sidebar">
            <div className="sidebar-content">
              <h3 className="sidebar-title">Sections</h3>
              <nav className="sidebar-nav">
                <button
                  type="button"
                  className={`sidebar-nav-item ${activeSection === 'images' ? 'active' : ''}`}
                  onClick={() => scrollToSection('images')}
                >
                  <span className="nav-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </span>
                  <span className="nav-item-text">Photo Tour</span>
                </button>
                <button
                  type="button"
                  className={`sidebar-nav-item ${activeSection === 'basicInfo' ? 'active' : ''}`}
                  onClick={() => scrollToSection('basicInfo')}
                >
                  <span className="nav-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </span>
                  <span className="nav-item-text">Basic Info</span>
                </button>
                <button
                  type="button"
                  className={`sidebar-nav-item ${activeSection === 'included' ? 'active' : ''}`}
                  onClick={() => scrollToSection('included')}
                >
                  <span className="nav-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="nav-item-text">What's Included</span>
                </button>
                <button
                  type="button"
                  className={`sidebar-nav-item ${activeSection === 'meeting' ? 'active' : ''}`}
                  onClick={() => scrollToSection('meeting')}
                >
                  <span className="nav-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <span className="nav-item-text">Meeting & Pickup</span>
                </button>
                <button
                  type="button"
                  className={`sidebar-nav-item ${activeSection === 'itinerary' ? 'active' : ''}`}
                  onClick={() => scrollToSection('itinerary')}
                >
                  <span className="nav-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </span>
                  <span className="nav-item-text">Itinerary</span>
                </button>
                <button
                  type="button"
                  className={`sidebar-nav-item ${activeSection === 'dateOptions' ? 'active' : ''}`}
                  onClick={() => scrollToSection('dateOptions')}
                >
                  <span className="nav-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </span>
                  <span className="nav-item-text">Date Options</span>
                </button>
                <button
                  type="button"
                  className={`sidebar-nav-item ${activeSection === 'timeSlots' ? 'active' : ''}`}
                  onClick={() => scrollToSection('timeSlots')}
                >
                  <span className="nav-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </span>
                  <span className="nav-item-text">Time Slots</span>
                </button>
                <button
                  type="button"
                  className={`sidebar-nav-item ${activeSection === 'contactInfo' ? 'active' : ''}`}
                  onClick={() => scrollToSection('contactInfo')}
                >
                  <span className="nav-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <span className="nav-item-text">Contact Info</span>
                </button>
              </nav>
            </div>
          </aside>

          <div className="create-activity-form-wrapper">
            <div className="form-header">
              <h1 className="form-main-title">
                Hey <span className="user-name">{userName}</span>
              </h1>
              <h2 className="form-sub-title">Create your new activity</h2>
            </div>

            <form onSubmit={handleSubmit} className="create-activity-form">
              {/* Images Section */}
              <section ref={sectionRefs.images} id="images" className="form-section">
                <h2 className="form-section-title">Photo Tour</h2>
                <p className="form-section-subtitle">Upload images for the activity banner</p>
                
                <div className="image-upload-section">
                  <div className="image-scroll-container">
                    {formData.images.map((image, index) => (
                      <div key={index} className="uploaded-image-item">
                        <img src={image} alt={`Upload ${index + 1}`} />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => handleRemoveImage(index)}
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                        {index === 0 && formData.images.length > 0 && (
                          <span className="image-badge">{formData.images.length} photo{formData.images.length !== 1 ? 's' : ''}</span>
                        )}
                      </div>
                    ))}
                    <div className="image-upload-card">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                        className="image-file-input"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="image-upload-label">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>Add Images</span>
                      </label>
                    </div>
                  </div>
                  <div className="image-count-indicator">
                    <span className={`image-count ${formData.images.length >= 5 ? 'complete' : ''}`}>
                      {formData.images.length} / 5 images uploaded
                    </span>
                    {formData.images.length < 5 && (
                      <span className="image-count-remaining">
                        {5 - formData.images.length} more required
                      </span>
                    )}
                  </div>
                  {errors.images && <span className="error-message">{errors.images}</span>}
                </div>
              </section>

              {/* Basic Information */}
              <section ref={sectionRefs.basicInfo} id="basicInfo" className="form-section">
                <h2 className="form-section-title">Title</h2>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`form-input ${errors.title ? 'error' : ''}`}
                  placeholder="e.g., Rishikesh Adventure, River Rafting, Sky-Diving Guided Tour"
                />
                {errors.title && <span className="error-message">{errors.title}</span>}

                <h2 className="form-section-title">Location</h2>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder="e.g., Rishikesh, Uttarakhand"
                />
                {errors.location && <span className="error-message">{errors.location}</span>}

                <h2 className="form-section-title">Description</h2>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  placeholder="Enter a detailed description of the activity..."
                  rows="6"
                />
                {errors.description && <span className="error-message">{errors.description}</span>}

                <h2 className="form-section-title">Price (₹)</h2>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`form-input ${errors.price ? 'error' : ''}`}
                  placeholder="Enter price per person"
                  min="0"
                  step="0.01"
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </section>

              {/* What's Included */}
              <section ref={sectionRefs.included} id="included" className="form-section">
                <h2 className="form-section-title">What's Included</h2>
                {formData.included.map((item, index) => (
                  <div key={index} className="list-item-row">
                    <span className="check-icon-form">✓</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleIncludedChange(index, e.target.value)}
                      className="form-input list-input"
                      placeholder="e.g., Professional guide"
                    />
                    {formData.included.length > 1 && (
                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => removeIncludedItem(index)}
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="add-item-btn" onClick={addIncludedItem}>
                  + Add Item
                </button>

                <h2 className="form-section-title" style={{ marginTop: '2rem' }}>What's Not Included</h2>
                {formData.notIncluded.map((item, index) => (
                  <div key={index} className="list-item-row">
                    <span className="cross-icon-form">✗</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleNotIncludedChange(index, e.target.value)}
                      className="form-input list-input"
                      placeholder="e.g., Gratuities"
                    />
                    {formData.notIncluded.length > 1 && (
                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => removeNotIncludedItem(index)}
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="add-item-btn" onClick={addNotIncludedItem}>
                  + Add Item
                </button>
              </section>

              {/* Meeting and Pickup */}
              <section ref={sectionRefs.meeting} id="meeting" className="form-section">
                <h2 className="form-section-title">Meeting and Pickup</h2>
                
                <div className="form-field-group">
                  <label className="form-label">Departure Point</label>
                  <input
                    type="text"
                    name="departurePoint"
                    value={formData.departurePoint}
                    onChange={handleInputChange}
                    className={`form-input ${errors.departurePoint ? 'error' : ''}`}
                    placeholder="e.g., Viale Vaticano, 00165 Roma RM, Italy"
                  />
                  {errors.departurePoint && <span className="error-message">{errors.departurePoint}</span>}
                </div>

                <div className="form-field-group">
                  <label className="form-label">Drop Point</label>
                  <input
                    type="text"
                    name="dropPoint"
                    value={formData.dropPoint}
                    onChange={handleInputChange}
                    className={`form-input ${errors.dropPoint ? 'error' : ''}`}
                    placeholder="e.g., Piazza San Pietro, 00120 Città del Vaticano, Vatican City"
                  />
                  {errors.dropPoint && <span className="error-message">{errors.dropPoint}</span>}
                </div>
              </section>

              {/* Itinerary */}
              <section ref={sectionRefs.itinerary} id="itinerary" className="form-section">
                <h2 className="form-section-title">Itinerary</h2>
                
                <div className="form-field-group">
                  <label className="form-label">Itinerary Introduction</label>
                  <textarea
                    name="itineraryIntro"
                    value={formData.itineraryIntro}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="e.g., The UNESCO-listed Vatican Museums are visited by tens of thousands of people each day..."
                    rows="4"
                  />
                </div>

                {formData.itinerary.map((item, index) => (
                  <div key={index} className="itinerary-item-form">
                    <div className="itinerary-item-header">
                      <span className="itinerary-number-form">{index + 1}</span>
                      {formData.itinerary.length > 1 && (
                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => removeItineraryItem(index)}
                          aria-label="Remove itinerary item"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    
                    <div className="form-field-group">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                        className="form-input"
                        placeholder="Title (e.g., Vatican City)"
                      />
                    </div>

                    <div className="form-field-group">
                      <textarea
                        value={item.description}
                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                        className="form-textarea"
                        placeholder="Description..."
                        rows="3"
                      />
                    </div>

                    <div className="itinerary-meta-row">
                      <div className="form-field-group">
                        <input
                          type="text"
                          value={item.duration}
                          onChange={(e) => handleItineraryChange(index, 'duration', e.target.value)}
                          className="form-input"
                          placeholder="Duration (e.g., 5 minutes)"
                        />
                      </div>

                      <div className="form-field-group">
                        <input
                          type="text"
                          value={item.admission}
                          onChange={(e) => handleItineraryChange(index, 'admission', e.target.value)}
                          className="form-input"
                          placeholder="Admission (e.g., Admission Ticket Free)"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button type="button" className="add-item-btn" onClick={addItineraryItem}>
                  + Add Itinerary Item
                </button>
              </section>

              {/* Date Options */}
              <section ref={sectionRefs.dateOptions} id="dateOptions" className="form-section">
                <h2 className="form-section-title">Date Options</h2>
                <div className="toggle-group">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={formData.dateOptions.everyday}
                      onChange={() => handleDateOptionChange('everyday')}
                      className="toggle-checkbox"
                    />
                    <span className="toggle-switch"></span>
                    <span className="toggle-text">Available Everyday</span>
                  </label>

                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={formData.dateOptions.everyWeekend}
                      onChange={() => handleDateOptionChange('everyWeekend')}
                      className="toggle-checkbox"
                    />
                    <span className="toggle-switch"></span>
                    <span className="toggle-text">Available Every Weekend</span>
                  </label>
                </div>

                {!formData.dateOptions.everyday && !formData.dateOptions.everyWeekend && (
                  <div className="date-range-section">
                    <div className="date-inputs-row">
                      <div className="form-field-group date-field-group" ref={startDateRef}>
                        <label className="form-label">Start Date</label>
                        <div className="date-input-wrapper">
                          <input
                            type="text"
                            readOnly
                            value={formData.startDate ? parseDateString(formData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select start date'}
                            onClick={() => {
                              setShowStartCalendar(!showStartCalendar);
                              setShowEndCalendar(false);
                            }}
                            className={`form-input date-input ${errors.startDate ? 'error' : ''}`}
                            placeholder="Select start date"
                          />
                          <svg className="calendar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {showStartCalendar && (
                            <div className="custom-calendar start-date-calendar">
                              <div className="calendar-header">
                                <button type="button" className="calendar-nav-btn" onClick={handlePrevMonth} aria-label="Previous month">‹</button>
                                <h3 className="calendar-month-year">
                                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button type="button" className="calendar-nav-btn" onClick={handleNextMonth} aria-label="Next month">›</button>
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
                                {renderCalendar(true)}
                              </div>
                            </div>
                          )}
                        </div>
                        {errors.startDate && <span className="error-message">{errors.startDate}</span>}
                      </div>

                      <div className="form-field-group date-field-group" ref={endDateRef}>
                        <label className="form-label">End Date</label>
                        <div className="date-input-wrapper">
                          <input
                            type="text"
                            readOnly
                            value={formData.endDate ? parseDateString(formData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select end date'}
                            onClick={() => {
                              setShowEndCalendar(!showEndCalendar);
                              setShowStartCalendar(false);
                            }}
                            className={`form-input date-input ${errors.endDate ? 'error' : ''}`}
                            placeholder="Select end date"
                          />
                          <svg className="calendar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {showEndCalendar && (
                            <div className="custom-calendar end-date-calendar">
                              <div className="calendar-header">
                                <button type="button" className="calendar-nav-btn" onClick={handlePrevMonth} aria-label="Previous month">‹</button>
                                <h3 className="calendar-month-year">
                                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button type="button" className="calendar-nav-btn" onClick={handleNextMonth} aria-label="Next month">›</button>
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
                                {renderCalendar(false)}
                              </div>
                            </div>
                          )}
                        </div>
                        {errors.endDate && <span className="error-message">{errors.endDate}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Time Slots (Optional) */}
              <section ref={sectionRefs.timeSlots} id="timeSlots" className="form-section">
                <h2 className="form-section-title">Time Slots (Optional)</h2>
                <div className="time-slots-form">
                  <div className="time-slot-input-group">
                    <input
                      type="text"
                      value={currentTimeSlot}
                      onChange={(e) => setCurrentTimeSlot(e.target.value)}
                      className="form-input"
                      placeholder="e.g., 8:00 AM"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTimeSlot();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="add-time-slot-btn"
                      onClick={handleAddTimeSlot}
                    >
                      Add Time
                    </button>
                  </div>

                  <div className="time-slots-list">
                    {formData.timeSlots.map((slot, index) => (
                      <div key={index} className="time-slot-chip">
                        <span>{slot}</span>
                        <button
                          type="button"
                          className="remove-time-slot-btn"
                          onClick={() => handleRemoveTimeSlot(index)}
                          aria-label="Remove time slot"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section ref={sectionRefs.contactInfo} id="contactInfo" className="form-section">
                <h2 className="form-section-title">Contact Information</h2>
                <div className="contact-info-grid">
                  <div className="form-field-group">
                    <label className="form-label">
                      Email <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactInfo.email"
                      value={formData.contactInfo.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors['contactInfo.email'] ? 'error' : ''}`}
                      placeholder="contact@example.com"
                    />
                    {errors['contactInfo.email'] && <span className="error-message">{errors['contactInfo.email']}</span>}
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">
                      Phone <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactInfo.phone"
                      value={formData.contactInfo.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors['contactInfo.phone'] ? 'error' : ''}`}
                      placeholder="+91 1234567890"
                    />
                    {errors['contactInfo.phone'] && <span className="error-message">{errors['contactInfo.phone']}</span>}
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Website (Optional)</label>
                    <input
                      type="url"
                      name="contactInfo.website"
                      value={formData.contactInfo.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://www.example.com"
                    />
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Create Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <div className="subadmin-dashboard-wrapper">
      <SubadminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'create' && <CreateActivityForm />}
      {activeTab === 'listings' && <SubadminListing onNavigateToCreate={() => setActiveTab('create')} />}

      <SubadminFooter />
    </div>
  );
};

export default SubadminHome;
