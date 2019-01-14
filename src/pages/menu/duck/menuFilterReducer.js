import menuTypes from './menuActionsTypes';

const menuFilterReducer = (state = '', { type, payload }) => {
  switch (type) {
    case menuTypes.MENU_FILTER_CHANGE:
      return payload;
    default:
      return state;
  }
};

export default menuFilterReducer;
