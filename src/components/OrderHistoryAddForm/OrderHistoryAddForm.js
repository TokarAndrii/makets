import React, { Component } from 'react';
import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import styles from './OrderHistoryAddForm.module.css';

const INITIAL_STATE = {
  address: '',
  date: '',
  price: '',
  rating: 10,
};

export default class OrderHistoryAddForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleAddOrderHistory = () => {
    const { onAdd } = this.props;
    const { address, date, price, rating } = this.state;
    console.log(`
    address: ${address}
    date: ${date}
    price: ${price}
    rating: ${rating}
`);

    const item = {
      address,
      date,
      price,
      rating,
    };

    onAdd(item);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleAddOrderHistory();
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { title, buttontext } = this.props;
    const { address, date, price, rating } = this.state;
    return (
      <div>
        <form className={styles.addHistoryForm}>
          <h2 className={styles.formTitle}>{title}</h2>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="address">
              address
            </label>
            <Input
              className="input"
              name="address"
              type="address"
              onChange={this.handleChange}
              value={address}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="date">
              date
            </label>
            <Input
              className="input"
              name="date"
              type="date"
              onChange={this.handleChange}
              value={date}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="price">
              price
            </label>
            <Input
              className="input"
              name="price"
              type="number"
              onChange={this.handleChange}
              value={price}
              min="0"
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="rating">
              rating
              <b className={styles.raitingHolder}>{rating}</b>
            </label>
            <Input
              className="input"
              name="rating"
              type="range"
              onChange={this.handleChange}
              value={rating}
              min="1"
              max="10"
            />
          </div>
          <div className="row">
            <Button
              className={styles.loginBtn}
              type="text"
              text={buttontext}
              onClick={this.handleSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}
