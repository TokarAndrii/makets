import { combineReducers } from 'redux';
import menuListReducer from '../menu/duck/menuListReducer';
import loadingReducer from '../menu/duck/loadingReducer';
import errorReducer from '../menu/duck/errorReducer';
import menuCategoriesReducer from '../menu/duck/menuCategoriesReducer';
import menuFilterReducer from '../menu/duck/menuFilterReducer';

export default combineReducers({
  menuList: menuListReducer,
  menuCategories: menuCategoriesReducer,
  isLoading: loadingReducer,
  error: errorReducer,
  menuFilter: menuFilterReducer,
});
