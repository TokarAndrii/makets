import { createSelector } from 'reselect';

const getAllMenuList = state => state.menuList;

const getMenuFilter = state => state.menuFilter;

// const getFilteredMenuList = state => {
//   const menuList = getAllMenuList(state);
//   const filter = getMenuFilter(state);

//   return menuList.filter(menuItem =>
//     menuItem.name.toLowerCase().includes(filter.toLowerCase()),
//   );
// };

const getFilteredMenuList = createSelector(
  [getAllMenuList, getMenuFilter],
  (menuList, filter) =>
    menuList.filter(menuItem =>
      menuItem.name.toLowerCase().includes(filter.toLowerCase()),
    ),
);

export default { getFilteredMenuList };
