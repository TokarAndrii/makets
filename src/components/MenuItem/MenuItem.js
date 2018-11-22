import React from 'react';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import './style.css';

const MenuItem = ({
  imageUrl,
  itemName,
  itemDescription,
  itemPrice,
  itemIngredients,
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
        <span className="rateItem">
          <MaterialIcon
            icon="star_rate"
            size={20}
            color={colorPalette.amber._200}
          />
        </span>
        <span className="rateItem">
          <MaterialIcon
            icon="star_rate"
            size={20}
            color={colorPalette.amber._200}
          />
        </span>
        <span className="rateItem">
          <MaterialIcon
            icon="star_rate"
            size={20}
            color={colorPalette.amber._200}
          />
        </span>
        <span className="rateItem">
          <MaterialIcon icon="star_rate" size={20} />
        </span>
        <span className="rateItem">
          <MaterialIcon icon="star_rate" size={20} />
        </span>
        <span className="rateItem">
          <MaterialIcon icon="star_rate" size={20} />
        </span>
        <span className="rateItem">
          <MaterialIcon icon="star_rate" size={20} />
        </span>
        <span className="rateItem">
          <MaterialIcon icon="star_rate" size={20} />
        </span>
        <span className="rateItem">
          <MaterialIcon icon="star_rate" size={20} />
        </span>
        <span className="rateItem">
          <MaterialIcon icon="star_rate" size={20} />
        </span>
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
