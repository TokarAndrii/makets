import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ logoSrc, logoAlt, className }) => (
  <Link to="/">
    <div className={className}>
      <img src={logoSrc} alt={logoAlt} style={{ borderRadius: '100%' }} />
    </div>
  </Link>
);

export default Logo;
