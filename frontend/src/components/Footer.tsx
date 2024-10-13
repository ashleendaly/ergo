import React from 'react';
import '../style/Footer.css';

const Header: React.FC = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <img src="../assets/mw-logo.png" alt="Logo" className="logo-image" />
        <img src="../assets/ergo-logo.png" alt="Ergo Logo" className="logo-image" />
      </div>
      <div className="mw-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/launch" className="nav-link">Launch</a>
      </div>
      <div className="ergo-links">
        <a href="https://www.mwam.com/" target="_blank" className="nav-link">Home</a>
        <a href="https://www.linkedin.com/company/marshall-wace/" target="_blank" className="nav-link">LinkedIn</a>
        <a href="https://www.mwam.com/about-us/" target="_blank" className="nav-link">About MW</a>
      </div>
    </footer>
  );
};

export default Header;
