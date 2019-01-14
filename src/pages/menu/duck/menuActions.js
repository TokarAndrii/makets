import menuTypes from './menuActionsTypes';

const FETCH_START = () => ({
  type: menuTypes.FETCH_START,
});

const FETCH_SUCCESS_MENU_LIST = menuList => ({
  type: menuTypes.FETCH_SUCCESS_MENU_LIST,
  payload: menuList,
});

const FETCH_SUCCESS_MENU_CATEGORIES = menuCategories => ({
  type: menuTypes.FETCH_SUCCESS_MENU_CATEGORIES,
  payload: menuCategories,
});

const FETCH_ERROR = error => ({
  type: menuTypes.FETCH_ERROR,
  payload: error,
});

export default {
  FETCH_START,
  FETCH_SUCCESS_MENU_LIST,
  FETCH_ERROR,
  FETCH_SUCCESS_MENU_CATEGORIES,
};
