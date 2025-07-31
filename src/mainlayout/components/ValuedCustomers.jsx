import React from 'react';
import './ValuedCustomers.css';
import c1 from '../../assets/c1.jpg';
import c2 from '../../assets/c2.jpg';
import c3 from '../../assets/c3.jpg';

const ValuedCustomers = () => {
  return (
    <section className="valued-customers">
      <div className="customers-container">
        <h2 className="section-title">
          <span className="title-our">Our Valued</span>
          <span className="title-customers">Customers</span>
        </h2>
        <div className="customer-cards">
          <div className="customer-card">
            <div className="customer-placeholder">
              <img src={c1} alt="" srcset="" />
            </div>
          </div>
          {/* featured */}
          <div className="customer-card ">
            <div className="customer-placeholder">
              <img src={c2} alt="" srcset="" />
            </div>
          </div>
          <div className="customer-card">
            <div className="customer-placeholder">
              <img src={c3} alt="" srcset="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuedCustomers; 