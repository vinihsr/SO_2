import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api'; // Updated base URL to match backend routes

const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export const getAllItems = async () => {
  try {
    const response = await Api.get('/items');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getItemById = async (id) => {
  try {
    const response = await Api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createItem = async (item) => {
  try {
    const response = await Api.post('/items', item);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateItem = async (itemId, item) => {
  try {
    const response = await Api.put(`/items/${itemId}`, item);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteItem = async (itemId) => {
  try {
    const response = await Api.delete(`/items/${itemId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

function handleApiError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    throw new ApiError(error.response.data.message || 'Server Error. Please try again later.', error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    throw new ApiError('Network Error. Please check your internet connection.', 0);
  } else {
    // Something happened in setting up the request that triggered an error
    throw new ApiError('Request Error. Please try again later.', 0);
  }
}

export default Api;
