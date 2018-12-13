import React from 'react';
import styles from './MenuItem.module.css';

const MenuItem = ({ imageUrl, itemName, itemPrice }) => (
  <div className={styles.menuItem}>
    <div>
      <img className={styles.menuItemImage} src={imageUrl} alt={itemName} />
      <h3>{itemName}</h3>
      <p>
        Price:
        <em>
          <b>${itemPrice}</b>
        </em>
      </p>
    </div>
  </div>
);

export default MenuItem;
