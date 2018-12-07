import React, { Component } from 'react';
import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './CommentAddForm.module.css';

const INITIAL_STATE = {
  text: '',
  author: '',
  date: '',
  rate: 10,
  menuItemId: 5,
};

export default class CommentAddForm extends Component {
  static contextType = AuthContext;

  state = { ...INITIAL_STATE };

  handleAddComment = () => {
    const { onAdd } = this.props;
    const { text, date, rate, menuItemId } = this.state;
    const { user } = this.context;
    const author = user.name;

    const comment = {
      text,
      date,
      rate,
      author,
      menuItemId,
    };

    onAdd(comment);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleAddComment();
    this.setState({ ...INITIAL_STATE });
  };

  setMinimumDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }

    today = `${yyyy}-${mm}-${dd}`;

    return today;
  };

  render() {
    const { text, date } = this.state;

    return (
      <form className="commentsForm">
        <div className={styles.row}>
          <label>
            <b className={styles.label}>Rate it</b>
            <select
              name="rate"
              className="commentsSelect"
              onChange={this.handleChange}
            >
              <option value="10">10 &#9733;</option>
              <option value="9">9 &#9733;</option>
              <option value="8">8 &#9733;</option>
              <option value="7">7 &#9733;</option>
              <option value="6">6 &#9733;</option>
              <option value="5">5 &#9733;</option>
              <option value="4">4 &#9733;</option>
              <option value="3">3 &#9733;</option>
              <option value="2">2 &#9733;</option>
              <option value="1">1 &#9733;</option>
            </select>
          </label>
        </div>
        <div className={styles.row}>
          <label htmlFor="date">
            <b className={styles.label}>Date</b>
            <Input
              className={styles.input}
              name="date"
              min={this.setMinimumDate()}
              type="date"
              onChange={this.handleChange}
              value={date}
            />
          </label>
        </div>
        <div className={styles.row}>
          <textarea
            className="commentsTextArea"
            name="text"
            cols="150"
            rows="10"
            placeholder="input your comments here"
            value={text}
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.row}>
          <Button
            className="commentBtn"
            text="Add Comment"
            type="button"
            onClick={this.handleSubmit}
          />
        </div>
      </form>
    );
  }
}
