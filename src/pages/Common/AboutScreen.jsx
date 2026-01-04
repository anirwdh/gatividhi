import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import './AboutScreen.css';

const AboutScreen = () => {
  const location = useLocation();

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="about-screen">
      <UserHeader />
      
      <div className="about-container">
        <div className="about-content">
          <section className="about-section">
            <h1 className="about-main-title">Do More With Gatividhi</h1>
            <p className="about-greeting">Hello, we're Gatividhi.</p>
            <p className="about-description">
              Welcome to Gatividhi, your gateway to thrilling adventures and unforgettable experiences! Established in 2021, Gatividhi is a brand under MISAMYA SOLUTIONS PVT LTD, dedicated to providing exciting activities and daily tours for adventure enthusiasts and travelers alike.
            </p>
            <p className="about-description">
              At Gatividhi, we believe in the power of exploration and the joy of discovering new horizons. Whether you're seeking the adrenaline rush of water sports, the exhilaration of paragliding, or the charm of local sightseeing, we have something for everyone. Our carefully curated experiences are designed to create lasting memories and foster a deep connection with the world around us.
            </p>
            <p className="about-description">
              With a commitment to safety, quality, and customer satisfaction, Gatividhi ensures that every adventure is not only thrilling but also worry-free. Join us on a journey of discovery and experience the world in a whole new way with Gatividhi.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">About Us</h2>
            <div className="about-info-grid">
              <div className="about-info-item">
                <span className="about-info-label">Brand Name</span>
                <span className="about-info-value">Gatividhi</span>
              </div>
              <div className="about-info-item">
                <span className="about-info-label">Company name</span>
                <span className="about-info-value">MISAMYA SOLUTIONS Pvt Ltd</span>
              </div>
             
            </div>
          </section>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default AboutScreen;
