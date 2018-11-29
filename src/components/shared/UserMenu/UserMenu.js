import React, { Component, createRef } from 'react';
import MaterialIcon from 'material-icons-react';
import UserDropDown from '../../UserDropDown/UserDropDown';
import Button from '../Button/Button';
import styles from './UserMenu.module.css';

const INITIAL_STATE = {
  isDropDownOpen: false,
};

class UserMenu extends Component {
  state = { ...INITIAL_STATE };

  containerRef = createRef();

  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick);
    window.addEventListener('keydown', this.handleEscapeKeyPress, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isDropDownOpen } = this.state;

    return nextState.isDropDownOpen !== isDropDownOpen;
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
    window.removeEventListener('keydown', this.handleEscapeKeyPress);
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

  handleEscapeKeyPress = e => {
    if (e.key === 'Escape') {
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
          <UserDropDown className={styles.userDropDown}>
            <span className={styles.closeUserMenuBtn}>
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
            <Button type="button" text="Log Out" className={styles.logOutBtn} />
          </UserDropDown>
        )}
        {children}
      </div>
    );
  }
}

export default UserMenu;
