import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SubadminHeader from './SubadminHeader';
import SubadminFooter from './SubadminFooter';
import './SubAdminDetailListing.css';

const SubAdminDetailListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('images');
  const fileInputRef = useRef(null);

  // Get listing data from navigation state or use sample data
  const listingData = location.state?.listingData || {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    location: 'Rishikesh, Uttarakhand',
    rating: 4.9,
    reviews: 1234,
    title: 'Bungee Jumping in Rishikesh - Adrenaline Adventure',
    price: 3790,
    minPrice: 3200,
    maxPrice: 4200,
    originalPrice: null,
    date: 'Started on 15 January 2026',
    propertyType: 'Adventure Activity',
    availability: '1-365 night stays',
    advanceNotice: 'Same-day advance notice',
    guests: 2,
    // Full form data
    description: 'Experience the thrill of bungee jumping from India\'s highest platform in Rishikesh. This exhilarating adventure activity takes you 83 meters above the ground, offering breathtaking views of the surrounding mountains and the Ganges River. Our professional and certified guides ensure your complete safety with state-of-the-art equipment and comprehensive safety briefings. Perfect for adventure enthusiasts seeking an adrenaline rush, this once-in-a-lifetime experience includes multiple safety checks, professional photography, and a certificate of achievement. The jump site is easily accessible and offers stunning panoramic views of the Himalayan foothills. Whether you\'re celebrating a special occasion or simply looking to conquer your fears, this bungee jumping experience will leave you with unforgettable memories.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=400',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'
    ],
    weeklyDiscount: 10,
    monthlyDiscount: 20,
    smartPricing: true,
    included: [
      'Professional certified guide',
      'Premium safety equipment (harness, ropes, helmet)',
      'Comprehensive safety briefing',
      'Certificate of achievement',
      'Professional photography package',
      'Multiple safety checks before jump',
      'Insurance coverage',
      'Post-jump refreshments'
    ],
    notIncluded: [
      'Transportation to/from jump site',
      'Meals (lunch/dinner)',
      'Accommodation',
      'Personal expenses',
      'Gratuities (optional)',
      'Additional photo/video packages beyond basic'
    ],
    departurePoint: 'Jumpin Heights, Mohan Chatti, Rishikesh',
    dropPoint: 'Same as departure point',
    itinerary: [
      {
        title: 'Arrival & Registration',
        description: 'Arrive at the jump site located in Mohan Chatti, Rishikesh. Complete registration process and sign safety waivers. Meet your professional instructors and get familiar with the facility. Enjoy the scenic views while preparing for your adventure.',
        duration: '30 minutes',
        admission: 'Included in package'
      },
      {
        title: 'Safety Briefing & Training',
        description: 'Comprehensive safety briefing conducted by certified professionals. Learn about jump techniques, safety procedures, and what to expect during your jump. All your questions will be answered, and you\'ll receive detailed instructions for the perfect jump experience.',
        duration: '45 minutes',
        admission: 'Mandatory safety session'
      },
      {
        title: 'Equipment Fitting & Safety Checks',
        description: 'Get fitted with professional-grade safety equipment including harness, ropes, and helmet. Multiple safety checks are conducted by experienced staff to ensure everything is secure. Weight measurements and health checks are performed to guarantee your safety.',
        duration: '20 minutes',
        admission: 'Included - all equipment provided'
      },
      {
        title: 'Platform Ascent & Final Prep',
        description: 'Ascend to the 83-meter high jump platform via stairs or elevator (depending on facility). Experience the breathtaking panoramic views of the Himalayas and Ganges River. Final safety check and last-minute briefing before the jump.',
        duration: '15 minutes',
        admission: 'Included'
      },
      {
        title: 'The Ultimate Jump Experience',
        description: 'Take the leap of a lifetime from India\'s highest bungee jumping platform. Feel the adrenaline rush as you free-fall towards the ground, experiencing 3-5 seconds of pure thrill. Professional staff ensures your safety throughout the entire jump. This is the moment you\'ve been waiting for!',
        duration: '5 minutes',
        admission: 'Main activity - fully included'
      },
      {
        title: 'Post-Jump Celebration & Certificate',
        description: 'After your successful jump, celebrate your achievement with refreshments. Receive your official certificate of achievement recognizing your courage and adventure spirit. View and purchase professional photos and videos of your jump experience.',
        duration: '30 minutes',
        admission: 'Certificate included, photos optional'
      }
    ],
    dateOptions: {
      everyday: true,
      everyWeekend: false
    },
    startDate: '2026-01-15',
    endDate: '',
    timeSlots: ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'],
    itineraryIntro: 'Experience the ultimate adrenaline rush with India\'s highest bungee jumping platform.',
    contactInfo: {
      email: 'contact@jumpinheights.com',
      phone: '+91 9876543210',
      website: 'https://www.jumpinheights.com'
    }
  };

  const [formData, setFormData] = useState(listingData);
  const [errors, setErrors] = useState({});
  const [currentTimeSlot, setCurrentTimeSlot] = useState('');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hasChanges, setHasChanges] = useState({});
  const [originalData, setOriginalData] = useState(listingData);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Sections configuration
  const sections = [
    { id: 'images', label: 'Photo Tour', icon: 'image' },
    { id: 'basicInfo', label: 'Basic Info', icon: 'file' },
    { id: 'included', label: 'What\'s Included', icon: 'check' },
    { id: 'meeting', label: 'Meeting & Pickup', icon: 'map' },
    { id: 'itinerary', label: 'Itinerary', icon: 'star' },
    { id: 'dateOptions', label: 'Date Options', icon: 'calendar' },
    { id: 'timeSlots', label: 'Time Slots', icon: 'clock' },
    { id: 'contactInfo', label: 'Contact Info', icon: 'mail' }
  ];

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages]
    }));
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
      // Track changes
      const fullPath = `${parent}.${child}`;
      const originalValue = originalData[parent]?.[child];
      setHasChanges(prev => ({
        ...prev,
        [fullPath]: value !== originalValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Track changes
      const originalValue = originalData[name];
      setHasChanges(prev => ({
        ...prev,
        [name]: value !== originalValue
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle included/not included items
  const handleIncludedChange = (index, value) => {
    const newIncluded = [...(formData.included || [])];
    newIncluded[index] = value;
    setFormData(prev => ({
      ...prev,
      included: newIncluded
    }));
  };

  const handleNotIncludedChange = (index, value) => {
    const newNotIncluded = [...(formData.notIncluded || [])];
    newNotIncluded[index] = value;
    setFormData(prev => ({
      ...prev,
      notIncluded: newNotIncluded
    }));
  };

  const addIncludedItem = () => {
    setFormData(prev => ({
      ...prev,
      included: [...(prev.included || []), '']
    }));
  };

  const removeIncludedItem = (index) => {
    if (formData.included && formData.included.length > 1) {
      setFormData(prev => ({
        ...prev,
        included: prev.included.filter((_, i) => i !== index)
      }));
    }
  };

  const addNotIncludedItem = () => {
    setFormData(prev => ({
      ...prev,
      notIncluded: [...(prev.notIncluded || []), '']
    }));
  };

  const removeNotIncludedItem = (index) => {
    if (formData.notIncluded && formData.notIncluded.length > 1) {
      setFormData(prev => ({
        ...prev,
        notIncluded: prev.notIncluded.filter((_, i) => i !== index)
      }));
    }
  };

  // Handle itinerary changes
  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...(formData.itinerary || [])];
    newItinerary[index][field] = value;
    setFormData(prev => ({
      ...prev,
      itinerary: newItinerary
    }));
  };

  const addItineraryItem = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), {
        title: '',
        description: '',
        duration: '',
        admission: ''
      }]
    }));
  };

  const removeItineraryItem = (index) => {
    if (formData.itinerary && formData.itinerary.length > 1) {
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
        timeSlots: [...(prev.timeSlots || []), currentTimeSlot.trim()]
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

  // Handle save for specific field
  const handleSaveField = (fieldName) => {
    console.log('Saving field:', fieldName, formData[fieldName]);
    // Here you would send the data to your API
    setOriginalData(prev => ({
      ...prev,
      [fieldName]: formData[fieldName]
    }));
    setHasChanges(prev => ({
      ...prev,
      [fieldName]: false
    }));
    alert(`${fieldName} saved successfully!`);
  };

  // Handle save
  const handleSave = () => {
    console.log('Saving listing data:', formData);
    // Here you would send the data to your API
    setOriginalData(formData);
    setHasChanges({});
    alert('All changes saved successfully!');
  };

  // Render section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'images':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Photo Tour</h2>
            <p className="detail-section-subtitle">Manage and Edit your activity photos</p>
            
            <div className="detail-image-upload-section">
              <div className="detail-image-grid">
                {(formData.images || []).map((image, index) => (
                  <div key={index} className="detail-image-item">
                    <img src={image} alt={`Photo ${index + 1}`} />
                    <button
                      type="button"
                      className="detail-remove-image-btn"
                      onClick={() => handleRemoveImage(index)}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="detail-image-upload-card">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="detail-image-file-input"
                    id="detail-image-upload"
                  />
                  <label htmlFor="detail-image-upload" className="detail-image-upload-label">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>Add Photos</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'basicInfo':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Description</h2>
            <p className="detail-section-subtitle">Write a detailed description of your activity.</p>
            
            <div className="detail-form-group">
              <label className="detail-form-label">Description</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                className="detail-form-textarea"
                placeholder="Activity description"
                rows="8"
              />
            </div>

            <div className="detail-form-group">
              <label className="detail-form-label">Activity Type</label>
              <input
                type="text"
                name="propertyType"
                value={formData.propertyType || ''}
                onChange={handleInputChange}
                className="detail-form-input detail-form-input-large"
                placeholder="e.g., Adventure Activity, Tour, Experience"
              />
            </div>

          

            {hasChanges.description && (
              <div className="detail-save-field-wrapper">
                <button 
                  className="detail-save-field-btn"
                  onClick={() => handleSaveField('description')}
                >
                  Save description
                </button>
              </div>
            )}
          </div>
        );

      case 'title':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Title</h2>
            <p className="detail-section-subtitle">Choose a title that highlights what makes your activity special.</p>
            
            <div className="detail-form-group">
              <label className="detail-form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                className="detail-form-input detail-form-input-large"
                placeholder="Activity title"
              />
            </div>

            {hasChanges.title && (
              <div className="detail-save-field-wrapper">
                <button 
                  className="detail-save-field-btn"
                  onClick={() => handleSaveField('title')}
                >
                  Save title
                </button>
              </div>
            )}
          </div>
        );

      case 'location':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Location</h2>
            <p className="detail-section-subtitle">Where is your activity located?</p>
            
            <div className="detail-form-group">
              <label className="detail-form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                className="detail-form-input detail-form-input-large"
                placeholder="e.g., Rishikesh, Uttarakhand"
              />
            </div>

            {hasChanges.location && (
              <div className="detail-save-field-wrapper">
                <button 
                  className="detail-save-field-btn"
                  onClick={() => handleSaveField('location')}
                >
                  Save location
                </button>
              </div>
            )}
          </div>
        );

      case 'pricing':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Pricing</h2>
            <p className="detail-section-subtitle">These settings apply to all bookings, unless you customize them by date. <a href="#" className="detail-link">Learn more</a></p>
            
            <div className="detail-form-group">
              <label className="detail-form-label">Price per person (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                className="detail-form-input detail-form-input-large"
                placeholder="Enter price"
                min="0"
              />
            </div>

            {hasChanges.price && (
              <div className="detail-save-field-wrapper">
                <button 
                  className="detail-save-field-btn"
                  onClick={() => handleSaveField('price')}
                >
                  Save price
                </button>
              </div>
            )}
          </div>
        );

      case 'included':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">What's Included</h2>
            
            {(formData.included || []).map((item, index) => (
              <div key={index} className="detail-list-item-row">
                <span className="detail-check-icon">✓</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleIncludedChange(index, e.target.value)}
                  className="detail-form-input detail-list-input"
                  placeholder="Included item"
                />
                {(formData.included || []).length > 1 && (
                  <button
                    type="button"
                    className="detail-remove-item-btn"
                    onClick={() => removeIncludedItem(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="detail-add-item-btn" onClick={addIncludedItem}>
              + Add Item
            </button>

            <h3 className="detail-subsection-title">What's Not Included</h3>
            {(formData.notIncluded || []).map((item, index) => (
              <div key={index} className="detail-list-item-row">
                <span className="detail-cross-icon">✗</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleNotIncludedChange(index, e.target.value)}
                  className="detail-form-input detail-list-input"
                  placeholder="Not included item"
                />
                {(formData.notIncluded || []).length > 1 && (
                  <button
                    type="button"
                    className="detail-remove-item-btn"
                    onClick={() => removeNotIncludedItem(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="detail-add-item-btn" onClick={addNotIncludedItem}>
              + Add Item
            </button>
          </div>
        );

      case 'meeting':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Meeting and Pickup</h2>
            
            <div className="detail-form-group">
              <label className="detail-form-label">Departure Point</label>
              <input
                type="text"
                name="departurePoint"
                value={formData.departurePoint || ''}
                onChange={handleInputChange}
                className="detail-form-input"
                placeholder="Departure point address"
              />
            </div>

            <div className="detail-form-group">
              <label className="detail-form-label">Drop Point</label>
              <input
                type="text"
                name="dropPoint"
                value={formData.dropPoint || ''}
                onChange={handleInputChange}
                className="detail-form-input"
                placeholder="Drop point address"
              />
            </div>
          </div>
        );

      case 'itinerary':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Itinerary</h2>
            
            <div className="detail-form-group">
              <label className="detail-form-label">Itinerary Introduction</label>
              <textarea
                name="itineraryIntro"
                value={formData.itineraryIntro || ''}
                onChange={handleInputChange}
                className="detail-form-textarea"
                placeholder="Itinerary introduction"
                rows="4"
              />
            </div>

            {(formData.itinerary || []).map((item, index) => (
              <div key={index} className="detail-itinerary-item">
                <div className="detail-itinerary-header">
                  <span className="detail-itinerary-number">{index + 1}</span>
                  {(formData.itinerary || []).length > 1 && (
                    <button
                      type="button"
                      className="detail-remove-item-btn"
                      onClick={() => removeItineraryItem(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <div className="detail-form-group">
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                    className="detail-form-input"
                    placeholder="Title"
                  />
                </div>

                <div className="detail-form-group">
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                    className="detail-form-textarea"
                    placeholder="Description"
                    rows="3"
                  />
                </div>

                <div className="detail-itinerary-meta-row">
                  <div className="detail-form-group">
                    <input
                      type="text"
                      value={item.duration || ''}
                      onChange={(e) => handleItineraryChange(index, 'duration', e.target.value)}
                      className="detail-form-input"
                      placeholder="Duration"
                    />
                  </div>

                  <div className="detail-form-group">
                    <input
                      type="text"
                      value={item.admission || ''}
                      onChange={(e) => handleItineraryChange(index, 'admission', e.target.value)}
                      className="detail-form-input"
                      placeholder="Admission"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="detail-add-item-btn" onClick={addItineraryItem}>
              + Add Itinerary Item
            </button>
          </div>
        );

      case 'dateOptions':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Availability</h2>
            <p className="detail-section-subtitle">Set when your activity is available for booking.</p>
            
            <div className="detail-form-group">
              <label className="detail-form-label">Stay duration</label>
              <input
                type="text"
                name="availability"
                value={formData.availability || ''}
                onChange={handleInputChange}
                className="detail-form-input detail-form-input-large"
                placeholder="e.g., 1-365 night stays"
              />
            </div>

          

            <div className="detail-form-section-divider"></div>

            <h3 className="detail-subsection-title">Date Options</h3>
            
            <div className="detail-toggle-group">
              <label className="detail-toggle-label">
                <input
                  type="checkbox"
                  checked={formData.dateOptions?.everyday || false}
                  onChange={() => handleDateOptionChange('everyday')}
                  className="detail-toggle-checkbox"
                />
                <span className="detail-toggle-switch"></span>
                <span className="detail-toggle-text">Available Everyday</span>
              </label>

              <label className="detail-toggle-label">
                <input
                  type="checkbox"
                  checked={formData.dateOptions?.everyWeekend || false}
                  onChange={() => handleDateOptionChange('everyWeekend')}
                  className="detail-toggle-checkbox"
                />
                <span className="detail-toggle-switch"></span>
                <span className="detail-toggle-text">Available Every Weekend</span>
              </label>
            </div>

            {!formData.dateOptions?.everyday && !formData.dateOptions?.everyWeekend && (
              <div className="detail-date-range-section">
                <div className="detail-date-inputs-row">
                  <div className="detail-form-group detail-date-field-group" ref={startDateRef}>
                    <label className="detail-form-label">Start Date</label>
                    <div className="detail-date-input-wrapper">
                      <input
                        type="text"
                        readOnly
                        value={formData.startDate ? parseDateString(formData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select start date'}
                        onClick={() => {
                          setShowStartCalendar(!showStartCalendar);
                          setShowEndCalendar(false);
                        }}
                        className="detail-form-input detail-date-input"
                        placeholder="Select start date"
                      />
                      <svg className="detail-calendar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {showStartCalendar && (
                        <div className="detail-custom-calendar start-date-calendar">
                          <div className="detail-calendar-header">
                            <button type="button" className="detail-calendar-nav-btn" onClick={handlePrevMonth}>‹</button>
                            <h3 className="detail-calendar-month-year">
                              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h3>
                            <button type="button" className="detail-calendar-nav-btn" onClick={handleNextMonth}>›</button>
                          </div>
                          <div className="detail-calendar-weekdays">
                            <div className="detail-calendar-weekday">Sun</div>
                            <div className="detail-calendar-weekday">Mon</div>
                            <div className="detail-calendar-weekday">Tue</div>
                            <div className="detail-calendar-weekday">Wed</div>
                            <div className="detail-calendar-weekday">Thu</div>
                            <div className="detail-calendar-weekday">Fri</div>
                            <div className="detail-calendar-weekday">Sat</div>
                          </div>
                          <div className="detail-calendar-days">
                            {renderCalendar(true)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="detail-form-group detail-date-field-group" ref={endDateRef}>
                    <label className="detail-form-label">End Date</label>
                    <div className="detail-date-input-wrapper">
                      <input
                        type="text"
                        readOnly
                        value={formData.endDate ? parseDateString(formData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select end date'}
                        onClick={() => {
                          setShowEndCalendar(!showEndCalendar);
                          setShowStartCalendar(false);
                        }}
                        className="detail-form-input detail-date-input"
                        placeholder="Select end date"
                      />
                      <svg className="detail-calendar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {showEndCalendar && (
                        <div className="detail-custom-calendar end-date-calendar">
                          <div className="detail-calendar-header">
                            <button type="button" className="detail-calendar-nav-btn" onClick={handlePrevMonth}>‹</button>
                            <h3 className="detail-calendar-month-year">
                              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h3>
                            <button type="button" className="detail-calendar-nav-btn" onClick={handleNextMonth}>›</button>
                          </div>
                          <div className="detail-calendar-weekdays">
                            <div className="detail-calendar-weekday">Sun</div>
                            <div className="detail-calendar-weekday">Mon</div>
                            <div className="detail-calendar-weekday">Tue</div>
                            <div className="detail-calendar-weekday">Wed</div>
                            <div className="detail-calendar-weekday">Thu</div>
                            <div className="detail-calendar-weekday">Fri</div>
                            <div className="detail-calendar-weekday">Sat</div>
                          </div>
                          <div className="detail-calendar-days">
                            {renderCalendar(false)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'timeSlots':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Time Slots</h2>
            
            <div className="detail-time-slots-form">
              <div className="detail-time-slot-input-group">
                <input
                  type="text"
                  value={currentTimeSlot}
                  onChange={(e) => setCurrentTimeSlot(e.target.value)}
                  className="detail-form-input"
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
                  className="detail-add-time-slot-btn"
                  onClick={handleAddTimeSlot}
                >
                  Add Time
                </button>
              </div>

              <div className="detail-time-slots-list">
                {(formData.timeSlots || []).map((slot, index) => (
                  <div key={index} className="detail-time-slot-chip">
                    <span>{slot}</span>
                    <button
                      type="button"
                      className="detail-remove-time-slot-btn"
                      onClick={() => handleRemoveTimeSlot(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contactInfo':
        return (
          <div className="detail-section-content">
            <h2 className="detail-section-title">Contact Information</h2>
            
            <div className="detail-contact-info-grid">
              <div className="detail-form-group">
                <label className="detail-form-label">Email</label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={formData.contactInfo?.email || ''}
                  onChange={handleInputChange}
                  className="detail-form-input"
                  placeholder="contact@example.com"
                />
              </div>

              <div className="detail-form-group">
                <label className="detail-form-label">Phone</label>
                <input
                  type="tel"
                  name="contactInfo.phone"
                  value={formData.contactInfo?.phone || ''}
                  onChange={handleInputChange}
                  className="detail-form-input"
                  placeholder="+91 1234567890"
                />
              </div>

              <div className="detail-form-group">
                <label className="detail-form-label">Website (Optional)</label>
                <input
                  type="url"
                  name="contactInfo.website"
                  value={formData.contactInfo?.website || ''}
                  onChange={handleInputChange}
                  className="detail-form-input"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="subadmin-detail-listing-page">
      <SubadminHeader activeTab="listings" setActiveTab={() => {}} />
      
      <div className="detail-listing-container">
        {/* Left Sidebar */}
        <aside className="detail-sidebar">
          <div className="detail-sidebar-header">
            <button 
              className="detail-back-btn"
              onClick={() => navigate('/subadmin/listings')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h2 className="detail-sidebar-title">Listing editor</h2>
          </div>

          <nav className="detail-sidebar-nav">
            {/* Photo Tour Card */}
            <div 
              className={`detail-preview-card ${activeSection === 'images' ? 'active' : ''}`}
              onClick={() => setActiveSection('images')}
            >
              <div className="preview-card-header">
                <h3 className="preview-card-title">Photo tour</h3>
              </div>
              <div className="preview-photo-container">
                <img 
                  src={formData.images?.[0] || formData.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'} 
                  alt="Listing preview"
                  className="preview-photo-image"
                />
                <div className="preview-photo-overlay">
                  <span className="preview-photo-count">
                    {formData.images?.length || 1} photo{formData.images?.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <p className="preview-card-subtitle">{formData.propertyType || 'Adventure Activity'}</p>
            </div>

            {/* Title Card */}
            <div 
              className={`detail-preview-card ${activeSection === 'title' ? 'active' : ''}`}
              onClick={() => setActiveSection('title')}
            >
              <div className="preview-card-header">
                <h3 className="preview-card-title">Title</h3>
                {hasChanges.title && <span className="preview-card-badge">Unsaved</span>}
              </div>
              <p className="preview-card-text">{formData.title || 'Untitled Listing'}</p>
            </div>

            {/* Location Card */}
            <div 
              className={`detail-preview-card ${activeSection === 'location' ? 'active' : ''}`}
              onClick={() => setActiveSection('location')}
            >
              <div className="preview-card-header">
                <h3 className="preview-card-title">Location</h3>
                {hasChanges.location && <span className="preview-card-badge">Unsaved</span>}
              </div>
              <p className="preview-card-text">{formData.location || 'Not specified'}</p>
              {formData.propertyType && (
                <p className="preview-card-subtitle">{formData.propertyType}</p>
              )}
            </div>

            {/* Pricing Card */}
            <div 
              className={`detail-preview-card ${activeSection === 'pricing' ? 'active' : ''}`}
              onClick={() => setActiveSection('pricing')}
            >
              <div className="preview-card-header">
                <h3 className="preview-card-title">Pricing</h3>
                {hasChanges.price && <span className="preview-card-badge">Unsaved</span>}
              </div>
              <p className="preview-card-price">
                ₹{formData.price?.toLocaleString() || '0'} per person
              </p>
            </div>

            {/* Availability Card */}
            <div 
              className={`detail-preview-card ${activeSection === 'dateOptions' ? 'active' : ''}`}
              onClick={() => setActiveSection('dateOptions')}
            >
              <div className="preview-card-header">
                <h3 className="preview-card-title">Availability</h3>
              </div>
              <p className="preview-card-text">{formData.availability || 'Not specified'}</p>
              {formData.advanceNotice && (
                <p className="preview-card-subtitle">{formData.advanceNotice}</p>
              )}
            </div>

            {/* Description Card */}
            <div 
              className={`detail-preview-card ${activeSection === 'basicInfo' ? 'active' : ''}`}
              onClick={() => setActiveSection('basicInfo')}
            >
              <div className="preview-card-header">
                <h3 className="preview-card-title">Description</h3>
                {hasChanges.description && <span className="preview-card-badge">Unsaved</span>}
              </div>
              <p className="preview-card-text preview-card-description">
                {formData.description || 'No description provided'}
              </p>
            </div>

            {/* Number of Guests */}
            {formData.guests && (
              <div 
                className={`detail-preview-card ${activeSection === 'basicInfo' ? 'active' : ''}`}
                onClick={() => setActiveSection('basicInfo')}
              >
                <div className="preview-card-header">
                  <h3 className="preview-card-title">Number of guests</h3>
                </div>
                <p className="preview-card-text">{formData.guests} guest{formData.guests !== 1 ? 's' : ''}</p>
              </div>
            )}

            {/* Other Sections */}
            <div className="detail-sidebar-section-title">
              <p className="sidebar-section-label">Manage and edit your activity</p>
            </div>
            
            <div 
              className={`detail-preview-card simple ${activeSection === 'included' ? 'active' : ''}`}
              onClick={() => setActiveSection('included')}
            >
              <h3 className="preview-card-title">What's Included</h3>
              <p className="preview-card-text-small">
                {(formData.included?.length || 0) + (formData.notIncluded?.length || 0)} items
              </p>
            </div>

            <div 
              className={`detail-preview-card simple ${activeSection === 'meeting' ? 'active' : ''}`}
              onClick={() => setActiveSection('meeting')}
            >
              <h3 className="preview-card-title">Meeting & Pickup</h3>
              <p className="preview-card-text-small">
                {formData.departurePoint ? 'Configured' : 'Not configured'}
              </p>
            </div>

            <div 
              className={`detail-preview-card simple ${activeSection === 'itinerary' ? 'active' : ''}`}
              onClick={() => setActiveSection('itinerary')}
            >
              <h3 className="preview-card-title">Itinerary</h3>
              <p className="preview-card-text-small">
                {formData.itinerary?.length || 0} item{formData.itinerary?.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div 
              className={`detail-preview-card simple ${activeSection === 'timeSlots' ? 'active' : ''}`}
              onClick={() => setActiveSection('timeSlots')}
            >
              <h3 className="preview-card-title">Time Slots</h3>
              <p className="preview-card-text-small">
                {formData.timeSlots?.length || 0} slot{formData.timeSlots?.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div 
              className={`detail-preview-card simple ${activeSection === 'contactInfo' ? 'active' : ''}`}
              onClick={() => setActiveSection('contactInfo')}
            >
              <h3 className="preview-card-title">Contact Info</h3>
              <p className="preview-card-text-small">
                {formData.contactInfo?.email ? 'Configured' : 'Not configured'}
              </p>
            </div>
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="detail-content-area">
          <div className="detail-content-header">
            <h1 className="detail-listing-title">{formData.title || 'Untitled Listing'}</h1>
            {Object.values(hasChanges).some(change => change) && (
              <button className="detail-save-btn" onClick={handleSave}>
                Save all changes
              </button>
            )}
          </div>

          <div className="detail-content-scroll">
            {renderSectionContent()}
          </div>
        </main>
      </div>

      <SubadminFooter />
    </div>
  );
};

export default SubAdminDetailListing;

