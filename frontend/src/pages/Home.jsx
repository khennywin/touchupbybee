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

  // Your WhatsApp number in international format (no + or spaces)
  const WHATSAPP_NUMBER = '2348164788888';

  const serviceLabels = {
    bridal_silver: 'Bridal Package – Silver (Consultation + White Wedding)',
    bridal_gold: 'Bridal Package – Gold (Consultation + White + Traditional + Reception)',
    bridal_bronze: 'Bridal Package – Bronze (Consultation + Traditional + White + Pre-Wedding Shoot + 1 Complementary Bridesmaid + Touch-Up)',
    traditional_makeup: 'Traditional Makeup',
    birthday_makeup: 'Birthday Makeup',
    gele: 'Gele',
    dinner_makeup: 'Dinner Makeup',
    photoshoot_looks: 'Photoshoot Looks',
  };

  const locationLabels = {
    studio: 'Studio (Ojodu/Ikeja)',
    home_call: 'Home Call (Lagos Mainland)',
    home_call_island: 'Home Call (Lagos Island)',
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullName    = e.target.fullName.value.trim();
    const phone       = e.target.phone.value.trim();
    const eventDate   = e.target.eventDate.value;
    const eventTime   = e.target.eventTime.value;
    const service     = serviceLabels[e.target.service.value] || e.target.service.value;
    const locationType = locationLabels[e.target.locationType.value] || e.target.locationType.value;

    const message =
      `Hello Touchupbybee! 🌸 I'd like to book an appointment.%0A%0A` +
      `*Name:* ${encodeURIComponent(fullName)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Event Date:* ${encodeURIComponent(eventDate)}%0A` +
      `*Preferred Start Time:* ${encodeURIComponent(eventTime)}%0A` +
      `*Service:* ${encodeURIComponent(service)}%0A` +
      `*Location:* ${encodeURIComponent(locationType)}%0A%0A` +
      `Please let me know your availability. Thank you!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

    e.target.reset();
    setIsSubmitting(false);
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
                  <input type="text" id="fullName" name="fullName" required placeholder="Jane Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">WhatsApp / Phone Number</label>
                  <input type="tel" id="phone" name="phone" required placeholder="e.g. 08012345678" />
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
                  <select id="service" name="service" required defaultValue="">
                    <option value="" disabled>Select a service...</option>
                    <optgroup label="── Bridal Packages ──">
                      <option value="bridal_silver">Bridal – Silver (Consultation + White Wedding)</option>
                      <option value="bridal_gold">Bridal – Gold (Consultation + White + Traditional + Reception)</option>
                      <option value="bridal_bronze">Bridal – Bronze (Consultation + Traditional + White + Pre-Wedding Shoot + 1 Complementary Bridesmaid + Touch-Up)</option>
                    </optgroup>
                    <optgroup label="── Other Services ──">
                      <option value="traditional_makeup">Traditional Makeup</option>
                      <option value="birthday_makeup">Birthday Makeup</option>
                      <option value="gele">Gele</option>
                      <option value="dinner_makeup">Dinner Makeup</option>
                      <option value="photoshoot_looks">Photoshoot Looks</option>
                    </optgroup>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="locationType">Location Preference</label>
                  <select id="locationType" name="locationType" required defaultValue="">
                    <option value="" disabled>Select location type...</option>
                    <option value="studio">Studio (Ojodu/Ikeja)</option>
                    <option value="home_call">Home Call (Lagos Mainland)</option>
                    <option value="home_call_island">Home Call (Lagos Island)</option>
                  </select>
                </div>
              </div>
              <div className="terms-text">
                <strong>Important Booking Terms:</strong> A 50% non-refundable deposit is required to secure all dates. Early morning call times (before 6:00 AM) incur an additional premium early-call surcharge.
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Opening WhatsApp...' : '📲 Book via WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
