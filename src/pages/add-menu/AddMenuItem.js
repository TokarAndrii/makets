import React, { Component } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import * as CategoriesApiServices from '../../services/categories-api/categoriesApiServices';
import * as MenuApiServices from '../../services/menu-api/menu-api-services';
import styles from './AddMenuItem.module.css';

const INITIAL_STATE = {
  id: '',
  rate: 10,
  name: '',
  description: '',
  image: 'https://placeimg.com/640/480/grayscale',
  price: '',
  category: 'soup',
  ingredients: [],
  isLoading: false,
  categories: [],
};

export default class AddMenuItem extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setIsLoadingTrue();
    CategoriesApiServices.getAllCategories().then(data => {
      this.setState({ categories: data, isLoading: false });
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleChangeCategory = ({ target }) => {
    const { value } = target;
    this.setState({ category: value });
  };

  handleChangeIngredients = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value.split(',') });
  };

  handleAddMenuItem = () => {
    const {
      rate,
      name,
      description,
      image,
      price,
      category,
      ingredients,
    } = this.state;
    const itemMenu = {
      rate,
      name,
      description,
      image,
      price,
      category,
      ingredients,
    };

    this.setIsLoadingTrue();
    MenuApiServices.addMenuItem(itemMenu).then(newMenuItem => {
      this.setState(state => ({
        menuList: [...state.menuList, newMenuItem],
        isLoading: false,
      }));
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleAddMenuItem();
    this.setState({ ...INITIAL_STATE });
  };

  setIsLoadingTrue = () => this.setState({ isLoading: true });

  render() {
    const {
      rate,
      name,
      description,
      image,
      price,
      category,
      categories,
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
        <form className={styles.addMenuItemForm}>
          <h2 className={styles.formTitle}>Add Menu Item page</h2>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="rate">
              rate
              <b className={styles.raitingHolder}>{rate}</b>
            </label>
            <Input
              className="input"
              name="rate"
              type="range"
              onChange={this.handleChange}
              value={rate}
              min="1"
              max="10"
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="name">
              name
            </label>
            <Input
              className="input"
              name="name"
              type="text"
              onChange={this.handleChange}
              value={name}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="image">
              image
            </label>
            <Input
              className="input"
              name="image"
              type="url"
              onChange={this.handleChange}
              value={image}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              className="commentsTextArea"
              name="description"
              cols="150"
              rows="10"
              placeholder="input description here"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="price">
              price
            </label>
            <Input
              className="input"
              name="price"
              type="number"
              onChange={this.handleChange}
              value={price}
              min="0"
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="category">
              category
            </label>
            <select
              value={category}
              onChange={this.handleChangeCategory}
              className={styles.select}
            >
              {categories.map(optItem => (
                <option key={optItem.id} value={optItem.name}>
                  {optItem.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="ingredients">
              ingredients
            </label>
            <textarea
              className="commentsTextArea"
              name="ingredients"
              cols="150"
              rows="10"
              placeholder="input ingredients here comma separated"
              value={ingredients}
              onChange={this.handleChangeIngredients}
            />
          </div>
          <div className="row">
            <Button
              className={styles.loginBtn}
              type="text"
              text="Add"
              onClick={this.handleSubmit}
            />
          </div>
        </form>
      </>
    );
  }
}
