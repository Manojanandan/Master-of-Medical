import React from 'react';
import './OurSolution.css';

const OurSolution = () => {
  return (
    <section className="our-solution" id="solutions">
      <div className="solution-container">
        <div className="solution-content">
          <div className="solution-visual">
            <div className="visual-placeholder">
              <div className="placeholder-content">
                <span>Visual Content</span>
              </div>
            </div>
          </div>
          
          <div className="solution-text">
            <h2 className="solution-title">
              <span className="title-our">Our</span>
              <span className="title-solution">Solution</span>
            </h2>
            <p className="solution-intro">
              At Master of Medical (M.O.M), we're not just building a platform we're solving a real, critical problem in India's healthcare supply chain.
            </p>
            
            <div className="solution-stepper">
              <div className="stepper-item">
                <div className="stepper-bullet"></div>
                <div className="stepper-content">
                  <h3 className="stepper-title">The Problem</h3>
                  <p className="stepper-text">
                    India's medical procurement ecosystem is traditionally dependent on multiple layers of intermediaries—distributors, stockists, and agents. This leads to inflated costs, delayed deliveries, inconsistent product quality, and lack of real-time visibility.
                  </p>
                </div>
              </div>
              
              <div className="stepper-item">
                <div className="stepper-bullet"></div>
                <div className="stepper-content">
                  <h3 className="stepper-title">Our Solution</h3>
                  <p className="stepper-text">
                    Direct manufacturer-to-buyer platform with real-time inventory, instant booking, and verified sellers.
                  </p>
                </div>
              </div>
              
              <div className="stepper-item">
                <div className="stepper-bullet"></div>
                <div className="stepper-content">
                  <h3 className="stepper-title">For Sellers</h3>
                  <p className="stepper-text">
                    Expand your reach, reduce distribution costs, and connect directly with healthcare institutions.
                  </p>
                </div>
              </div>
              
              <div className="stepper-item">
                <div className="stepper-bullet"></div>
                <div className="stepper-content">
                  <h3 className="stepper-title">Our Ultimate Goal</h3>
                  <p className="stepper-text">
                    Streamline healthcare procurement for better pricing, faster logistics, and trusted quality across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSolution; 