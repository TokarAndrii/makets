import React, { Component } from 'react';
import queryString from 'query-string';
import { Link, Switch, Route } from 'react-router-dom';
import GridLoader from 'react-spinners/GridLoader';
import CommentsPage from '../comments/CommentsPage';
import Menu from '../../components/Menu/Menu';
import CategorySelector from '../../components/shared/CategorySelector/CategorySelector';
import * as MenuApiServices from '../../services/menu-api/menu-api-services';
import * as CategoriesApiServices from '../../services/categories-api/categoriesApiServices';

import styles from './MenuPage.module.css';

const INITIAL_STATE = {
  menuList: [],
  filter: '',
  isLoading: false,
  categories: [],
};

const getCategoryFromProps = props =>
  queryString.parse(props.location.search).category;

export default class MenuPage extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setIsLoadingTrue();
    MenuApiServices.getAllMenu().then(menuList => {
      this.setState({ menuList });
    });
    CategoriesApiServices.getAllCategories().then(data => {
      this.setState({ categories: data, isLoading: false });
    });
    const category = getCategoryFromProps(this.props);

    if (!category) {
      const { history } = this.props;
      const { location } = this.props;
      return history.replace({
        pathname: location.pathname,
        search: 'category=all',
      });
    }
    return null;
  }

  setIsLoadingTrue = () => this.setState({ isLoading: true });

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  getFilteredMenu = (filter, menuArray) =>
    menuArray.filter(menuItem =>
      menuItem.name.toLowerCase().includes(filter.toLowerCase()),
    );

  render() {
    const { menuList, isLoading, filter, categories } = this.state;
    const menuFiltered = this.getFilteredMenu(filter, menuList);
    const currentCategory = getCategoryFromProps(this.props);
    return (
      <>
        <Switch>
          <Route exact path="/comments" component={CommentsPage} />
        </Switch>
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
        <h1>Our Menu</h1>
        <CategorySelector
          options={categories}
          value={currentCategory}
          onChange={() => null}
        />
        <Menu
          menuList={menuFiltered}
          className={styles.menu}
          filter={filter}
          onFilterChange={this.handleFilterChange}
        />
        <Link className={styles.commentsLink} to="/comments">
          Read Comments About Us
        </Link>
      </>
    );
  }
}
