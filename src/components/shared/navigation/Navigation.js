import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ navigationMenuList, className, activeClassName }) => (
  <ul className={className}>
    {navigationMenuList.map(navigationMenuListItem => (
      <NavLink
        className={styles.navigationItem}
        key={navigationMenuListItem.id}
        to={navigationMenuListItem.path}
        activeClassName={activeClassName}
      >
        {navigationMenuListItem.name}
      </NavLink>
    ))}
  </ul>
);

export default Navigation;
