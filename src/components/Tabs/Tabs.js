import React, { Component } from 'react';
import styles from './Tabs.module.css';

export default class Tabs extends Component {
  state = {
    activeTabindex: 0,
  };

  handleSetActiveTabIdx = index => this.setState({ activeTabindex: index });

  render() {
    const { activeTabindex } = this.state;
    const { tabs } = this.props;
    const { content } = tabs[activeTabindex];
    return (
      <div className={styles.tabsContaiber}>
        <div className={styles.tabsActions} />
        {tabs.map((tab, idx) => (
          <button
            type="button"
            className={
              idx === activeTabindex ? styles.tabBtnActive : styles.tabBtn
            }
            onClick={() => this.handleSetActiveTabIdx(idx)}
          >
            {tab.title}
          </button>
        ))}
        <div className={styles.tabContent}>{content}</div>
      </div>
    );
  }
}
