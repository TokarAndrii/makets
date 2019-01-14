import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import GridLoader from 'react-spinners/GridLoader';
import { colorPalette } from 'material-icons-react';
import Button from '../../components/shared/Button/Button';
import menuApiServices from '../../services/menu-api/menu-api-services';
import StarRateItem from '../../components/shared/StarRateItem/StarRateItem';
import styles from './MenuItemPage.module.css';

const rateHoldersLength = 10;
const INITIAL_STATE = {
  image: '',
  name: '',
  price: '',
  description: '',
  rate: 10,
  category: '',
  ingredients: [],
  isLoading: false,
};

export default class MenuItemPage extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.setIsLoadingTrue();

    menuApiServices.getByIdMenuItem(id).then(menuItem =>
      this.setState({
        isLoading: false,
        image: menuItem.image,
        name: menuItem.name,
        price: menuItem.price,
        description: menuItem.description,
        rate: menuItem.rate,
        category: menuItem.category,
        ingredients: menuItem.ingredients,
      }),
    );
  }

  handleGoBack = () => {
    const { location } = this.props;
    const { state } = location;
    const { category } = this.state;

    if (state) {
      const { history } = this.props;
      return history.push(state.from);
    }

    const { history } = this.props;

    return history.push({
      pathname: '/menu',
      search: `?category=${category}`,
    });
  };

  setIsLoadingTrue = () => this.setState({ isLoading: true });

  render() {
    const {
      image,
      name,
      price,
      description,
      rate,
      category,
      ingredients,
      isLoading,
    } = this.state;
    return (
      <>
        {isLoading && (
          <div className={styles.isLoadingSpinner}>
            <GridLoader
              size={20}
              color="rgb(0, 128, 128)"
              loading
              className={styles.isLoadingSpinner}
            />
          </div>
        )}
        <div className={styles.menuItem}>
          <Button
            text="Back to menu"
            className={styles.loginBtn}
            onClick={this.handleGoBack}
          />
          <div>
            <img className={styles.menuItemImage} src={image} alt={name} />
            <h3>{name}</h3>
            <p>Category: {category}</p>
            <p>
              Price:{' '}
              <em>
                <b>${price}</b>
              </em>
            </p>
            <p className={styles.rateHolders}>
              {Array.from({ length: rateHoldersLength })
                .map(() => uuidv4())
                .map((curr, index) => (
                  <StarRateItem
                    key={curr}
                    className={styles.rateItem}
                    color={index < rate ? colorPalette.amber._200 : null}
                  />
                ))}
            </p>
          </div>
          <div>{description}</div>
          <div>
            <b>Ingredients:</b>{' '}
            {ingredients.map(ingredient => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </div>
        </div>
      </>
    );
  }
}
