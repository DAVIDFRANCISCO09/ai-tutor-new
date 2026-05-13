import api from './api';
import {
  getCachedSubjectsList,
  cacheSubjectsList,
  getCachedTopicsList,
  cacheTopicsList,
  getCachedLesson,
  cacheLesson
} from './cache';

// Get all subjects with lessons for the logged-in user's form
export const getMySubjects = async () => {
  if (navigator.onLine) {
    try {
      const response = await api.get('/lessons/my-subjects');
      const subjects = response.data.data;
      await cacheSubjectsList(subjects);
      return subjects;
    } catch (error) {
      const cached = await getCachedSubjectsList();
      if (cached) return cached;
      throw error;
    }
  } else {
    const cached = await getCachedSubjectsList();
    if (cached) return cached;
    throw new Error('No cached subjects available. Please go online to load subjects once.');
  }
};

// Get all lessons for a specific subject and form (used for topic list)
export const getLessonsBySubjectAndForm = async (subject, form) => {
  if (navigator.onLine) {
    try {
      const response = await api.get(`/lessons/subject/${encodeURIComponent(subject)}?form=${encodeURIComponent(form)}`);
      const lessons = response.data.data;
      await cacheTopicsList(subject, form, lessons);
      return lessons;
    } catch (error) {
      const cached = await getCachedTopicsList(subject, form);
      if (cached) return cached;
      throw error;
    }
  } else {
    const cached = await getCachedTopicsList(subject, form);
    if (cached) return cached;
    throw new Error('No cached lessons available for this subject.');
  }
};

// Get a single lesson by subject and lessonId
export const getLessonByLessonId = async (subject, lessonId) => {
  if (navigator.onLine) {
    try {
      const response = await api.get(`/lessons/${encodeURIComponent(subject)}/${encodeURIComponent(lessonId)}`);
      const lesson = response.data;
      await cacheLesson(lesson);
      return lesson;
    } catch (error) {
      const cached = await getCachedLesson(lessonId);
      if (cached) return cached;
      throw error;
    }
  } else {
    const cached = await getCachedLesson(lessonId);
    if (cached) return cached;
    throw new Error('No cached lesson found. Please go online to load this lesson once.');
  }
};

export const getLessonByTopic = async (subject, form, topic) => {
  const lessons = await getLessonsBySubjectAndForm(subject, form);
  return lessons.find(lesson => lesson.topic === topic);
};