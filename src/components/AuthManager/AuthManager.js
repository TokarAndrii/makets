import React, { Component } from 'react';
// eslint-disable-line
import { AuthContext } from '../../contexts/AuthContext';
import UserMenu from '../shared/UserMenu/UserMenu';
import Button from '../shared/Button/Button';
import styles from './AuthManager.module.css';

export default class AuthManager extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.context, 'this.context componentDidMount');
  }

  render() {
    const { isAuthenticated, onSignIn, onSignOut, user } = this.context;
    return console.log(this.context, 'this.context render') ||
      isAuthenticated ? (
      <UserMenu
        handleOpenDropDownMenu={this.handleOpenDropDownMenu}
        userName="Some Name"
        className={styles.userMenu}
        dropDownLogoImageSrc="https://placeimg.com/100/80/people"
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
