import axios from 'axios';

const BASE_URL = 'http://localhost:3001/orderHistory';

const getOrdreHistoryAll = () => axios.get(BASE_URL).then(resp => resp.data);

const getOrdreHistoryById = id =>
  axios.get(`${BASE_URL}/${id}`).then(resp => resp.data);

const deleteOrdreHistoryById = id =>
  axios.delete(`${BASE_URL}/${id}`).then(resp => resp.status === 200);

const addOrderHistory = item =>
  axios.post(BASE_URL, item).then(resp => resp.data);

export {
  getOrdreHistoryAll,
  getOrdreHistoryById,
  deleteOrdreHistoryById,
  addOrderHistory,
};
