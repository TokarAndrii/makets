import React from 'react';
import uuidv4 from 'uuid/v4';
import { colorPalette } from 'material-icons-react';
import StarRateItem from '../shared/StarRateItem';
import './style.css';

const rateHoldersLength = 10;

const MenuItem = ({
  imageUrl,
  itemName,
  itemDescription,
  itemPrice,
  itemIngredients,
  rate,
}) => (
  <div className="menuItem">
    <div>
      <img className="menuItemImage" src={imageUrl} alt={itemName} />
      <h3>{itemName}</h3>
      <p>
        Price:{' '}
        <em>
          <b>${itemPrice}</b>
        </em>
      </p>
      <p className="rateHolders">
        {Array.from({ length: rateHoldersLength })
          .map(() => uuidv4())
          .map((curr, index) => (
            <StarRateItem
              key={curr}
              className="rateItem"
              color={index < rate ? colorPalette.amber._200 : null}
            />
          ))}
      </p>
    </div>
    <div>{itemDescription}</div>
    <div>
      <b>Ingredients:</b>{' '}
      {itemIngredients.map(ingredient => (
        <span key={ingredient}>{ingredient}</span>
      ))}
    </div>
  </div>
);

export default MenuItem;
