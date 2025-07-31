import React from 'react';
import pharmaLogo from '../../assets/pharmaSiteLogo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={pharmaLogo} alt="Master of Medical" />
              <span>MASTER OF MEDICAL</span>
            </div>
            <p className="footer-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="social-links">
              <span>Follow us on</span>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">📷</a>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
              <li><a href="#">Lorem ipsum dolor sit amet</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Vashista, G-22, Lavish Street, City, State, ZIP Code.</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+1 234 567 8900</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>info@masterofmedical.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 