import React from 'react';
import styles from './CategorySelector.module.css';

const CategorySelector = ({ options, value, onChange }) => (
  <select value={value} onChange={onChange} className={styles.select}>
    {options.map(optItem => (
      <option key={optItem.id}>{optItem.name}</option>
    ))}
  </select>
);

export default CategorySelector;
