import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroCtaRef = useRef(null);

  
  const valuesRef = useRef([]);
  const bookingRef = useRef(null);

  useEffect(() => {
    // Initial Hero text animation
    const tl = gsap.timeline();
    tl.fromTo(heroTitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    )
    .fromTo(heroSubtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      "-=1"
    )
    .fromTo(heroCtaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
    );

    // Scroll Animations for Value Panel
    valuesRef.current.forEach((el, index) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          delay: index * 0.2
        }
      );
    });

    // Scroll Animation for Booking
    if (bookingRef.current) {
      gsap.fromTo(bookingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: bookingRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);



  const addToValues = (el) => {
    if (el && !valuesRef.current.includes(el)) {
      valuesRef.current.push(el);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      eventDate: e.target.eventDate.value,
      eventTime: e.target.eventTime.value,
      service: e.target.service.value,
      locationType: e.target.locationType.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Booking request sent successfully!');
        e.target.reset();
      } else {
        alert(data.error || 'Failed to send request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please make sure the backend server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header className="hero" id="home">
        <video 
          className="hero-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/images/banner cover.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title" ref={heroTitleRef}>Elevate Your Beauty</h1>
          <p className="hero-subtitle" ref={heroSubtitleRef}>
            Feel beautiful, look beautiful
          </p>
          <a href="#book" className="cta-btn" ref={heroCtaRef}>
            Book Your Experience
          </a>
        </div>
      </header>
      
      {/* Values Section */}
      <section className="value-panel">
        <div className="container">
          <div className="values-grid">
            <div className="value-item" ref={addToValues}>
              <h3>Flawless Longevity</h3>
              <p>Techniques mastered to ensure your glam remains impeccable, withstanding the Lagos heat and humidity from dawn till dusk.</p>
            </div>
            <div className="value-item" ref={addToValues}>
              <h3>Master Gele Pleating</h3>
              <p>Architectural, culturally rooted, and highly secure gele styling that crowns your traditional attire with royalty.</p>
            </div>
            <div className="value-item" ref={addToValues}>
              <h3>Punctual Delivery</h3>
              <p>Elite service demands elite timing. We pride ourselves on strict schedule adherence for completely stress-free event mornings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking" id="book" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <h2 className="section-title">Secure Your <span>Date</span></h2>
          <div className="booking-container" ref={bookingRef}>
            <form onSubmit={handleBookingSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" required placeholder="Jane Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required placeholder="jane@example.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="eventDate">Event Date</label>
                  <input type="date" id="eventDate" required />
                </div>
                <div className="form-group">
                  <label htmlFor="eventTime">Preferred Start Time</label>
                  <input type="time" id="eventTime" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service">Required Service</label>
                  <select id="service" required defaultValue="">
                    <option value="" disabled>Select a service...</option>
                    <option value="bridal_makeup">Bridal Makeup</option>
                    <option value="traditional_makeup">Traditional Makeup</option>
                    <option value="birthday_makeup">Birthday Makeup</option>
                    <option value="gele">Gele</option>
                    <option value="dinner_makeup">Dinner Makeup</option>
                    <option value="photoshoot_looks">Photoshoot Looks</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="locationType">Location Preference</label>
                  <select id="locationType" required defaultValue="">
                    <option value="" disabled>Select location type...</option>
                    <option value="studio">Studio (Ojodu/Ikeja)</option>
                    <option value="home_call">House Call (Lagos Mainland)</option>
                    <option value="home_call_island">House Call (Lagos Island)</option>
                  </select>
                </div>
              </div>
              <div className="terms-text">
                <strong>Important Booking Terms:</strong> A 50% non-refundable deposit is required to secure all dates. Early morning call times (before 6:00 AM) incur an additional premium early-call surcharge.
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Request Booking Availability'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
