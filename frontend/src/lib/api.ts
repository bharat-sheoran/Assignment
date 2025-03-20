import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createUser = async (email: string, firebase_uid: string, role: 'instructor' | 'student') => {
  return api.post('/users', { email, firebase_uid, role });
};

export const getCurrentUser = async () => {
  return api.get('/users/me');
};

export const createQuestion = async (data: { 
  question_text: string;
  options: string[];
  correct_answer: string;
}) => {
  return api.post('/questions', data);
};

export const getQuestions = async () => {
  return api.get('/questions');
};

export default api;