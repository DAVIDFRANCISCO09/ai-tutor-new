
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  FileText,
  Lightbulb,
  Target
} from 'lucide-react';
import { MOCK_LESSONS } from './learningData';
export const LessonPage = ({ 
  topic, 
  onBack, 
  onStartChat, 
  onStartQuiz 
}) => {
  const lesson = MOCK_LESSONS[topic] || {
    title: topic,
    introduction: `Welcome to your lesson on ${topic}. This lesson will cover the fundamental concepts and principles related to this area of study.`,
    keyPoints: [
      'Core definitions and terminology',
      'Key principles and theories',
      'Practical applications and examples',
      'Summary of essential takeaways'
    ],
    detailedContent: `
      In this section, we dive deeper into ${topic}. We will examine how these concepts apply in real-world scenarios and explore the relationships between different sub-topics.
      
      Understanding ${topic} requires a clear grasp of the underlying logic and the ability to apply these ideas to solve problems or analyze situations.
    `,
    summary: `By mastering ${topic}, you build a stronger foundation for your overall academic success in this subject.`,
    estimatedTime: '15 mins'
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-6 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#1a365d]"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#1a365d]">{lesson.title}</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <Clock size={12} />
            <span>{lesson.estimatedTime} read</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* Introduction */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-[#1a365d]">
            <Lightbulb size={20} />
            <h2 className="text-lg font-bold uppercase tracking-wider">Introduction</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg italic">
            "{lesson.introduction}"
          </p>
        </motion.section>

        {/* Learning Objectives */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-2 text-[#1a365d]">
            <Target size={20} />
            <h2 className="text-lg font-bold uppercase tracking-wider">Learning Objectives</h2>
          </div>
          <ul className="space-y-4">
            {lesson.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-4 group">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CheckCircle size={14} />
                </div>
                <span className="text-gray-700 font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Lesson Content */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 text-[#1a365d]">
            <FileText size={20} />
            <h2 className="text-lg font-bold uppercase tracking-wider">Lesson Content</h2>
          </div>
          <div className="prose prose-blue max-w-none">
            {lesson.detailedContent.split('\n').map((paragraph, idx) => (
              paragraph.trim() && (
                <p key={idx} className="text-gray-700 leading-relaxed mb-4 text-lg">
                  {paragraph.trim()}
                </p>
              )
            ))}
          </div>
        </motion.section>

        {/* Summary */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 p-8 rounded-3xl border border-blue-100 space-y-4"
        >
          <h2 className="text-lg font-bold text-[#1a365d] uppercase tracking-wider">Summary</h2>
          <p className="text-blue-900 leading-relaxed font-medium">
            {lesson.summary}
          </p>
        </motion.section>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6"
        >
          <button 
            onClick={onStartChat}
            className="flex items-center justify-center gap-3 bg-[#1a365d] text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-blue-900 transition-all active:scale-95"
          >
            <MessageSquare size={20} />
            Discuss with AI Tutor
          </button>
          <button 
            onClick={onStartQuiz}
            className="flex items-center justify-center gap-3 bg-white text-[#1a365d] py-5 rounded-2xl font-bold border-2 border-[#1a365d]/10 hover:border-[#1a365d]/30 transition-all active:scale-95"
          >
            <Play size={20} />
            Take Lesson Quiz
          </button>
        </motion.div>
      </div>
    </div>
  );
};
