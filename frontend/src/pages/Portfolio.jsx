import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const portfolioRef = useRef([]);

  const portfolioImages = [
    { src: '/images/hero_makeup_1.png', title: 'Flawless Glow' },
    { src: '/images/1.jpeg', title: 'Bridal Glamour' },
    { src: '/images/2.jpeg', title: 'Flawless Finish' },
    { src: '/images/3.jpeg', title: 'Traditional Elegance' },
    { src: '/images/4.jpeg', title: 'Gele Masterpiece' },
    { src: '/images/6.jpeg', title: 'Soft Glam' },
    { src: '/images/7.jpeg', title: 'Red Carpet Ready' },
    { src: '/images/8.jpeg', title: 'Classic Beauty' },
    { src: '/images/9.jpeg', title: 'Studio Session' },
    { src: '/images/10.jpeg', title: 'Photoshoot Glam' },
    { src: '/images/11.jpeg', title: 'Gele & Grace' },
    { src: '/images/12.jpeg', title: 'Bold & Beautiful' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    portfolioRef.current.forEach((el, index) => {
      gsap.fromTo(el,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          delay: (index % 3) * 0.15
        }
      );
    });
  }, []);

  const addToPortfolio = (el) => {
    if (el && !portfolioRef.current.includes(el)) {
      portfolioRef.current.push(el);
    }
  };

  return (
    <div className="page-container" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
      <section className="portfolio" id="portfolio">
        <div className="container">
          <h2 className="section-title">Our <span>Portfolio</span></h2>
          <div className="portfolio-grid">
            {portfolioImages.map((img, index) => (
              <div className="portfolio-item" key={index} ref={addToPortfolio}>
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-text">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
