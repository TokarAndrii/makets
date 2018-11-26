import React, { Component, createRef } from 'react';
import MaterialIcon from 'material-icons-react';
import UserDropDown from '../UserDropDown';
import Button from './Button';

const INITIAL_STATE = {
  isDropDownOpen: false,
};

class UserMenu extends Component {
  state = { ...INITIAL_STATE };

  containerRef = createRef();

  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isDropDownOpen } = this.state;

    return nextState.isDropDownOpen !== isDropDownOpen;
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
  }

  openDropDown = () => {
    this.setState({ isDropDownOpen: true });
  };

  closeDropDown = () => {
    this.setState({ isDropDownOpen: false });
  };

  handleWindowClick = e => {
    const { isDropDownOpen } = this.state;

    const isTargetInsideContainer = this.containerRef.current.contains(
      e.target,
    );

    if (isDropDownOpen && !isTargetInsideContainer) {
      this.closeDropDown();
    }
  };

  render() {
    const { dropDownLogoImageSrc, children, className, userName } = this.props;
    const { isDropDownOpen } = this.state;
    return (
      <div className={className} ref={this.containerRef}>
        <img src={dropDownLogoImageSrc} alt="useMenuDropdownLogo" />
        <h3 style={{ margin: '0px 16px' }}>Hello! {userName}</h3>
        <div style={{ cursor: 'pointer' }}>
          <MaterialIcon icon="list" size={50} onClick={this.openDropDown} />
        </div>
        {isDropDownOpen && (
          <UserDropDown className="userDropDown">
            <span className="closeUserMenuBtn">
              <MaterialIcon
                icon="close"
                size="30"
                onClick={this.closeDropDown}
              />
            </span>
            <span style={{ marginBottom: '64px' }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              sint voluptatum nobis sequi quo minima neque praesentium
              repudiandae expedita! Quisquam?
            </span>
            <Button type="button" text="Log Out" className="logOutBtn" />
          </UserDropDown>
        )}
        {children}
      </div>
    );
  }
}

export default UserMenu;
