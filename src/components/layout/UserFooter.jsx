import './UserFooter.css';

const UserFooter = () => {
  return (
    <footer className="user-footer">
      {/* Social Media Icons */}
      <div className="footer-social-icons">
        <a href="https://facebook.com" aria-label="Facebook" className="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="https://twitter.com" aria-label="X (Twitter)" className="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://pinterest.com" aria-label="Pinterest" className="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c5.302 0 9.841-3.158 11.809-7.68-.12-.936-.064-2.036.198-3.127.217-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.544-5.409 5.199 0 1.033.394 2.143.889 2.748.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.001 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        </a>
        <a href="https://instagram.com" aria-label="Instagram" className="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://youtube.com" aria-label="YouTube" className="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a href="https://tiktok.com" aria-label="TikTok" className="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
      </div>

      {/* Rating Section */}
      <div className="footer-rating">
        <div className="rating-stars">
          <span className="star filled">★</span>
          <span className="star filled">★</span>
          <span className="star filled">★</span>
          <span className="star filled">★</span>
          <span className="star half">★</span>
        </div>
        <span className="rating-text">4.4 rating | 296,164 reviews</span>
        <div className="trustpilot">
          <span className="trustpilot-star">★</span>
          <span className="trustpilot-text">Trustpilot</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="footer-links">
        <div className="footer-column">
          <a href="/help">Help Center</a>
          <a href="/privacy">Privacy and Cookies Statement</a>
          <a href="/about">About Gatividhi</a>
        </div>
        <div className="footer-column">
          <a href="/careers">Careers</a>
          <a href="/sitemap">Sitemap</a>
          <a href="/supplier">Supplier Sign Up</a>
        </div>
        <div className="footer-column">
          <a href="/travel-agents">Travel Agents</a>
          <a href="/affiliate">Become an Affiliate</a>
          <a href="/news">News</a>
        </div>
        <div className="footer-column">
          <a href="/blog">Gatividhi blog</a>
          <a href="/accessibility">Accessibility</a>
        </div>
      </div>

      {/* Divider */}
      <hr className="footer-divider" />

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-apps">
          <a href="https://play.google.com" className="app-button google-play" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm5.714 10.714l-6.071 3.571-3.571-3.571 3.571-3.571 6.071 3.571zm-9.071-5.714l6.071 3.571-6.071 3.571V5zm0 10v-3.571l6.071 3.571-6.071 3.571z"/>
            </svg>
            <span>GET IT ON<br />Google Play</span>
          </a>
          <a href="https://apps.apple.com" className="app-button app-store" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.5 2.5c.276 0 .5.224.5.5v14c0 .276-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5V3c0-.276.224-.5.5-.5h7zm-.5 1h-6v13h6V3.5zm-4 2c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5zm-1 3h2v1h-2v-1zm0 2h2v1h-2v-1zm0 2h1v1h-1v-1z"/>
            </svg>
            <span>Download on the<br />App Store</span>
          </a>
        </div>
        <div className="footer-copyright">
          <p>© 1997-2025 Gatividhi, Inc.</p>
          <div className="footer-legal-links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/how-it-works">How Gatividhi works</a>
            <a href="/cookies">Cookie Consent</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;

