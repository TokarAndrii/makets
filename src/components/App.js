import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import GridLoader from 'react-spinners/GridLoader';

import HomePage from '../pages/home/Home';
import About from '../pages/about/About';
import Delivery from '../pages/delivery/Delivery';
import MenuPage from '../pages/menu/MenuPage';
import Contacts from '../pages/contacts/Contacts';
import AuthPage from '../pages/authPage/AuthPage';
import NotFound from '../pages/notfound/NotFound';
import MenuItemPage from '../pages/menu-item-page/MenuItemPage';
import CommentsPage from '../pages/comments/CommentsPage';
import AddMenuItem from '../pages/add-menu/AddMenuItem';

import AuthContextProvider from '../contexts/AuthContext';
import MenuContestProvider from '../contexts/MenuContext';
import Header from './shared/Header/Header';
import Logo from './shared/Logo/Logo';
import Button from './shared/Button/Button';
import Navigation from './shared/navigation/Navigation';
import AuthManager from './AuthManager/AuthManager';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import FormsPageTabs from './FormsPageTabs/FormsPageTabs';
import navList from '../assets/navigationList';

import routes from '../assets/routes';

import styles from './App.module.css';
import OrdersHistoryPage from '../pages/orders-history/OrdersHistoryPage';

const INITIAL_STATE = {
  isModalOpen: false,
  isLoading: false,
};

class App extends Component {
  state = { ...INITIAL_STATE };

  setIsLoadingTrue = () => this.setState({ isLoading: true });

  render() {
    const { isLoading } = this.state;

    return (
      <AuthContextProvider>
        <MenuContestProvider>
          <div className={styles.App}>
            <Header className={styles.header}>
              <Logo
                className={styles.logo}
                logoSrc="https://placeimg.com/100/100/tech"
                logoAlt="placeimg tech logo"
              />
              <Navigation
                className={styles.navigatoinList}
                navigationMenuList={navList}
                activeClassName={styles.activeNavLink}
              />

              <AuthManager />
            </Header>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path={routes.ABOUT} component={About} />
              <Route path={routes.DELIVERY} component={Delivery} />
              <Route path={routes.CONTACTS} component={Contacts} />
              <Route path={routes.COMMENTS} component={CommentsPage} />
              <Route
                path={routes.ORDER_HISTORY}
                component={OrdersHistoryPage}
              />
              <Route exact path={routes.MENU} component={MenuPage} />
              <Route exact path={routes.ADD_MENU} component={AddMenuItem} />
              <Route path={routes.MENU_ITEM} component={MenuItemPage} />
              <Route
                path={routes.AUTH}
                render={props => (
                  <>
                    <h1>Authentification page Title</h1>
                    <AuthPage {...props}>
                      {() => (
                        <FormsPageTabs>
                          {({
                            showSignUp,
                            showSignIn,
                            clickSignIn,
                            clickSignUp,
                          }) => (
                            <div className={styles.FormsPageTabsHolder}>
                              <div className={styles.tabsBtnsHolder}>
                                <Button
                                  className={
                                    showSignIn
                                      ? styles.activeTabsBtns
                                      : styles.tabsBtns
                                  }
                                  type="text"
                                  text="Sign In"
                                  onClick={clickSignIn}
                                />
                                <Button
                                  className={
                                    showSignUp
                                      ? styles.activeTabsBtns
                                      : styles.tabsBtns
                                  }
                                  type="text"
                                  text="Sign Up"
                                  onClick={clickSignUp}
                                />
                              </div>
                              {showSignIn && (
                                <LoginForm
                                  title="Sign In Form"
                                  buttontext="Sign In"
                                  className={styles.loginForm}
                                />
                              )}
                              {showSignUp && (
                                <RegisterForm
                                  title="Sign Up Form"
                                  buttontext="Sign Up"
                                  className={styles.loginForm}
                                />
                              )}
                            </div>
                          )}
                        </FormsPageTabs>
                      )}
                    </AuthPage>
                  </>
                )}
              />
              <Route component={NotFound} />
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
          </div>
        </MenuContestProvider>
      </AuthContextProvider>
    );
  }
}

export default App;
