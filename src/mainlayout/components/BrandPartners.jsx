import React from 'react';
import './BrandPartners.css';

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
              <span></span>
            </div>
          </div>
          <div className="brand-card featured">
            <div className="brand-placeholder">
              <span></span>
            </div>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder">
              <span></span>
            </div>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPartners; 