import React from 'react';
import '../style/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
        <div className='flex-container'>
        <div className="logos">
            <img src="/images/mw-logo.png" alt="MW Logo" className="logo-image" />
            <img src="/images/ergo-logo.png" alt="Ergo Logo" className="logo-image" />
        </div>
      </div>    
    </header>
  );
};

export default Header;
