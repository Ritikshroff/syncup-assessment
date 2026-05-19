import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFeeds = async () => {
  const response = await api.get('/feed');
  return response.data;
};

export const createFeed = async (data: { title: string; description: string }) => {
  const response = await api.post('/feed', data);
  return response.data;
};

export default api;
