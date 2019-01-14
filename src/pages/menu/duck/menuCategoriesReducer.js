import menuTypes from './menuActionsTypes';

const menuCategories = (state = [], { type, payload }) => {
  switch (type) {
    case menuTypes.FETCH_SUCCESS_MENU_CATEGORIES:
      return payload;
    default:
      return state;
  }
};

export default menuCategories;
