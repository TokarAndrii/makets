import React, { Component, createRef } from 'react';
import styles from './VideoPlayer.module.css';

export default class VideoPlayer extends Component {
  playerRef = createRef();

  play = () => this.playerRef.current.play();

  pause = () => this.playerRef.current.pause();

  render() {
    const { src, width, height } = this.props;
    return (
      <div className={styles.videoPlayer}>
        <video
          src={src}
          width={width}
          height={height}
          ref={this.playerRef}
          controls
        />
        <div className={styles.btnsHolder}>
          <button className={styles.playerBtn} onClick={this.play}>
            Play
          </button>
          <button className={styles.playerBtn} onClick={this.pause}>
            Pause
          </button>
        </div>
      </div>
    );
  }
}
