import axios from 'axios';

const BASE_URL = 'http://localhost:3001/comments';

const getAllComments = () => axios.get(BASE_URL).then(resp => resp.data);

const getByIdComment = id =>
  axios.delete(`${BASE_URL}/${id}`).then(resp => resp.status === 200);

const deleteCommentById = id =>
  axios.delete(`${BASE_URL}/${id}`).then(resp => resp.status === 200);

const addComment = item => axios.post(BASE_URL, item).then(resp => resp.data);

export { getAllComments, getByIdComment, deleteCommentById, addComment };
