import { openDB } from 'idb';

const DB_NAME = 'SmartMphunzitsiCache';
const DB_VERSION = 1;

let dbPromise = null;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('lessons')) {
          const lessonStore = db.createObjectStore('lessons', { keyPath: 'lessonId' });
          lessonStore.createIndex('subject', 'subject');
        }
        if (!db.objectStoreNames.contains('chatSessions')) {
          const chatStore = db.createObjectStore('chatSessions', { keyPath: 'sessionId' });
          chatStore.createIndex('updatedAt', 'updatedAt');
        }
        if (!db.objectStoreNames.contains('quizResults')) {
          const quizStore = db.createObjectStore('quizResults', { keyPath: 'quizId' });
          quizStore.createIndex('lessonId', 'lessonId');
          quizStore.createIndex('date', 'date');
        }
        if (!db.objectStoreNames.contains('topicsLists')) {
          db.createObjectStore('topicsLists', { keyPath: 'key' });
        }
      }
    });
  }
  return dbPromise;
};

// ========== Lessons ==========
export const cacheLesson = async (lesson) => {
  const db = await getDB();
  await db.put('lessons', { ...lesson, cachedAt: Date.now() });
};

export const cacheMultipleLessons = async (lessons) => {
  const db = await getDB();
  const tx = db.transaction('lessons', 'readwrite');
  for (const lesson of lessons) {
    await tx.store.put({ ...lesson, cachedAt: Date.now() });
  }
  await tx.done;
};

export const getCachedLesson = async (lessonId) => {
  const db = await getDB();
  return db.get('lessons', lessonId);
};

// ========== Chat Sessions ==========
export const cacheChatSession = async (session) => {
  const db = await getDB();
  await db.put('chatSessions', { ...session, updatedAt: Date.now() });
};

export const getAllCachedChatSessions = async () => {
  const db = await getDB();
  return db.getAll('chatSessions');
};

export const getCachedChatSession = async (sessionId) => {
  const db = await getDB();
  return db.get('chatSessions', sessionId);
};

// ========== Quiz Results ==========
export const cacheQuizResult = async (quizId, lessonId, score, answers, questions) => {
  const db = await getDB();
  await db.put('quizResults', {
    quizId,
    lessonId,
    score,
    answers,
    questions,
    date: Date.now()
  });
};

export const getCachedQuizResultForLesson = async (lessonId) => {
  const db = await getDB();
  const index = db.transaction('quizResults').store.index('lessonId');
  const all = await index.getAll(lessonId);
  return all.sort((a, b) => b.date - a.date)[0];
};

export const getAllCachedQuizResults = async () => {
  const db = await getDB();
  return db.getAll('quizResults');
};

// ========== Topics Lists ==========
export const cacheTopicsList = async (subject, form, topics) => {
  const db = await getDB();
  const key = `topics_${subject}_${form}`;
  await db.put('topicsLists', { key, topics, cachedAt: Date.now() });
};

export const getCachedTopicsList = async (subject, form) => {
  const db = await getDB();
  const key = `topics_${subject}_${form}`;
  const record = await db.get('topicsLists', key);
  return record?.topics || null;
};