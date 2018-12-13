import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../MenuItem/MenuItem';
import Filter from '../shared/Filter/Filter';
import routes from '../../assets/routes';
import styles from './Menu.module.css';

const Menu = ({ menuList = [], className, filter, onFilterChange }) => (
  <div>
    <div style={{ width: '100%', height: '60px', lineHeight: '60px' }}>
      <Filter
        placeholder="type to sort by name"
        filter={filter}
        onFilterChange={onFilterChange}
      />
    </div>
    <div className={className}>
      {menuList.map(menuListItem => (
        <Link to={`${routes.MENU}/${menuListItem.id}`} key={menuListItem.name}>
          <div className={styles.menuItemLink}>
            <MenuItem
              id={menuListItem.id}
              key={menuListItem.id}
              imageUrl={menuListItem.image}
              itemDescription={menuListItem.description}
              itemName={menuListItem.name}
              itemPrice={menuListItem.price}
              itemIngredients={menuListItem.ingredients}
              rate={menuListItem.rate}
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Menu;
