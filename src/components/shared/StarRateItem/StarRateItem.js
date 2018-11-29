import React from 'react';
import MaterialIcon from 'material-icons-react';

const StarRateItem = ({ className, sizeStarIcon = 20, color = '' }) => (
  <span className={className}>
    <MaterialIcon icon="star_rate" size={sizeStarIcon} color={color} />
  </span>
);

export default StarRateItem;
