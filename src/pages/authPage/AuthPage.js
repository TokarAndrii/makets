import { Component } from 'react';

export default class AuthPage extends Component {
  render() {
    const { children } = this.props;
    return children();
  }
}
