import React from 'react';
import { useNavigate } from 'react-router-dom';
import pharmaLogo from '../../assets/pharmaSiteLogo.png';
import './Nav.css';

const Nav = () => {
  const navigate = useNavigate();
  
  const handleShopNowClick = () => {
    const jwt = sessionStorage.getItem('jwt');
    const userType = sessionStorage.getItem('userType');
    
    if (jwt && userType) {
      if (userType === 'user' || userType === 'customer') {
        navigate('/customer');
      } else if (userType === 'vendor') {
        navigate('/vendor');
      }
    } else {
      sessionStorage.setItem("userType", "user");
      navigate('/auth/register');
    }
  };
  
  const handleBeASellerClick = () => {
    const jwt = sessionStorage.getItem('jwt');
    const userType = sessionStorage.getItem('userType');
    
    if (jwt && userType) {
      if (userType === 'user' || userType === 'customer') {
        navigate('/customer');
      } else if (userType === 'vendor') {
        navigate('/vendor');
      }
    } else {
      sessionStorage.setItem("userType", "vendor");
      navigate('/auth/register');
    }
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={pharmaLogo} alt="Master of Medical" />
          <span className="logo-text">MASTER OF MEDICAL</span>
        </div>
        
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#solutions" className="nav-link">Our Solutions</a>
          <a href="#reach" className="nav-link">Reach Us</a>
        </div>
        
        <div className="nav-buttons">
          <button className="nav-btn shop-now" onClick={handleShopNowClick}>
            <span className="btn-icon">🛒</span>
            <span>Shop Now</span>
          </button>
          <button className="nav-btn be-seller" onClick={handleBeASellerClick}>
            <span className="btn-icon">🔒</span>
            <span>BE A SELLER</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 