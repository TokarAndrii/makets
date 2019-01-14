import { Component } from 'react';

const INITIAL_STATE = {
  showSignIn: true,
  showSignUp: false,
};

export default class FormsPageTabs extends Component {
  state = { ...INITIAL_STATE };

  clickSignIn = () =>
    this.setState({
      showSignIn: true,
      showSignUp: false,
    });

  clickSignUp = () =>
    this.setState({
      showSignIn: false,
      showSignUp: true,
    });

  render() {
    const { children } = this.props;
    const { showSignIn, showSignUp } = this.state;

    return children({
      clickSignIn: this.clickSignIn,
      clickSignUp: this.clickSignUp,
      showSignIn,
      showSignUp,
    });
  }
}
