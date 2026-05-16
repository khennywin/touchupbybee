import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Wave = ({ color = '#ffffff', inverted = false }) => {
  const waveRef = useRef(null);

  useEffect(() => {
    // Simple realistic floating physics animation for the wave using GSAP
    gsap.to(waveRef.current, {
      y: 10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div 
      style={{ 
        width: '100%', 
        overflow: 'hidden', 
        lineHeight: 0, 
        transform: inverted ? 'rotate(180deg)' : 'none',
        marginTop: inverted ? '0' : '-1px', // Prevent sub-pixel gaps
        marginBottom: inverted ? '-1px' : '0',
      }}
    >
      <svg 
        ref={waveRef}
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        style={{ width: 'calc(100% + 1.3px)', height: '70px', display: 'block' }}
      >
        <path 
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
          style={{ fill: color }}
        ></path>
      </svg>
    </div>
  );
};

export default Wave;
