import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  signup: (email: string, password: string, name: string) =>
    apiClient.post('/auth/signup', { email, password, name }),
  
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
};