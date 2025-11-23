import axios from 'axios';

// 백엔드 API 서버의 기본 URL
const baseURL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;