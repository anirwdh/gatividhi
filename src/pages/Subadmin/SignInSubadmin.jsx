import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import agentBgImage from '../../assets/images/agentbgimage.png';
import './SignInSubadmin.css';

const SignInSubadmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

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

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (errors.otp) {
      setErrors(prev => ({
        ...prev,
        otp: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (showOTP) {
      if (!otp.trim()) {
        newErrors.otp = 'OTP is required';
      } else if (!/^\d{6}$/.test(otp.trim())) {
        newErrors.otp = 'Please enter a valid 6-digit OTP';
      }
    } else {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    
    if (isValid) {
      // Handle form submission
      console.log('Form submitted:', showOTP ? { email: formData.email, otp } : formData);
      // Navigate to dashboard or handle login
      navigate('/subadmin/home');
    } else {
      console.log('Validation failed. Errors:', errors);
    }
  };

  const handleSendOTP = () => {
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required to send OTP' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    // Send OTP logic here
    console.log('Sending OTP to:', formData.email);
    setShowOTP(true);
    setErrors({});
  };

  return (
    <div className="signin-subadmin">
      <UserHeader />
      
      {/* Hero Section */}
      <section className="signin-hero">
        <div className="signin-hero-container">
          <div className="signin-hero-content">
            <div className="signin-hero-left">
              <div className="signin-form-wrapper">
                <h1 className="signin-title">Sign in to Gatividhi Partner Account</h1>

                <form className="signin-form" onSubmit={handleSubmit}>
                  {!showOTP ? (
                    <>
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

                      <div className="form-field">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`form-input ${errors.password ? 'error' : ''}`}
                          placeholder="Enter your password"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                      </div>
                    </>
                  ) : (
                    <div className="form-field">
                      <label htmlFor="otp" className="form-label">Enter OTP</label>
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        className={`form-input ${errors.otp ? 'error' : ''}`}
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                      />
                      {errors.otp && <span className="error-message">{errors.otp}</span>}
                      <p className="otp-info">OTP sent to {formData.email}</p>
                    </div>
                  )}

                  <button type="submit" className="signin-btn">
                    {showOTP ? 'Verify OTP' : 'Sign in'}
                  </button>
                </form>

                <div className="auth-options">
                  {!showOTP ? (
                    <>
                      <button 
                        type="button" 
                        className="otp-toggle-btn"
                        onClick={handleSendOTP}
                      >
                        Sign in via OTP
                      </button>
                      <p className="signup-prompt">
                        Don't have an account?{' '}
                        <Link to="/subadmin/signup" className="signup-link">Sign up</Link>
                      </p>
                    </>
                  ) : (
                    <button 
                      type="button" 
                      className="otp-toggle-btn"
                      onClick={() => {
                        setShowOTP(false);
                        setOtp('');
                        setErrors({});
                      }}
                    >
                      Sign in with password
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="signin-hero-right">
              <div className="signin-hero-image-wrapper">
                <img 
                  src={agentBgImage} 
                  alt="Travel experiences collage" 
                  className="signin-hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <UserFooter />
    </div>
  );
};

export default SignInSubadmin;
