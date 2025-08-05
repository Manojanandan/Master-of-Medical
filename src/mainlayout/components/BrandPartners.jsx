import React from 'react';
import './BrandPartners.css';
import c1 from '../../assets/c1.jpg';
import c2 from '../../assets/c2.jpg';
import c3 from '../../assets/c3.jpg';
import c4 from '../../assets/c4.jpg';

const BrandPartners = () => {
  return (
    <section className="brand-partners">
      <div className="brand-partners-container">
        <h2 className="section-title">
          <span className="title-our-brand">Our Brand</span>
          <span className="title-partners">Partners</span>
        </h2>
        <div className="brand-cards">
          <div className="brand-card">
            <div className="brand-placeholder">
              <img src={c1} alt="" srcSet="" />
            </div>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder">
              <img src={c2} alt="" srcSet="" />
            </div>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder">
              <img src={c3} alt="" srcSet="" />
            </div>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder">
              <img src={c4} alt="" srcSet="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPartners; 