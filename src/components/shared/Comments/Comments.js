import React, { Component } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import CommentAddForm from '../../CommentAddForm/CommentAddForm';
import Button from '../Button/Button';
import './style.css';
import styles from './Comments.module.css';

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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { comments, onAdd, onDelete } = this.props;
    const { isAuthenticated } = this.context;

    return (
      <div className="commensBlock">
        <h3>Comments Block</h3>
        {comments.map(comment => (
          <div className={styles.holder} key={comment.id}>
            <div className="commentsHolder">
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
            {isAuthenticated && (
              <Button
                text="Remove Comment"
                type="button"
                className={styles.commentRmBtn}
                onClick={() => onDelete(comment.id)}
              />
            )}
          </div>
        ))}
        {isAuthenticated && <CommentAddForm onAdd={onAdd} />}
      </div>
    );
  }
}

export default Comments;
