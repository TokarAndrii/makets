import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import Filter from '../shared/Filter/Filter';

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
        <MenuItem
          key={menuListItem.id}
          imageUrl={menuListItem.image}
          itemDescription={menuListItem.description}
          itemName={menuListItem.name}
          itemPrice={menuListItem.price}
          itemIngredients={menuListItem.ingredients}
          rate={menuListItem.rate}
        />
      ))}
    </div>
  </div>
);

export default Menu;
