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

export const signUp = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData); // Registering a new user
};

export const signIn = async (credentials) => { 
  return await axios.post(`${API_URL}/users/login`, credentials);
};
