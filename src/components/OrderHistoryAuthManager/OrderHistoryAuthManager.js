import React, { Component } from 'react';
import OrderHistory from '../OrderHistory/OrderHistory';
import OrderHistoryAddForm from '../OrderHistoryAddForm/OrderHistoryAddForm';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './OrderHistoryAuthManager.module.css';

export default class OrderHistoryAuthManager extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated } = this.context;
    const { orderList, onShowDetails, onAdd, onDelete } = this.props;
    return !isAuthenticated ? (
      <OrderHistory
        orderList={orderList}
        className={styles.orderTable}
        onShowDetails={onShowDetails}
        onDelete={onDelete}
      />
    ) : (
      <>
        <OrderHistory
          orderList={orderList}
          className={styles.orderTable}
          onShowDetails={onShowDetails}
          onDelete={onDelete}
        />
        <OrderHistoryAddForm
          onAdd={onAdd}
          buttontext="Add to History"
          title="Add History Form"
        />
      </>
    );
  }
}
