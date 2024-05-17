import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllItems = async () => {
  return await axios.get(`${API_URL}/items`);
};

export const addItem = async (item) => {
  return await axios.post(`${API_URL}/items`, item);
};
