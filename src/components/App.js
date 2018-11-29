import React, { Component } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Header from './shared/Header/Header';
import Tabs from './Tabs/Tabs';
import Logo from './shared/Logo/Logo';
import Navigation from './shared/navigation/Navigation';
import Modal from './shared/Modal/Modal';
import UserMenu from './shared/UserMenu/UserMenu';
import OrderHistory from './OrderHistory/OrderHistory';
import Menu from './Menu/Menu';
import AuthPage from './shared/AuthPage/AuthPage';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import Comments from './shared/Comments/Comments';
import OrderHistoryAddForm from './OrderHistoryAddForm/OrderHistoryAddForm';
import navList from '../assets/navigationList.json';
import userCabinetMenu from '../assets/menu.json';
import commentsHistory from '../assets/comments.json';
import * as OrderHistiryApiServices from '../services/order-histiory-api/order-histiry-api-services';
import styles from './App.module.css';

const INITIAL_STATE = {
  menuList: userCabinetMenu,
  userName: '',
  filter: '',
  comments: commentsHistory,
  isModalOpen: false,
  orders: [],
  detailsOrder: [],
  isLoading: false,
};

const tabsList = [
  {
    title: 'Sign In',
    content: (
      <RegisterForm
        title="Sign Up Form"
        buttontext="Sign Up"
        className={styles.loginForm}
      />
    ),
  },
  {
    title: 'Sign Up',
    content: (
      <LoginForm
        title="Sign In Form"
        buttontext="Sign In"
        className={styles.loginForm}
      />
    ),
  },
];

class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setIsLoadingTrue();
    OrderHistiryApiServices.getOrdreHistoryAll().then(orders => {
      this.setState({ orders, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { orders } = this.state;
    const prevOrders = prevState.orders;
    if (prevOrders.length !== orders.length) {
      OrderHistiryApiServices.getOrdreHistoryAll().then(ordersList => {
        this.setIsLoadingTrue();
        this.setState({ orders: ordersList, isLoading: false });
      });
    }
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
        <Tabs tabs={tabsList} />
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
          <UserMenu
            handleOpenDropDownMenu={this.handleOpenDropDownMenu}
            userName="Some Name"
            className={styles.userMenu}
            dropDownLogoImageSrc="https://placeimg.com/100/80/people"
          />
        </Header>
        <Menu
          menuList={menuFiltered}
          className={styles.menu}
          filter={filter}
          onFilterChange={this.handleFilterChange}
        />
        {!isLoading ? (
          <OrderHistory
            orderList={orders}
            className={styles.orderTable}
            onShowDetails={this.handleGetDetailsFromOrderHistory}
            onDelete={this.handleDeleteByIdFromOrderHistory}
          >
            <OrderHistoryAddForm
              buttontext="Add to History"
              title="Add History Form"
              onAdd={this.handleAddOrderHistory}
            />
          </OrderHistory>
        ) : (
          <div className={styles.isLoadingSpinner}>
            <GridLoader
              size={20}
              color="rgb(0, 128, 128)"
              loading
              className={styles.isLoadingSpinner}
            />
          </div>
        )}

        <AuthPage className={styles.authPage}>
          <LoginForm
            title="Sign In Form"
            buttontext="Sign In"
            className={styles.loginForm}
          />
          <RegisterForm
            title="Sign Up Form"
            buttontext="Sign Up"
            className={styles.loginForm}
          />
        </AuthPage>
        <Comments comments={comments} />
      </div>
    );
  }
}

export default App;
