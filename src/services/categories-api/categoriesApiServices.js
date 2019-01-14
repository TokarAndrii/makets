import axios from 'axios';

const BASE_URL = 'http://localhost:3001/categories';

const getAllCategories = () => axios.get(BASE_URL).then(resp => resp.data);

const getByIdCategory = id =>
  axios.get(`${BASE_URL}/${id}`).then(resp => resp.data);

export { getAllCategories, getByIdCategory };
