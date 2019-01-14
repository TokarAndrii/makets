import menuTypes from './menuActionsTypes';

const loadingReducer = (state = false, { type }) => {
  switch (type) {
    case menuTypes.FETCH_START:
      return true;
    case menuTypes.FETCH_SUCCESS_MENU_LIST:
    case menuTypes.FETCH_ERROR:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
