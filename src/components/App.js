import React, { Component } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import AuthContextProvider from '../contexts/AuthContext';
import Header from './shared/Header/Header';
import Logo from './shared/Logo/Logo';
import Button from './shared/Button/Button';
import Navigation from './shared/navigation/Navigation';
import Modal from './shared/Modal/Modal';
import OrderHistory from './OrderHistory/OrderHistory';
import AuthManager from './AuthManager/AuthManager';
import Menu from './Menu/Menu';
import OrderHistoryAuthManager from './OrderHistoryAuthManager/OrderHistoryAuthManager';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import Comments from './shared/Comments/Comments';
import FormsPageTabs from './FormsPageTabs/FormsPageTabs';
import navList from '../assets/navigationList.json';
import userCabinetMenu from '../assets/menu.json';
import * as OrderHistiryApiServices from '../services/order-histiory-api/order-histiry-api-services';
import * as CommentsApiServices from '../services/comments-api/comments-api-services';
import styles from './App.module.css';

const INITIAL_STATE = {
  menuList: userCabinetMenu,
  userName: '',
  filter: '',
  comments: [],
  isModalOpen: false,
  orders: [],
  detailsOrder: [],
  isLoading: false,
};

class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setIsLoadingTrue();
    OrderHistiryApiServices.getOrdreHistoryAll().then(orders => {
      this.setState({ orders, isLoading: false });
    });
    this.setIsLoadingTrue();
    CommentsApiServices.getAllComments().then(comments => {
      this.setState({ comments, isLoading: false });
    });
  }

  setIsLoadingTrue = () => this.setState({ isLoading: true });

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false, detailsOrder: [] });
  };

  handleWindowClick = (e, containerRef) => {
    const { isDropDownOpen } = this.state;

    const isTargetInsideContainer = containerRef.current.contains(e.target);

    if (isDropDownOpen && !isTargetInsideContainer) {
      this.closeDropDown();
    }
  };

  getFilteredMenu = (filter, menuArray) =>
    menuArray.filter(menuItem =>
      menuItem.name.toLowerCase().includes(filter.toLowerCase()),
    );

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

  render() {
    const {
      menuList,
      filter,
      comments,
      isModalOpen,
      orders,
      detailsOrder,
      isLoading,
    } = this.state;
    const menuFiltered = this.getFilteredMenu(filter, menuList);

    return (
      <AuthContextProvider>
        <div className={styles.App}>
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
          <Header className={styles.header}>
            <Logo
              className={styles.logo}
              logoSrc="https://placeimg.com/100/100/tech"
              logoAlt="placeimg tech logo"
            />
            <Navigation
              className={styles.navigatoinList}
              navigationMenuList={navList}
            />

            <AuthManager />
          </Header>
          <Menu
            menuList={menuFiltered}
            className={styles.menu}
            filter={filter}
            onFilterChange={this.handleFilterChange}
          />
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
          <OrderHistoryAuthManager
            orderList={orders}
            onShowDetails={this.handleGetDetailsFromOrderHistory}
            onDelete={this.handleDeleteByIdFromOrderHistory}
            onAdd={this.handleAddOrderHistory}
          />
          <Comments
            comments={comments}
            onAdd={this.handleAddComment}
            onDelete={this.handleDeleteCommentById}
          />

          <FormsPageTabs>
            {({ showSignUp, showSignIn, clickSignIn, clickSignUp }) => (
              <div className={styles.FormsPageTabsHolder}>
                <div className={styles.tabsBtnsHolder}>
                  <Button
                    className={
                      showSignIn ? styles.activeTabsBtns : styles.tabsBtns
                    }
                    type="text"
                    text="Sign In"
                    onClick={clickSignIn}
                  />
                  <Button
                    className={
                      showSignUp ? styles.activeTabsBtns : styles.tabsBtns
                    }
                    type="text"
                    text="Sign Up"
                    onClick={clickSignUp}
                  />
                </div>
                {showSignIn && (
                  <LoginForm
                    title="Sign In Form"
                    buttontext="Sign In"
                    className={styles.loginForm}
                  />
                )}
                {showSignUp && (
                  <RegisterForm
                    title="Sign Up Form"
                    buttontext="Sign Up"
                    className={styles.loginForm}
                  />
                )}
              </div>
            )}
          </FormsPageTabs>
        </div>
      </AuthContextProvider>
    );
  }
}

export default App;
