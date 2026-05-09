import api from './api';

// Get all subjects with lessons for the logged-in user's form
export const getMySubjects = async () => {
  const response = await api.get('/lessons/my-subjects');
  return response.data.data; // array: [{ subject, form, count, lessons: [...] }]
};

// Get all lessons for a specific subject and form (used for topic list)
export const getLessonsBySubjectAndForm = async (subject, form) => {
  const response = await api.get(`/lessons/subject/${encodeURIComponent(subject)}?form=${encodeURIComponent(form)}`);
  return response.data.data; // array of lesson objects
};

// Get a single lesson by subject and lessonId (if you have the lessonId)
export const getLessonByLessonId = async (subject, lessonId) => {
  const response = await api.get(`/lessons/${encodeURIComponent(subject)}/${encodeURIComponent(lessonId)}`);
  return response.data; // the lesson object
};

// Alternative: get lesson by topic (filter from all lessons of subject+form)
export const getLessonByTopic = async (subject, form, topic) => {
  const lessons = await getLessonsBySubjectAndForm(subject, form);
  return lessons.find(lesson => lesson.topic === topic);
};