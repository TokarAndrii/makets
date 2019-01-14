import { createSelector } from 'reselect';

const getAllMenuList = state => state.menuList;

const getMenuFilter = state => state.menuFilter;

const getFilteredMenuList = createSelector(
  [getAllMenuList, getMenuFilter],
  (menuList, filter) =>
    menuList.filter(menuItem =>
      menuItem.name.toLowerCase().includes(filter.toLowerCase()),
    ),
);

export default { getFilteredMenuList };
