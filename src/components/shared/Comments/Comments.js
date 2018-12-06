import React, { Component } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Button from '../Button/Button';
import './style.css';

const INITIAL_STATE = {
  rate: '10',
  commentsText: '',
};

class Comments extends Component {
  static contextType = AuthContext;

  state = { ...INITIAL_STATE };

  static defaultProps = {
    comments: [],
  };

  componentDidMount() {
    console.log('context from componentDidMount Comments - ', this.context);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { commentsText, rate } = this.state;

    console.log(`
            commentsText: ${commentsText}
            rate: ${rate}
        `);

    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { comments } = this.props;
    const { commentsText } = this.state;
    const { isAuthenticated } = this.context;

    return (
      console.log(isAuthenticated, ':isAuthenticated from comments') || (
        <div className="commensBlock">
          <h3>Comments Block</h3>
          {comments.map(comment => (
            <div className="commentsHolder" key={comment.id}>
              <div>
                <span className="commentsDate">{comment.date}</span>
                <span className="commentsRate">{comment.rate}&#9733;</span>
                <span>
                  Author: <b>{comment.author}</b>
                </span>
              </div>
              <div>
                <p className="commentsText">
                  <em>{comment.text}</em>
                </p>
              </div>
            </div>
          ))}
          {isAuthenticated && (
            <form className="commentsForm">
              <label>
                Rate it
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
              <textarea
                className="commentsTextArea"
                name="commentsText"
                cols="150"
                rows="10"
                placeholder="input your comments here"
                value={commentsText}
                onChange={this.handleChange}
              />
              <Button
                className="commentBtn"
                text="Add Comment"
                type="button"
                onClick={this.handleSubmit}
              />
            </form>
          )}
        </div>
      )
    );
  }
}

export default Comments;
