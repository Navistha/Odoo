import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/token/', { username, password });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await api.post('/auth/register/', { username, email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/user/');
    return response.data;
  },
};

// Questions API functions
export const questionsAPI = {
  getQuestions: async (params = {}) => {
    const response = await api.get('/questions/', { params });
    return response.data;
  },

  getQuestion: async (id) => {
    const response = await api.get(`/questions/${id}/`);
    return response.data;
  },

  createQuestion: async (questionData) => {
    const response = await api.post('/questions/', questionData);
    return response.data;
  },

  updateQuestion: async (id, questionData) => {
    const response = await api.put(`/questions/${id}/`, questionData);
    return response.data;
  },

  deleteQuestion: async (id) => {
    const response = await api.delete(`/questions/${id}/`);
    return response.data;
  },
};

// Answers API functions
export const answersAPI = {
  getAnswers: async (questionId) => {
    const response = await api.get('/answers/', { params: { question: questionId } });
    return response.data;
  },

  createAnswer: async (answerData) => {
    const response = await api.post('/answers/', answerData);
    return response.data;
  },

  acceptAnswer: async (answerId) => {
    const response = await api.post(`/answers/${answerId}/accept/`);
    return response.data;
  },
};

// Tags API functions
export const tagsAPI = {
  getTags: async () => {
    const response = await api.get('/tags/');
    return response.data;
  },
};

// Votes API functions
export const votesAPI = {
  vote: async (answerId, value) => {
    const response = await api.post('/votes/', { answer: answerId, value });
    return response.data;
  },
};

// Notifications API functions
export const notificationsAPI = {
  getNotifications: async () => {
    const response = await api.get('/notifications/');
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count/');
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await api.post(`/notifications/${notificationId}/mark_read/`);
    return response.data;
  },
};

export default api;