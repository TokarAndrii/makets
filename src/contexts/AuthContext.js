import React, { Component, createContext } from 'react';
import userInfo from '../assets/user-info.json';

export const AuthContext = createContext({
  isAuthenticated: true,
  user: {},
  onSignIn: () => null,
  onSignOut: () => null,
});

export default class AuthContextProvider extends Component {
  static Consumer = AuthContext.Consumer;

  state = {
    isAuthenticated: false,
    user: {},
  };

  onSignIn = () => {
    this.setState({ isAuthenticated: true, user: userInfo });
  };

  onSignOut = () => {
    this.setState({ isAuthenticated: false, user: {} });
  };

  render() {
    const { isAuthenticated, user } = this.state;
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          onSignIn: this.onSignIn,
          onSignOut: this.onSignOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
