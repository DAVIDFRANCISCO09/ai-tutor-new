import axios from 'axios';
import {
  getCachedLesson,
  getAllCachedChatSessions,
  getCachedChatSession,
  getCachedQuizResultForLesson,
  getAllCachedQuizResults,
  getCachedTopicsList,
  getCachedSubjectsList,
  getCachedProgressOverview,
  cacheLesson,
  cacheMultipleLessons,
  cacheTopicsList,
  cacheChatSession,
  cacheSubjectsList,
  cacheProgressOverview
} from './cache';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000
});

// ========== Request interceptor: add token ==========
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

// ========== Response interceptor: cache online data ==========
api.interceptors.response.use(async (response) => {
  const { config, data } = response;
  const url = config.url;
  const method = config.method;

  if (method === 'get' && navigator.onLine) {
    // Cache subjects list
    if (url === '/lessons/my-subjects') {
      const subjects = data.data;
      if (Array.isArray(subjects)) await cacheSubjectsList(subjects);
    }
    // Cache progress overview
    else if (url === '/progress/overview/all') {
      await cacheProgressOverview(data);
    }
    // Cache lessons (single or array) and also cache the topics list for offline subject browsing
    else if (url.includes('/lessons/subject/')) {
      const lessons = data.data;
      if (Array.isArray(lessons) && lessons.length) {
        // Cache each individual lesson
        await cacheMultipleLessons(lessons);
        // Extract subject and form from URL to cache the topics list (unique topics)
        const subject = decodeURIComponent(url.split('/subject/')[1].split('?')[0]);
        const form = new URLSearchParams(url.split('?')[1]).get('form');
        const uniqueTopics = [...new Map(lessons.map(l => [l.topic, l])).values()];
        await cacheTopicsList(subject, form, uniqueTopics);
      }
    }
    // Single lesson (by lessonId)
    else if (url.match(/\/lessons\/[^/]+\/[^/]+$/)) {
      if (data && data.lessonId) await cacheLesson(data);
    }
    // Topics list (dedicated endpoint)
    else if (url.includes('/lessons/topics/')) {
      const parts = url.split('/');
      const subject = decodeURIComponent(parts[4]);
      const form = decodeURIComponent(parts[5]);
      await cacheTopicsList(subject, form, data);
    }
    // Chat sessions
    else if (url === '/chat/history' && data.data) {
      for (const session of data.data) await cacheChatSession(session);
    }
    else if (url.match(/\/chat\/session\/.+/)) {
      await cacheChatSession(data);
    }
  }
  return response;
}, error => Promise.reject(error));

// ========== Fallback interceptor: serve cache when network fails ==========
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest.url;
    const method = originalRequest.method;

    if (method !== 'get') return Promise.reject(error);
    if (!(error.message === 'Network Error' || error.code === 'ERR_NETWORK')) return Promise.reject(error);

    // Subjects list
    if (url === '/lessons/my-subjects') {
      const cached = await getCachedSubjectsList();
      if (cached) return Promise.resolve({ data: { data: cached } });
    }
    // Progress overview
    if (url === '/progress/overview/all') {
      const cached = await getCachedProgressOverview();
      if (cached) return Promise.resolve({ data: cached });
    }
    // Lessons by subject (list of lessons for a subject+form) – used for topics list offline
    if (url.includes('/lessons/subject/')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const form = urlParams.get('form');
      const subject = decodeURIComponent(url.split('/subject/')[1].split('?')[0]);
      const cached = await getCachedTopicsList(subject, form);
      if (cached) {
        // Return in the same structure as the online response: { data: { data: [...] } }
        return Promise.resolve({ data: { data: cached } });
      }
    }
    // Single lesson (by lessonId)
    if (url.match(/\/lessons\/[^/]+\/[^/]+$/)) {
      const lessonId = url.split('/').pop().split('?')[0];
      const cached = await getCachedLesson(lessonId);
      if (cached) return Promise.resolve({ data: cached });
    }
    // Topics list (dedicated endpoint)
    if (url.includes('/lessons/topics/')) {
      const parts = url.split('/');
      const subject = decodeURIComponent(parts[4]);
      const form = decodeURIComponent(parts[5]);
      const cached = await getCachedTopicsList(subject, form);
      if (cached) return Promise.resolve({ data: cached });
    }
    // Chat history
    if (url === '/chat/history') {
      const sessions = await getAllCachedChatSessions();
      return Promise.resolve({ data: { data: sessions } });
    }
    // Single chat session
    if (url.match(/\/chat\/session\/.+/)) {
      const sessionId = url.split('/').pop();
      const session = await getCachedChatSession(sessionId);
      if (session) return Promise.resolve({ data: session });
    }
    // Quiz result for a lesson
    if (url.includes('/quiz/result/')) {
      const lessonId = url.split('/').pop();
      const result = await getCachedQuizResultForLesson(lessonId);
      if (result) return Promise.resolve({ data: result });
    }
    // All quiz results
    if (url === '/quiz/results/all') {
      const results = await getAllCachedQuizResults();
      return Promise.resolve({ data: results });
    }

    return Promise.reject(error);
  }
);

export default api;