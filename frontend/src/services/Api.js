import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getAll = async () => {
  return await axios.get(`${API_URL}/items`);
};

export const addItem = async (item) => {
  return await axios.post(`${API_URL}/items`, item);
};

