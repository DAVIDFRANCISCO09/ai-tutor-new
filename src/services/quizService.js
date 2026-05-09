import api from './api';

export const generateQuiz = async (subject, topic, lessonContent = '') => {
  const response = await api.post('/quiz/generate', { subject, topic, lessonContent });
  return response.data.questions;
};