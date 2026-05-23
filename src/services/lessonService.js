// import api from './api';
// import {
//   getCachedSubjectsList,
//   cacheSubjectsList,
//   getCachedTopicsList,
//   cacheTopicsList,
//   getCachedLesson,
//   cacheLesson
// } from './cache';

// // Get all subjects with lessons for the logged-in user's form
// export const getMySubjects = async () => {
//   if (navigator.onLine) {
//     try {
//       const response = await api.get('/lessons/my-subjects');
//       const subjects = response.data.data;
//       await cacheSubjectsList(subjects);
//       return subjects;
//     } catch (error) {
//       const cached = await getCachedSubjectsList();
//       if (cached) return cached;
//       throw error;
//     }
//   } else {
//     const cached = await getCachedSubjectsList();
//     if (cached) return cached;
//     throw new Error('No cached subjects available. Please go online to load subjects once.');
//   }
// };

// // Get all lessons for a specific subject and form (used for topic list)
// export const getLessonsBySubjectAndForm = async (subject, form) => {
//   if (navigator.onLine) {
//     try {
//       const response = await api.get(`/lessons/subject/${encodeURIComponent(subject)}?form=${encodeURIComponent(form)}`);
//       const lessons = response.data.data;
//       await cacheTopicsList(subject, form, lessons);
//       return lessons;
//     } catch (error) {
//       const cached = await getCachedTopicsList(subject, form);
//       if (cached) return cached;
//       throw error;
//     }
//   } else {
//     const cached = await getCachedTopicsList(subject, form);
//     if (cached) return cached;
//     throw new Error('No cached lessons available for this subject.');
//   }
// };

// // Get a single lesson by subject and lessonId
// export const getLessonByLessonId = async (subject, lessonId) => {
//   if (navigator.onLine) {
//     try {
//       const response = await api.get(`/lessons/${encodeURIComponent(subject)}/${encodeURIComponent(lessonId)}`);
//       const lesson = response.data;
//       await cacheLesson(lesson);
//       return lesson;
//     } catch (error) {
//       const cached = await getCachedLesson(lessonId);
//       if (cached) return cached;
//       throw error;
//     }
//   } else {
//     const cached = await getCachedLesson(lessonId);
//     if (cached) return cached;
//     throw new Error('No cached lesson found. Please go online to load this lesson once.');
//   }
// };

// // Alternative: get lesson by topic (filter from all lessons of subject+form)
// export const getLessonByTopic = async (subject, form, topic) => {
//   const lessons = await getLessonsBySubjectAndForm(subject, form);
//   return lessons.find(lesson => lesson.topic === topic);
// };

// // ========== BACKGROUND PRE‑CACHING ==========
// // Pre‑cache all lessons for the user's form (runs in background, does not block UI)
// export const precacheAllLessons = async (userForm) => {
//   if (!navigator.onLine) return;
//   if (!userForm) return;

//   const subjects = ['Mathematics', 'Physics', 'Biology', 'Chemistry', 'English', 'Agriculture'];
  
//   for (const subject of subjects) {
//     // Skip if already cached for this form
//     const cached = await getCachedTopicsList(subject, userForm);
//     if (cached && cached.length > 0) continue;
    
//     try {
//       await getLessonsBySubjectAndForm(subject, userForm);
     
//       await new Promise(resolve => setTimeout(resolve, 300));
//     } catch (err) {
//       console.error(`Failed to precache ${subject}:`, err);
//     }
//   }
// };

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
      // Also cache the topics list (unique topics) for offline subject browsing
      const uniqueTopics = [...new Map(lessons.map(l => [l.topic, l])).values()];
      await cacheTopicsList(subject, form, uniqueTopics);
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

// Alternative: get lesson by topic (filter from all lessons of subject+form)
export const getLessonByTopic = async (subject, form, topic) => {
  const lessons = await getLessonsBySubjectAndForm(subject, form);
  return lessons.find(lesson => lesson.topic === topic);
};

// ========== BACKGROUND PRE‑CACHING ==========
// Pre‑cache all lessons for the user's form (runs in background, does not block UI)
export const precacheAllLessons = async (userForm) => {
  if (!navigator.onLine || !userForm) return;

  // Get all subjects first (from backend or cache)
  let subjects = [];
  try {
    const subjectsRes = await api.get('/lessons/my-subjects');
    subjects = subjectsRes.data.data;
    await cacheSubjectsList(subjects);
  } catch (err) {
    console.error('Failed to fetch subjects for precache:', err);
    return;
  }

  // For each subject, fetch its lessons (which will be cached automatically by the response interceptor)
  for (const subj of subjects) {
    const subjectName = subj.subject;
    try {
      // This call will:
      // - fetch lessons from backend
      // - cache each lesson individually (cacheMultipleLessons)
      // - cache the topics list (via getLessonsBySubjectAndForm)
      await getLessonsBySubjectAndForm(subjectName, userForm);
      // Small delay to avoid overwhelming the network
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      console.error(`Pre‑cache failed for ${subjectName}:`, err);
    }
  }
  console.log('Pre‑caching of all lessons completed');
};