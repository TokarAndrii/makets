import React from 'react';
import './styles.css';

const Navigation = ({ navigationMenuList, className }) => (
  <ul className={className}>
    {navigationMenuList.map(navigationMenuListItem => (
      <li className="navigationItem" key={navigationMenuListItem.id}>
        {navigationMenuListItem.name}
      </li>
    ))}
  </ul>
);

export default Navigation;
