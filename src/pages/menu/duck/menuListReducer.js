import menuTypes from './menuActionsTypes';

const menuListReducer = (state = [], { type, payload }) => {
  switch (type) {
    case menuTypes.FETCH_SUCCESS_MENU_LIST:
      return payload;

    default:
      return state;
  }
};

export default menuListReducer;
