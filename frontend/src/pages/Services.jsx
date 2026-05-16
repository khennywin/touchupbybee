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
            <div className="service-card" ref={addToServices}>
              <div className="service-icon">BM</div>
              <h3>Bridal Makeup</h3>
              <p>Flawless, long-lasting glam tailored to make you look stunning on your big day.</p>
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
        </div>
      </section>
    </div>
  );
};

export default Services;
