import axios from 'axios';
import menuActions from './duck/menuActions';

const fetchMenuList = () => dispatch => {
  dispatch(menuActions.FETCH_START());
  axios
    .get('http://localhost:3001/menu')
    .then(resp => {
      dispatch(menuActions.FETCH_SUCCESS_MENU_LIST(resp.data));
    })
    .catch(error => dispatch(menuActions.FETCH_ERROR(error)));
};

const fetchMenuCategories = () => dispatch => {
  dispatch(menuActions.FETCH_START());
  axios
    .get('http://localhost:3001/categories')
    .then(resp => {
      dispatch(menuActions.FETCH_SUCCESS_MENU_CATEGORIES(resp.data));
    })
    .catch(error => dispatch(menuActions.FETCH_ERROR(error)));
};

export default { fetchMenuList, fetchMenuCategories };
