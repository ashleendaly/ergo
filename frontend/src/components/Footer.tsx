import React from 'react';
import '../style/Footer.css';

const Header: React.FC = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <img src="../assets/ergo-logo.png" alt="Ergo Logo" className="logo-image" />
      </div>
    </footer>
  );
};

export default Header;
