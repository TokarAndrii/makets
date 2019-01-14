import React, { Component } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Comments from '../../components/shared/Comments/Comments';
import * as CommentsApiServices from '../../services/comments-api/comments-api-services';

import styles from './CommentsPage.module.css';

const INITIAL_STATE = {
  comments: [],
  isLoading: false,
};

export default class CommentsPage extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setIsLoadingTrue();

    CommentsApiServices.getAllComments().then(comments => {
      this.setState({ comments, isLoading: false });
    });
  }

  handleAddComment = comment => {
    this.setIsLoadingTrue();
    CommentsApiServices.addComment(comment).then(newComment => {
      this.setState(state => ({
        comments: [...state.comments, newComment],
        isLoading: false,
      }));
    });
  };

  handleDeleteCommentById = id => {
    this.setIsLoadingTrue();
    CommentsApiServices.deleteCommentById(id).then(isOk => {
      if (!isOk) {
        return;
      }
      const { comments } = this.state;
      this.setState({
        comments: comments.filter(item => item.id !== id),
        isLoading: false,
      });
    });
  };

  setIsLoadingTrue = () => this.setState({ isLoading: true });

  render() {
    const { comments, isLoading } = this.state;
    return (
      <>
        {isLoading && (
          <div className={styles.isLoadingSpinner}>
            <GridLoader
              size={20}
              color="rgb(0, 128, 128)"
              loading
              className={styles.isLoadingSpinner}
            />
          </div>
        )}
        <Comments
          comments={comments}
          onAdd={this.handleAddComment}
          onDelete={this.handleDeleteCommentById}
        />
      </>
    );
  }
}
