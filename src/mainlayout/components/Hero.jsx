import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
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

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line highlight">Empowering</span>
              <span className="title-line ">DIGITAL INDIA</span>
              <span className="title-line">Through Smart Procurement</span>
            </h1>
            <p className="hero-description">
              With real-time inventory, instant booking, and verified sellers, M.O.M simplifies medical sourcing for hospitals, clinics, and labs.
            </p>
            <button className="hero-cta" onClick={handleJoinNow}>
              Join Now
            </button>
          </div>
          
          <div className="hero-visual">
            <div className="medical-crosses">
              <span className="cross">+</span>
              <span className="cross">+</span>
              <span className="cross">+</span>
              <span className="cross">+</span>
              <span className="cross">+</span>
              <span className="cross">+</span>
            </div>
            
            <div className="doctor-silhouette">
              <div className="silhouette-body"></div>
            </div>
            
            <div className="hero-cards">
              <div className="hero-card connect-doctor">
                <div className="card-icon">
                  <div className="icon-bg">
                    <span>📹</span>
                  </div>
                </div>
                <span className="card-text">Connect Doctor</span>
              </div>
            </div>
            <div className="hero-cards-two">      
              <div className="hero-card join-stats">
                <div className="stats-text">95K+ Join in already</div>
                <div className="user-avatars">
                  <div className="avatar purple"></div>
                  <div className="avatar purple"></div>
                  <div className="avatar purple"></div>
                  <div className="avatar purple"></div>
                  <div className="avatar purple"></div>
                  <div className="avatar orange">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 