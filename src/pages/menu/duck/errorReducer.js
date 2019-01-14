import menuTypes from './menuActionsTypes';

const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case menuTypes.FETCH_REQUEST:
      return null;

    case menuTypes.FETCH_ERROR:
      return payload;

    default:
      return state;
  }
};

export default errorReducer;
