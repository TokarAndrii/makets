import axios from 'axios';

const BASE_URL = 'http://localhost:3001/menu';

const getAllMenu = () => axios.get(BASE_URL).then(resp => resp.data);

const getAllMenuByCategory = category => {
  if (category === 'all') {
    return getAllMenu();
  }
  return axios.get(`${BASE_URL}?category=${category}`).then(resp => resp.data);
};

const getByIdMenuItem = id =>
  axios.get(`${BASE_URL}/${id}`).then(resp => resp.data);

const deleteByIdMenuItem = id =>
  axios.delete(`${BASE_URL}/${id}`).then(resp => resp.status === 200);

const addMenuItem = item => axios.post(BASE_URL, item).then(resp => resp.data);

export {
  getAllMenu,
  getByIdMenuItem,
  deleteByIdMenuItem,
  addMenuItem,
  getAllMenuByCategory,
};
