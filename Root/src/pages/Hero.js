import React, { useRef } from "react";
import "../styles/Hero.css"; // Import custom CSS


function Hero() {
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      linkedin: "https://www.linkedin.com/in/alexjohnson",
      photo: "/assets/alex.jpg",
      feedback: "Resumeon helped me land my dream job!"
    },
    {
      id: 2,
      name: "Priya Sharma",
      linkedin: "https://www.linkedin.com/in/priyasharma",
      photo: "/assets/priya.jpg",
      feedback: "The AI suggestions improved my resume instantly!"
    },
    {
      id: 3,
      name: "Michael Lee",
      linkedin: "https://www.linkedin.com/in/michaellee",
      photo: "/assets/michael.jpg",
      feedback: "Best ATS-friendly resume builder I've used!"
    }
  ];

  const marqueeRef = useRef(null);

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      marqueeRef.current.stop(); // Stop the marquee scroll
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      marqueeRef.current.start(); // Resume the marquee scroll
    }
  };

  return (
    <div className="hero-container">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">Resumes that Get You Hired.</h1>
        <p className="hero-subtitle">Powered by Resumeon!</p>
        <a href="/user" className="btn btn-primary hero-btn">Build Your Resume</a>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2 className="features-title">Why Choose Resumeon?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>📄 DOCS</h3>
            <p>You can further edit your resume if you want.</p>
          </div>
          <div className="feature">
            <h3>⚡ Instant PDF</h3>
            <p>Download your resume in a polished PDF format.</p>
          </div>
          <div className="feature">
            <h3>🎯 Choose the Template</h3>
            <p>Get your resume</p>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="reviews-container">
        <h2 className="reviews-title">What Our Users Say</h2>
        {/* Marquee Element */}
        <marquee 
          behavior="scroll" 
          direction="left" 
          scrollamount="10"
          ref={marqueeRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <img src={review.photo} alt={review.name} className="user-photo" />
              <div className="review-info">
                <h3>{review.name}</h3>
                <a href={review.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin linkedin-icon"></i>
                </a>
              </div>
              <div className="mm">
              <p >"{review.feedback}"</p>
              </div>
            </div>
          ))}
        </marquee>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Resumeon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Hero;
