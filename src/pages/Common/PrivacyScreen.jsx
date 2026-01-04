import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeader from '../../components/layout/UserHeader';
import UserFooter from '../../components/layout/UserFooter';
import './PrivacyScreen.css';

const PrivacyScreen = () => {
  const location = useLocation();

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="privacy-screen">
      <UserHeader />
      
      <div className="privacy-container">
        <div className="privacy-content">
          <section className="privacy-section">
            <h1 className="privacy-main-title">Privacy Policy</h1>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Information Collection and Use:</h2>
            <p className="privacy-description">
              Gatividhi collects personal information when you register with Gatividhi or our network partners. During registration, we may ask for information such as your name, email, phone number, address, date of birth, gender, zip code, occupation, industry, and interests. For certain financial products, we may also ask for your address and information about your assets. Once you register and sign in to our services, you are not anonymous to us.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Information Sharing and Disclosure:</h2>
            <p className="privacy-description">
              Gatividhi does not rent, sell, or share personal information about you with other people or non-affiliated companies except to provide products or services you've requested, when we have your permission, or under the following circumstances:
            </p>
            <ul className="privacy-list">
              <li className="privacy-list-item">
                We provide the information to trusted partners who work on behalf of or with Gatividhi under confidentiality agreements. These companies may use your personal information to help Gatividhi communicate with you about offers from Gatividhi and our marketing partners. However, these companies do not have any independent right to share this information.
              </li>
              <li className="privacy-list-item">
                We respond to subpoenas, court orders, or legal process, or to establish or exercise our legal rights or defend against legal claims.
              </li>
              <li className="privacy-list-item">
                We believe it is necessary to share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of Gatividhi's terms of use, or as otherwise required by law.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Cookies:</h2>
            <p className="privacy-description">
              Gatividhi may set and access cookies on your computer to customize the user experience. A cookie is a small amount of data that is sent to your browser from a web server and stored on your computer's hard drive.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Your Account Information and Preferences:</h2>
            <p className="privacy-description">
              You can edit your Gatividhi account information at any time. We reserve the right to send you certain communications relating to the Gatividhi service, such as service announcements, administrative messages, and the Gatividhi Newsletter, that are considered part of your Gatividhi account, without offering you the opportunity to opt-out of receiving them.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Changes to this Privacy Policy:</h2>
            <p className="privacy-description">
              Gatividhi may update this policy. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your Gatividhi account or by placing a prominent notice on our site.
            </p>
          </section>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default PrivacyScreen;
