import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import BrandPartners from './components/BrandPartners';
import OurSolution from './components/OurSolution';
import ValuedCustomers from './components/ValuedCustomers';
import MeetOurTeam from './components/MeetOurTeam';
import Testimonial from './components/Testimonial';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* <Nav /> */}
      <Hero />
      <BrandPartners />
      <OurSolution />
      <ValuedCustomers />
      <MeetOurTeam />
      <Testimonial />
      <BlogPost />
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout; 