import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import OrderHistoryPage from '../orders-history/OrdersHistoryPage';
import routes from '../../assets/routes';
import styles from './Home.module.css';

export default class Home extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated } = this.context;
    return (
      <>
        <Switch>
          <Route exact path="/comments" component={OrderHistoryPage} />
        </Switch>
        <h1 className={styles.title}>Welcome to Tokars Foodies </h1>
        {isAuthenticated && (
          <Link className={styles.link} to={routes.ORDER_HISTORY}>
            Orders History
          </Link>
        )}

        {!isAuthenticated && (
          <img
            src="./home-page-img.jpg"
            alt="home-page"
            className={styles.homePageImg}
          />
        )}
      </>
    );
  }
}
