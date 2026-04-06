import React from 'react';
import { Microscope, FlaskConical, Zap, Calculator, Sprout, Languages } from 'lucide-react';

export const SUBJECTS = [
  { name: 'Biology',     progress: 70, icon: <Microscope size={20} />,     },
  { name: 'Chemistry',   progress: 55, icon: <FlaskConical size={20} />,    },
  { name: 'Physics',     progress: 65, icon: <Zap size={20} />,           },
  { name: 'Mathematics', progress: 85, icon: <Calculator size={20} />,     },
  { name: 'Agriculture', progress: 40, icon: <Sprout size={20} />,          },
  { name: 'English',     progress: 75, icon: <Languages size={20} />,     },
];

export const TOPICS_DATA = {
  Mathematics: {
    'Form 1': ['Numbers', 'Algebraic Expressions', 'Linear Equations', 'Geometry Basics', 'Statistics'],
    'Form 2': ['Quadratic Equations', 'Circles', 'Trigonometry', 'Probability', 'Matrices'],
    'Form 3': ['Functions', 'Coordinate Geometry', 'Vectors', 'Linear Programming'],
    'Form 4': ['Sets', 'Complex Numbers', 'Linear Equations', 'Mechanics', 'Probability'],
  },
  Physics: {
    'Form 1': ['Introduction to Physics', 'Measurement', 'Force and Motion', 'Energy', 'Pressure'],
    'Form 2': ['Heat and Temperature', 'Light and Optics', 'Sound', 'Static Electricity', 'Current Electricity'],
    'Form 3': ['Magnetism', 'Electromagnetism', 'Electronics', 'Radioactivity', 'Atomic Physics'],
    'Form 4': ['Wave Motion', 'Quantum Physics', 'Astrophysics', 'Medical Physics', 'Renewable Energy'],
  },
  Biology: {
    'Form 1': ['Introduction to Biology', 'Classification', 'The Cell', 'Nutrition in Plants', 'Nutrition in Animals'],
    'Form 2': ['Transport in Plants', 'Transport in Animals', 'Respiration', 'Excretion', 'Gaseous Exchange'],
    'Form 3': ['Coordination and Response', 'Support and Movement', 'Reproduction', 'Genetics', 'Evolution'],
    'Form 4': ['Ecology', 'Human Health', 'Biotechnology', 'Applied Biology', 'Conservation'],
  },
  English: {
    'Form 1': ['Grammar Basics', 'Sentence Structure', 'Short Stories', 'Poetry Intro', 'Letter Writing'],
    'Form 2': ['Advanced Grammar', 'Essay Writing', 'Drama Basics', 'Oral Literature', 'Comprehension Skills'],
    'Form 3': ['Literature Analysis', 'Creative Writing', 'Public Speaking', 'Media Literacy', 'Research Skills'],
    'Form 4': ['Critical Thinking', 'Academic Writing', 'Shakespearean Drama', 'Modern African Literature', 'Exam Techniques'],
  },
  Chemistry: {
    'Form 1': ['Introduction to Chemistry', 'States of Matter', 'Atomic Structure', 'Periodic Table', 'Chemical Bonding'],
    'Form 2': ['Chemical Equations', 'Acids, Bases and Salts', 'Mole Concept', 'Gas Laws', 'Energy Changes'],
    'Form 3': ['Rates of Reaction', 'Reversible Reactions', 'Redox Reactions', 'Electrolysis', 'Organic Chemistry Intro'],
    'Form 4': ['Advanced Organic Chemistry', 'Industrial Chemistry', 'Environmental Chemistry', 'Qualitative Analysis', 'Quantitative Analysis'],
  },
  Agriculture: {
    'Form 1': ['Introduction to Agriculture', 'Soil Science Basics', 'Crop Production Intro', 'Livestock Production Intro', 'Farm Tools'],
    'Form 2': ['Soil Fertility', 'Plant Nutrition', 'Pests and Diseases', 'Animal Nutrition', 'Agricultural Economics Intro'],
    'Form 3': ['Farm Power and Machinery', 'Irrigation', 'Forestry', 'Fisheries', 'Agribusiness Management'],
    'Form 4': ['Agricultural Extension', 'Farm Planning', 'Sustainable Agriculture', 'Climate Change in Agriculture', 'Post-Harvest Technology'],
  },
};

export const MOCK_LESSONS = {
  'Numbers': {
    title: 'Numbers and Operations',
    introduction: 'Numbers are the foundation of mathematics. In this lesson, we will explore different types of numbers and how they interact through various operations.',
    keyPoints: [
      'Understanding Natural, Whole, and Integers',
      'Mastering the four basic operations: Addition, Subtraction, Multiplication, and Division',
      'The concept of Place Value',
      'Introduction to Decimals and Fractions',
    ],
    detailedContent: `Mathematics begins with the study of numbers. Natural numbers (1, 2, 3...) are used for counting, while whole numbers include zero. Integers extend this to negative values.
      
Place value is crucial for understanding large numbers. For example, in the number 452, the '4' represents four hundreds, the '5' represents five tens, and the '2' represents two ones.
      
Operations follow specific rules, such as the Order of Operations (BODMAS/PEMDAS), which ensures consistent results when multiple operations are present in a single expression.`,
    summary: 'Numbers are tools we use to quantify the world. Understanding their properties and how to manipulate them is essential for all further mathematical study.',
    estimatedTime: '15 mins',
  },
  'Introduction to Biology': {
    title: 'What is Biology?',
    introduction: 'Biology is the scientific study of life and living organisms. It is a vast field that explores everything from microscopic cells to entire ecosystems.',
    keyPoints: [
      'Definition of Biology and its importance',
      'Characteristics of living organisms (MRS GREN)',
      'Branches of Biology (Botany, Zoology, Microbiology)',
      'The Scientific Method in Biological research',
    ],
    detailedContent: `Living things share several key characteristics, often remembered by the acronym MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, and Nutrition.
      
Biologists use various tools and techniques to study life, ranging from microscopes for looking at cells to satellite imaging for tracking animal migrations.
      
Understanding biology helps us address global challenges like disease, food security, and environmental conservation.`,
    summary: 'Biology connects us to the natural world and helps us understand the complex processes that sustain life on Earth.',
    estimatedTime: '12 mins',
  },
  'Grammar Basics': {
    title: 'Foundations of English Grammar',
    introduction: 'Grammar is the set of structural rules governing the composition of clauses, phrases, and words in the English language.',
    keyPoints: [
      'Parts of Speech (Nouns, Verbs, Adjectives, etc.)',
      'Sentence Structure: Subject and Predicate',
      'Punctuation basics',
      'Common grammatical errors to avoid',
    ],
    detailedContent: `Every sentence must have at least a subject and a verb. The subject is who or what the sentence is about, and the verb expresses the action or state of being.
      
Nouns name people, places, things, or ideas. Verbs show action. Adjectives describe nouns, while adverbs describe verbs, adjectives, or other adverbs.
      
Correct punctuation, such as commas and periods, helps clarify meaning and ensures that your writing is easy to read and understand.`,
    summary: 'Strong grammar skills are the key to clear and effective communication in English.',
    estimatedTime: '10 mins',
  },
};
