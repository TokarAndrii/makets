import React, { Component, createRef } from 'react';
import MaterialIcon from 'material-icons-react';
import styles from './Modal.module.css';

export default class Modal extends Component {
  containerRef = createRef();

  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick);
    window.addEventListener('keydown', this.handleEscapeKeyPress, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
    window.removeEventListener('keydown', this.handleEscapeKeyPress);
  }

  handleWindowClick = e => {
    const { handleCloseModal } = this.props;
    const isTargetInsideContainer = this.containerRef.current.contains(
      e.target,
    );

    if (isTargetInsideContainer) {
      handleCloseModal();
    }
  };

  handleEscapeKeyPress = e => {
    const { handleCloseModal } = this.props;
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  render() {
    const { children, handleCloseModal } = this.props;
    return (
      <div className={styles.backDrop} ref={this.containerRef}>
        <span className={styles.closeUserModalBtn}>
          <MaterialIcon icon="close" size="30" onClick={handleCloseModal} />
        </span>
        <div className={styles.modalWindow}>{children}</div>
      </div>
    );
  }
}
