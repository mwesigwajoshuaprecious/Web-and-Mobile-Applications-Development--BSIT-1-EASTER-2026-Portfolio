import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const submitProject = (data) => API.post('/projects/submit', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getProjects = () => API.get('/projects');
export const approveProject = (id) => API.put(`/projects/approve/${id}`);
export const getAnalytics = () => API.get('/projects/analytics');
export const addComment = (id, text) => API.post(`/projects/comment/${id}`, { text });
// Add more