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

