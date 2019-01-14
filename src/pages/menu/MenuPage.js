import React, { Component } from 'react';
import queryString from 'query-string';
import { Link, Switch, Route } from 'react-router-dom';
import GridLoader from 'react-spinners/GridLoader';
import { connect } from 'react-redux';

import CommentsPage from '../comments/CommentsPage';
import Menu from '../../components/Menu/Menu';
import AddMenuItem from '../add-menu/AddMenuItem';
import CategorySelector from '../../components/shared/CategorySelector/CategorySelector';
import Button from '../../components/shared/Button/Button';
import * as MenuApiServices from '../../services/menu-api/menu-api-services';

import routes from '../../assets/routes';
import menuOperations from './menuOperations';

import styles from './MenuPage.module.css';

const INITIAL_STATE = {
  filter: '',
};

const getCategoryFromProps = props =>
  queryString.parse(props.location.search).category;

class MenuPage extends Component {
  // static contextType = AuthContext;

  state = { ...INITIAL_STATE };

  // componentDidMount() {
  //   CategoriesApiServices.getAllCategories().then(data => {
  //     this.setState({ categories: data });
  //   });
  //   const category = getCategoryFromProps(this.props);

  //   if (!category) {
  //     const { history } = this.props;
  //     const { location } = this.props;
  //     return history.replace({
  //       pathname: location.pathname,
  //       search: 'category=all',
  //     });
  //   }

  //   this.setIsLoadingTrue();

  //   return MenuApiServices.getAllMenuByCategory(category).then(menuList => {
  //     this.setState({ menuList, isLoading: false });
  //   });
  // }

  componentDidMount() {
    const { fetchMenuList, fetchMenuCategories } = this.props;
    fetchMenuList();
    fetchMenuCategories();
  }

  // componentDidUpdate(prevProps) {
  //   const prevCategory = getCategoryFromProps(prevProps);
  //   const nextCategory = getCategoryFromProps(this.props);

  //   const category = getCategoryFromProps(this.props);

  //   if (!category) {
  //     const { history } = this.props;
  //     const { location } = this.props;
  //     return history.replace({
  //       pathname: location.pathname,
  //       search: 'category=all',
  //     });
  //   }

  //   if (prevCategory !== nextCategory) {
  //     this.setIsLoadingTrue();
  //     MenuApiServices.getAllMenuByCategory(nextCategory).then(menuList => {
  //       this.setState({ menuList, isLoading: false });
  //     });
  //   }

  //   return null;
  // }

  // setIsLoadingTrue = () => this.setState({ isLoading: true });

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  handleAddMenuItem = menuItem => {
    MenuApiServices.addMenuItem(menuItem).then(newMenuItem => {
      this.setState(state => ({
        menuList: [...state.menuList, newMenuItem],
        isLoading: false,
      }));
    });
  };

  handleCategoryChange = category => {
    const { history } = this.props;
    const { location } = this.props;
    history.push({
      pathname: location.pathname,
      search: `category=${category}`,
    });
  };

  handleClearSelector = () => {
    const { history } = this.props;
    const { location } = this.props;
    return history.push({
      pathname: location.pathname,
      search: 'category=all',
    });
  };

  getFilteredMenu = (filter, menuArray) =>
    menuArray.filter(menuItem =>
      menuItem.name.toLowerCase().includes(filter.toLowerCase()),
    );

  render() {
    const { filter } = this.state;
    const { menuList, isLoading, categories } = this.props;
    // const menuFiltered = this.getFilteredMenu(filter, menuList);
    const currentCategory = getCategoryFromProps(this.props);
    const { isAuthenticated } = this.context;

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
        <div>
          <CategorySelector
            options={categories}
            value={currentCategory}
            onChange={this.handleCategoryChange}
          />
          <Button
            text="Clear selector"
            className={styles.clearSelectorBtn}
            onClick={this.handleClearSelector}
          />
        </div>

        {isAuthenticated && (
          <div>
            <Link className={styles.commentsLink} to="/menu/add">
              Add Menu Item
            </Link>
          </div>
        )}

        <Menu
          menuList={menuList}
          className={styles.menu}
          filter={filter}
          onFilterChange={this.handleFilterChange}
          {...this.props}
        />
        <Link className={styles.commentsLink} to="/comments">
          Read Comments About Us
        </Link>
        <Switch>
          <Route exact path={routes.ADD_MENU} component={AddMenuItem} />
        </Switch>
      </>
    );
  }
}

const mdtp = {
  fetchMenuList: menuOperations.fetchMenuList,
  fetchMenuCategories: menuOperations.fetchMenuCategories,
};

const mstp = state => ({
  menuList: state.menuList,
  isLoading: state.isLoading,
  categories: state.menuCategories,
});

export default connect(
  mstp,
  mdtp,
)(MenuPage);
