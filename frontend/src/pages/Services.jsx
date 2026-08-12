import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    servicesRef.current.forEach((el, index) => {
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
  }, []);

  const addToServices = (el) => {
    if (el && !servicesRef.current.includes(el)) {
      servicesRef.current.push(el);
    }
  };

  return (
    <div className="page-container" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">Our <span>Signatures</span></h2>
          <div className="services-grid">
            <div className="service-card bridal-package" ref={addToServices}>
              <div className="service-icon">✨</div>
              <div className="package-badge gold-badge">Golden</div>
              <h3>Bridal – Golden Package</h3>
              <ul style={{ textAlign: 'left', paddingLeft: '1.2rem', marginTop: '0.5rem', lineHeight: '1.9' }}>
                <li>1 Makeup Look</li>
                <li>Free Consultation</li>
              </ul>
              <div className="package-meta">
                <span className="package-duration">⏱ 1 hr 20 min</span>
                <span className="package-price">₦200,000</span>
              </div>
            </div>
            <div className="service-card bridal-package" ref={addToServices}>
              <div className="service-icon">💎</div>
              <div className="package-badge diamond-badge">Diamond</div>
              <h3>Bridal – Diamond Package</h3>
              <ul style={{ textAlign: 'left', paddingLeft: '1.2rem', marginTop: '0.5rem', lineHeight: '1.9' }}>
                <li>1 Makeup Look</li>
                <li>Touch-Up</li>
                <li>Free Consultation</li>
              </ul>
              <div className="package-meta">
                <span className="package-duration">⏱ 1 hr 40 min</span>
                <span className="package-price">₦250,000</span>
              </div>
            </div>
            <div className="service-card bridal-package" ref={addToServices}>
              <div className="service-icon">👑</div>
              <div className="package-badge platinum-badge">Platinum</div>
              <h3>Bridal – Platinum Package</h3>
              <ul style={{ textAlign: 'left', paddingLeft: '1.2rem', marginTop: '0.5rem', lineHeight: '1.9' }}>
                <li>1 Makeup Look + 1 Change (Reception Look)</li>
                <li>Free Consultation</li>
                <li>Pre-Wedding Shoot (1 Look)</li>
              </ul>
              <div className="package-meta">
                <span className="package-duration">⏱ 1 hr 45 min</span>
                <span className="package-price">₦350,000</span>
              </div>
            </div>
            <div className="service-card" ref={addToServices}>
              <div className="service-icon">TM</div>
              <h3>Traditional Makeup</h3>
              <p>Culturally rich and perfectly blended makeup to complement your traditional attire.</p>
            </div>
            <div className="service-card" ref={addToServices}>
              <div className="service-icon">BD</div>
              <h3>Birthday Makeup</h3>
              <p>Stand out and shine on your special day with our signature birthday glam.</p>
            </div>
            <div className="service-card" ref={addToServices}>
              <div className="service-icon">GL</div>
              <h3>Gele</h3>
              <p>Expert gele pleating and styling that sits securely and crowns your look elegantly.</p>
            </div>
            <div className="service-card" ref={addToServices}>
              <div className="service-icon">DM</div>
              <h3>Dinner Makeup</h3>
              <p>Sophisticated and striking looks perfect for evening events and red carpets.</p>
            </div>
            <div className="service-card" ref={addToServices}>
              <div className="service-icon">PL</div>
              <h3>Photoshoot Looks</h3>
              <p>High-definition, camera-ready makeup that looks absolutely perfect in every shot.</p>
            </div>
          </div>
          <div className="surcharge-notice">
            <span>⚠️</span>
            <p>
              <strong>Please Note:</strong> Early morning appointments attract an additional <strong>₦5,000</strong> surcharge.
              Late coming also attracts <strong>₦5,000</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
