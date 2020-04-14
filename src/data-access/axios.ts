import axios from 'axios';

const baseURL = 'https://api.github.com';

export const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.response.use(res => res.data);
