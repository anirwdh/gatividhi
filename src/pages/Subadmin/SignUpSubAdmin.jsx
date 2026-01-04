import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import logo from '../../assets/images/logo.png';
import './SignUpSubAdmin.css';

const SignUpSubAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    activityType: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.activityType.trim()) {
      newErrors.activityType = 'Type of Activity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    
    if (isValid) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Show success modal
      setShowSuccessModal(true);
    } else {
      console.log('Validation failed. Errors:', errors);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Optionally reset form or navigate
    // navigate('/travel-agents');
  };

  return (
    <div className="signup-subadmin">
      <UserHeader />
      
      <div className="signup-container">
        <div className="signup-content">
          {/* Left Column - Signup Form */}
          <div className="signup-form-container">
            <div className="signup-logo">
              <img src={logo} alt="Gatividhi" className="logo-image" />
              <span className="logo-text">Travel Agents</span>
            </div>

            <h1 className="signup-title">Sign up for the Gatividhi Partner Program</h1>

            <form className="signup-form" onSubmit={handleSubmit}>
              {/* Row 1: First name and Last name */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              {/* Row 2: Phone number and Email */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              {/* Row 3: Type of Activity/Tour */}
              <div className="form-field">
                <label htmlFor="activityType" className="form-label">Type of Activity/Tour</label>
                <input
                  type="text"
                  id="activityType"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleInputChange}
                  className={`form-input ${errors.activityType ? 'error' : ''}`}
                  placeholder="Enter type of activity or tour"
                />
                {errors.activityType && <span className="error-message">{errors.activityType}</span>}
              </div>

              {/* Row 4: Tour provider */}
            

              <button type="submit" className="create-account-btn">
                Submit Form
              </button>
            </form>

            <p className="terms-text">
              By proceeding, you agree to the Gatividhi{' '}
              <Link to="/terms" className="terms-link">Terms of Use</Link> and{' '}
              <Link to="/privacy" className="terms-link">Privacy Policy</Link>.
            </p>

            <p className="signin-prompt">
              Already have a Gatividhi Partner account?{' '}
              <Link to="/subadmin/signin" className="signin-link">Sign in</Link>
            </p>

       
          </div>
        </div>
      </div>

      <UserFooter />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
              </div>
              <h2 className="modal-title">Your Form is Successfully submitted, Thank you!</h2>
              <p className="modal-message">Gatividhi team will contact you soon!</p>
              <button className="modal-ok-btn" onClick={handleCloseModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpSubAdmin;
