import React from 'react';
import './BlogPost.css';

const BlogPost = () => {
  const blogPosts = [
    {
      date: "19 April 2008 02:23 AM",
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      date: "18 April 2008 10:15 AM",
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      date: "17 April 2008 03:45 PM",
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];

  return (
    <section className="blog-post">
      <div className="blog-container">
        <h2 className="section-title">Blog Post</h2>
        <div className="blog-cards">
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card">
              <div className="blog-image">
                <div className="image-placeholder">
                  <span>📷</span>
                </div>
              </div>
              <div className="blog-content">
                <p className="blog-date">{post.date}</p>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-description">{post.description}</p>
                <div className="read-more">
                  <span>Read More</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="blog-cta">
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default BlogPost; 