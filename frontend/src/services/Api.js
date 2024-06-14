import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

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
  return await axios.post(`${API_URL}/users/register`, userData);
};

export const signIn = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const getDashboardData = async () => {
  const token = localStorage.getItem('token');
  return await axios.get(`${API_URL}/users/dashboard`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const SearchItem = async (query) => {
  return await axios.get(`${API_URL}/search`, { params: { query } });
};
