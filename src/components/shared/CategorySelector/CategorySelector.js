import React from 'react';
import styles from './CategorySelector.module.css';

const CategorySelector = ({ options, value, onChange }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className={styles.select}
  >
    {options.map(optItem => (
      <option key={optItem.id} value={optItem.name}>
        {optItem.name}
      </option>
    ))}
  </select>
);

export default CategorySelector;
