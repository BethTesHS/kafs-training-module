import axios from 'axios';

// Base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const JWT_TOKEN_KEY = 'authToken';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem(JWT_TOKEN_KEY);
      window.location.href = '/auth/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;
