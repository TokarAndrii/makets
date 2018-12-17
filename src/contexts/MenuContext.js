import React, { Component, createContext } from 'react';

export const MenuContext = createContext({
  menuList: [],
  onNenuAdd: () => null,
  setMenuList: () => null,
});

export default class MenuContextProvider extends Component {
  static Consumer = MenuContext.Consumer;

  state = {
    menuList: [],
  };

  setMenuList = menuList => {
    this.setState({ menuList });
  };

  onNenuAdd = newMenuItem => {
    this.setState(state => ({ menuList: [...state.menuList, newMenuItem] }));
  };

  render() {
    const { menuList } = this.state;
    const { children } = this.props;
    return (
      <>
        <MenuContext.Provider value={{ menuList }}>
          {children}
        </MenuContext.Provider>
      </>
    );
  }
}
