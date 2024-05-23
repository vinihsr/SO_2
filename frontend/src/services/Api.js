import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getAll = async () => {
  return await axios.get(`${API_URL}/items`);
};

export const addItem = async (item) => {
  return await axios.post(`${API_URL}/items`, item);
};

export const deleteItem = async (itemId) => {
  return await axios.delete(`${API_URL}/items/${itemId}`);
};

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;


