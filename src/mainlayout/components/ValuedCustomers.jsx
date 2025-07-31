import React from 'react';
import './ValuedCustomers.css';

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
              <span>Customer 1</span>
            </div>
          </div>
          <div className="customer-card featured">
            <div className="customer-placeholder">
              <span>Featured</span>
            </div>
          </div>
          <div className="customer-card">
            <div className="customer-placeholder">
              <span>Customer 2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuedCustomers; 