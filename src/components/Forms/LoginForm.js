import React, { Component } from 'react';
import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import styles from './LoginForm.module.css';
import './style.css';

const INITIAL_STATE = {
  email: '',
  password: '',
};

class Login extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    console.log(`
            Email: ${email}
            Password: ${password}
        `);

    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { title, buttontext } = this.props;
    const { email, password } = this.state;
    return (
      <form className={styles.loginForm} onSubmit={this.handleSubmit}>
        <h2 className="loginFormTitle">{title}</h2>
        <div className="row">
          <label className="label" htmlFor="email">
            email
          </label>
          <Input
            className="input"
            name="email"
            type="email"
            onChange={this.handleChange}
            value={email}
          />
        </div>
        <div className="row">
          <label className="label" htmlFor="password">
            password
          </label>
          <Input
            className="input"
            name="password"
            type="password"
            onChange={this.handleChange}
            value={password}
          />
        </div>
        <div className="row">
          <Button className="loginBtn" type="text" text={buttontext} />
        </div>
      </form>
    );
  }
}

export default Login;
