import React, {Component} from 'react';
import Header from './shared/Header'
import Logo from './shared/Logo'
import Navigation from './shared/navigation/Navigation'
import UserMenu from './shared/UserMenu'
import OrderHistory from './OrderHistory'
import Menu from './Menu'
import AuthPage from './shared/AuthPage'
import LoginForm from './Forms/LoginForm'
import RegisterForm from './Forms/RegisterForm'
import Comments from './shared/Comments/Comments'
import menuList from '../assets/navigationList.json'
import menu from '../assets/menu.json'
import orderHistory from '../assets/order-history.json'
import comments from '../assets/comments.json'
import './App.css';

const INITIAL_STATE = {
    navigationMenuList: menuList,
    menuList: menu,
    userName: '',
    filter: '',
    orderHistory: orderHistory,
    comments: comments
}

class App extends Component {

    state = {...INITIAL_STATE}


    handleOpenDropDownMenu = () => console.log('click handleOpenDropDownMenu')

    handleFilterChange = filter => {
        this.setState({filter: filter})
    }

    getFilteredMenu = (filter, menu) =>
        menu.filter(menuItem => menuItem.name.toLowerCase().includes(filter.toLowerCase()))


    render() {
        const {navigationMenuList, menuList, filter, orderHistory, comments} = this.state
        const menuFiltered = this.getFilteredMenu(filter, menuList)

        return (
            <div className="App">
                <Header className="header">
                    <Logo className="logo" logoSrc="https://placeimg.com/100/100/tech" logoAlt="placeimg tech logo"/>
                    <Navigation className="navigatoinList" navigationMenuList={navigationMenuList}/>
                    <UserMenu handleOpenDropDownMenu={this.handleOpenDropDownMenu} userName="Some Name"
                              className="userMenu" dropDownLogoImageSrc="https://placeimg.com/100/80/people">
                    </UserMenu>
                </Header>
                <Menu menuList={menuFiltered} className="menu" filter={filter}
                      onFilterChange={this.handleFilterChange}/>
                <OrderHistory orderList={orderHistory} className="orderTable"/>
                <AuthPage className="authPage">
                    <LoginForm title="Sign In Form" buttontext="Sign In" className="loginForm"/>
                    <RegisterForm title="Sign Up Form" buttontext="Sign Up" className="loginForm"/>
                </AuthPage>
                <Comments comments={comments}/>
            </div>
        );
    }
}

export default App;
