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
import menuApiServices from '../../services/menu-api/menu-api-services';

import routes from '../../assets/routes';
import menuOperations from './menuOperations';
import menuActions from './duck/menuActions';
import menuSelectors from './duck/menuSelectors';

import styles from './MenuPage.module.css';

const getCategoryFromProps = props =>
  queryString.parse(props.location.search).category;

class MenuPage extends Component {
  componentDidMount() {
    const category = getCategoryFromProps(this.props);
    if (!category) {
      const { history } = this.props;
      const { location } = this.props;
      return history.replace({
        pathname: location.pathname,
        search: 'category=all',
      });
    }
    const { fetchMenuList, fetchMenuCategories } = this.props;
    fetchMenuList(category);
    fetchMenuCategories();
    return null;
  }

  componentDidUpdate(prevProps) {
    const prevCategory = getCategoryFromProps(prevProps);
    const nextCategory = getCategoryFromProps(this.props);

    const category = getCategoryFromProps(this.props);

    if (!category) {
      const { history } = this.props;
      const { location } = this.props;
      return history.replace({
        pathname: location.pathname,
        search: 'category=all',
      });
    }

    if (prevCategory !== nextCategory) {
      const { fetchMenuList } = this.props;
      fetchMenuList(nextCategory);
    }

    return null;
  }

  // setIsLoadingTrue = () => this.setState({ isLoading: true });

  handleFilterChange = filter => {
    const { handleFilterChange } = this.props;
    handleFilterChange(filter);
  };

  handleAddMenuItem = menuItem => {
    menuApiServices.addMenuItem(menuItem).then(newMenuItem => {
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

  render() {
    const { isLoading, categories, filter, menuListFiltered } = this.props;

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
          menuList={menuListFiltered}
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
  handleFilterChange: menuActions.MENU_FILTER_CHANGE,
};

const mstp = state => ({
  isLoading: state.isLoading,
  categories: state.menuCategories,
  filter: state.menuFilter,
  menuListFiltered: menuSelectors.getFilteredMenuList(state),
});

export default connect(
  mstp,
  mdtp,
)(MenuPage);
