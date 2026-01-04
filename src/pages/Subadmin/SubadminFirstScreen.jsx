import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import agentBgImage from '../../assets/images/agentbgimage.png';
import './SubadminFirstScreen.css';

const SubadminFirstScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleSignUp = () => {
    // Navigate to sign up page
    navigate('/subadmin/signup');
  };

  const handleSignIn = () => {
    // Navigate to sign in page
    navigate('/subadmin/signin');
  };

  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          <line x1="15" y1="11" x2="23" y2="11"></line>
        </svg>
      ),
      title: 'Share with Client Link',
      description: 'Earn passive income by sharing your link with clients to book on their own'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M2 12h20"></path>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      title: 'Unmatched global supply',
      description: 'Over 300,000 products across 2,500 destinations worldwide'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2"></rect>
          <path d="M8 6h8"></path>
          <path d="M8 10h8"></path>
          <path d="M8 14h4"></path>
          <circle cx="18" cy="6" r="2" fill="currentColor"></circle>
        </svg>
      ),
      title: 'Commission on all products',
      description: 'From multi-day tours to transfers and shore excursions, you\'ll earn on everything'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
          <path d="M7 16h10"></path>
          <circle cx="6" cy="7" r="1"></circle>
          <circle cx="12" cy="7" r="1"></circle>
          <circle cx="18" cy="7" r="1"></circle>
        </svg>
      ),
      title: 'Reserve Now & Pay Later',
      description: 'Keep things flexible by securing activities with no upfront payment'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      title: 'Track your success',
      description: 'Weekly payouts and robust reporting to manage bookings and commissions'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M13 8H7"></path>
          <path d="M17 12H7"></path>
          <path d="M17 16H7"></path>
        </svg>
      ),
      title: '24/7 customer support',
      description: 'Award-winning customer support for both you and your clients'
    }
  ];

  return (
    <div className="subadmin-first-screen">
      <UserHeader />
      
      {/* Hero Section */}
      <section className="subadmin-hero">
        <div className="subadmin-hero-container">
          <div className="subadmin-hero-content">
            <div className="subadmin-hero-left">
              <h1 className="subadmin-hero-title">
                Turn every client's trip into a <span className="highlight-green">memorable adventure</span>
              </h1>
              <p className="subadmin-hero-description">
                Multiple easy and flexible booking options to maximize earnings - book for clients or earn when they book on their own.
              </p>
              <div className="subadmin-hero-buttons">
                <button className="btn-signup" onClick={handleSignUp}>
                  Sign up
                </button>
                <button className="btn-signin" onClick={handleSignIn}>
                  Sign in
                </button>
              </div>
            </div>
            
            <div className="subadmin-hero-right">
              <div className="subadmin-hero-image-wrapper">
                <img 
                  src={agentBgImage} 
                  alt="Travel experiences collage" 
                  className="subadmin-hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="why-join-section">
        <div className="why-join-container">
          <h2 className="why-join-title">Why Join Gatividhi's Travel Agent Program?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">
                  {benefit.icon}
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UserFooter />
    </div>
  );
};

export default SubadminFirstScreen;
