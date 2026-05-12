import axios from 'axios';
import {
  getCachedLesson,
  getAllCachedChatSessions,
  getCachedChatSession,
  getCachedQuizResultForLesson,
  getAllCachedQuizResults,
  getCachedTopicsList,
  cacheLesson,
  cacheMultipleLessons,
  cacheTopicsList,
  cacheChatSession
} from './cache';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000
});

// ========== ADD THIS REQUEST INTERCEPTOR ==========
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// ========== RESPONSE INTERCEPTORS (auto‑cache) ==========
api.interceptors.response.use(async (response) => {
  const { config, data } = response;
  const url = config.url;
  const method = config.method;

  if (method === 'get' && navigator.onLine) {
    if (url.includes('/lessons/subject/')) {
      const lessons = data.data;
      if (Array.isArray(lessons) && lessons.length) await cacheMultipleLessons(lessons);
    } else if (url.match(/\/lessons\/[^/]+\/[^/]+$/)) {
      if (data && data.lessonId) await cacheLesson(data);
    } else if (url.includes('/lessons/topics/')) {
      const parts = url.split('/');
      const subject = decodeURIComponent(parts[4]);
      const form = decodeURIComponent(parts[5]);
      await cacheTopicsList(subject, form, data);
    } else if (url === '/chat/history' && data.data) {
      for (const session of data.data) await cacheChatSession(session);
    } else if (url.match(/\/chat\/session\/.+/)) {
      await cacheChatSession(data);
    }
  }
  return response;
}, error => Promise.reject(error));

// Fallback: if request fails due to network error, try cache
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest.url;
    const method = originalRequest.method;

    if (method === 'get' && (error.message === 'Network Error' || error.code === 'ERR_NETWORK')) {
      if (url.match(/\/lessons\/[^/]+\/[^/]+$/)) {
        const lessonId = url.split('/').pop().split('?')[0];
        const cached = await getCachedLesson(lessonId);
        if (cached) return Promise.resolve({ data: cached });
      }
      if (url.includes('/lessons/topics/')) {
        const parts = url.split('/');
        const subject = decodeURIComponent(parts[4]);
        const form = decodeURIComponent(parts[5]);
        const cachedTopics = await getCachedTopicsList(subject, form);
        if (cachedTopics) return Promise.resolve({ data: cachedTopics });
      }
      if (url === '/chat/history') {
        const sessions = await getAllCachedChatSessions();
        return Promise.resolve({ data: { data: sessions } });
      }
      if (url.match(/\/chat\/session\/.+/)) {
        const sessionId = url.split('/').pop();
        const session = await getCachedChatSession(sessionId);
        if (session) return Promise.resolve({ data: session });
      }
      if (url.includes('/quiz/result/')) {
        const lessonId = url.split('/').pop();
        const result = await getCachedQuizResultForLesson(lessonId);
        if (result) return Promise.resolve({ data: result });
      }
      if (url === '/quiz/results/all') {
        const results = await getAllCachedQuizResults();
        return Promise.resolve({ data: results });
      }
    }
    return Promise.reject(error);
  }
);

export default api;