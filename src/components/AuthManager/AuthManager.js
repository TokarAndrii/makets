import React, { Component } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import UserMenu from '../shared/UserMenu/UserMenu';
import Button from '../shared/Button/Button';
import styles from './AuthManager.module.css';

export default class AuthManager extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    // console.log(this.context, 'this.context componentDidMount');
  }

  render() {
    const { isAuthenticated, onSignIn, onSignOut, user } = this.context;
    return isAuthenticated ? (
      <UserMenu
        handleOpenDropDownMenu={this.handleOpenDropDownMenu}
        className={styles.userMenu}
        onSignOut={onSignOut}
        user={user}
      />
    ) : (
      <Button
        className={styles.loginBtn}
        type="text"
        text="Sign In"
        onClick={onSignIn}
      />
    );
  }
}
