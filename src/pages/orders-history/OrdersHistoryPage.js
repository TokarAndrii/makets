import React, { Component } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Modal from '../../components/shared/Modal/Modal';
import OrderHistoryAuthManager from '../../components/OrderHistoryAuthManager/OrderHistoryAuthManager';
import OrderHistory from '../../components/OrderHistory/OrderHistory';
import * as OrderHistiryApiServices from '../../services/order-histiory-api/order-histiry-api-services';
import styles from './OrdersHistoryPage.module.css';

const INITIAL_STATE = {
  isModalOpen: false,
  orders: [],
  detailsOrder: [],
  isLoading: false,
};

export default class OrdersHistoryPage extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setIsLoadingTrue();
    OrderHistiryApiServices.getOrdreHistoryAll().then(orders => {
      this.setState({ orders, isLoading: false });
    });
  }

  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false, detailsOrder: [] });
  };

  setIsLoadingTrue = () => this.setState({ isLoading: true });

  handleGetDetailsFromOrderHistory = id => {
    this.setIsLoadingTrue();
    OrderHistiryApiServices.getOrdreHistoryById(id).then(order => {
      this.setState({ detailsOrder: [order], isLoading: false });
    });

    this.handleModalOpen();
  };

  handleAddOrderHistory = item => {
    this.setIsLoadingTrue();
    OrderHistiryApiServices.addOrderHistory(item).then(newItem => {
      this.setState(state => ({
        orders: [...state.orders, newItem],
        isLoading: false,
      }));
    });
  };

  handleDeleteByIdFromOrderHistory = id => {
    this.setIsLoadingTrue();
    OrderHistiryApiServices.deleteOrdreHistoryById(id).then(isOk => {
      if (!isOk) {
        return;
      }
      const { orders } = this.state;
      this.setState({
        orders: orders.filter(item => item.id !== id),
        isLoading: false,
      });
    });
    this.handleCloseModal();
  };

  render() {
    const { orders, isLoading, isModalOpen, detailsOrder } = this.state;
    return (
      <>
        {isLoading ? (
          <div className={styles.isLoadingSpinner}>
            <GridLoader
              size={20}
              color="rgb(0, 128, 128)"
              loading
              className={styles.isLoadingSpinner}
            />
          </div>
        ) : (
          isModalOpen && (
            <Modal
              handleCloseModal={this.handleCloseModal}
              handleWindowClick={this.handleWindowClick}
            >
              <OrderHistory
                orderList={detailsOrder}
                className={styles.orderTable}
                disableDetailsBtn
                onDelete={this.handleDeleteByIdFromOrderHistory}
              />
            </Modal>
          )
        )}
        <OrderHistoryAuthManager
          orderList={orders}
          onShowDetails={this.handleGetDetailsFromOrderHistory}
          onDelete={this.handleDeleteByIdFromOrderHistory}
          onAdd={this.handleAddOrderHistory}
        />
      </>
    );
  }
}
