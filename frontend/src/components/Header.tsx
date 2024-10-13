import React from 'react';
import '../style/Header.css';
// import ergoLogo from '../assets/ergo-logo.png'
// import mwLogo from '../assets/mw-logo.png'

const Header: React.FC = () => {
  return (
    <header className="header">
        <div className='flex-container'>
        <div className="logos">
            <img src="/images/mw-logo.png" alt="MW Logo" className="logo-image" />
            <img src="/images/ergo-logo.png" alt="Ergo Logo" className="logo-image" />
        </div>
        {/* <nav className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/launch" className="nav-link">Launch</a>
        </nav> */}
      </div>    
    </header>
  );
};

export default Header;
