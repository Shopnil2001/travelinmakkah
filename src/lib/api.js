import axios from 'axios';
import { auth } from '../../Firebase/firebase.config';

// Base URL of your deployed backend (change to your actual Vercel URL)
const API_BASE_URL = 'https://travelinmakkah-backend.vercel.app/api'; 
// Example: 'https://hajj-agency-backend.vercel.app/api'

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Firebase ID token automatically
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('Error getting ID token:', error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Optional: Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid → force logout
      auth.signOut();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;