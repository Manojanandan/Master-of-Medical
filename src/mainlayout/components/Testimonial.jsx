import React, { useState } from 'react';
import './Testimonial.css';

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Dr. Rajeev Menon",
      title: "Procurement Head, MedLink Hospitals",
      quote: "Since using Master of Medical, we've cut our procurement time in half and improved our margins significantly. It's a game changer."
    },
    {
      name: "Dr. Priya Bansal",
      title: "Director, Lifecare Diagnostics",
      quote: "The platform is intuitive, inventory updates are live, and customer service is top-notch. Highly recommended."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonial">
      <div className="testimonial-container">
        <h2 className="section-title">Testimonial</h2>
        <div className="testimonial-carousel">
          <button className="carousel-btn prev" onClick={prevSlide}>
            ‹
          </button>
          
          <div className="testimonial-cards">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="quote-marks">"</div>
                <div className="testimonial-header">
                  <div className="testimonial-avatar"></div>
                  <div className="author-info">
                    <h3 className="author-name">{testimonial.name}</h3>
                    <p className="author-title">{testimonial.title}</p>
                  </div>
                </div>
                
                <div className="testimonial-divider"></div>
                
                <div className="testimonial-content">
                  <p className="testimonial-quote">{testimonial.quote}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn next" onClick={nextSlide}>
            ›
          </button>
        </div>
        
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 