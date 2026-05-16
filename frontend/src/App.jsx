import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      {/* Footer */}
      <footer className="footer-extended">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Touchupbybe</h4>
              <p>Feel beautiful, look beautiful.</p>
            </div>
            <div className="footer-col">
              <h4>Visit Us</h4>
              <p>17 Ogo Oluwa St, Ojodu,<br />Ojodu Berger 112107, Ogun State</p>

            </div>
            <div className="footer-col">
              <h4>Contact & Hours</h4>
              <p>Phone: <a href="tel:08164788888" className="footer-link">0816 478 8888</a></p>
              <p>Hours: Open · Closes 12 am</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Touchupbybe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Router>
  );
};

export default App;
