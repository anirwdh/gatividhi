import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import agentBgImage from '../../assets/images/agentbgimage.png';
import TeamHome from './TeamHome';
import '../Subadmin/SignInSubadmin.css';

const TeamLoginComponent = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return <TeamHome />;
  }

  return (
    <div className="signin-subadmin">
      <UserHeader />
      
      <section className="signin-hero">
        <div className="signin-hero-container">
          <div className="signin-hero-content">
            <div className="signin-hero-left">
              <div className="signin-form-wrapper">
                <h1 className="signin-title">Team Login</h1>

                <form className="signin-form" onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="team-email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="team-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="Enter team email address"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="team-password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="team-password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Enter your password"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>

                  <button type="submit" className="signin-btn">
                    Login
                  </button>
                </form>
              </div>
            </div>
            
            <div className="signin-hero-right">
              <div className="signin-hero-image-wrapper">
                <img 
                  src={agentBgImage} 
                  alt="Team login illustration" 
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

export default TeamLoginComponent;
