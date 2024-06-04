import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getAll = async () => {
  return await axios.get(`${API_URL}/items`);
};

export const addItem = async (item) => {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return await axios.post(`${API_URL}/items`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const deleteItem = async (itemId) => {
  return await axios.delete(`${API_URL}/items/${itemId}`);
};

export const signUp = async (userData) => {
  return await axios.post(`${API_URL}/users`, userData);
};

export const signIn = async (credentials) => {
  return await axios.post(`${API_URL}/users`, credentials);
};

export const SearchItem = async (query) => {
  return await axios.get(`${API_URL}/search`, { params: { query } })
};

