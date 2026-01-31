'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  Target, 
  BookOpen, 
  Briefcase,
  Sparkles,
  TrendingUp,
  Zap,
  CheckCircle2
} from 'lucide-react';

const ANALYSIS_STAGES = [
  {
    id: 1,
    icon: Brain,
    title: 'Analyzing Your Profile',
    description: 'Processing your interests, strengths, and goals...',
    duration: 3000,
    color: 'from-purple-500 to-purple-700',
    funFact: 'Our AI considers over 50 data points about you!'
  },
  {
    id: 2,
    icon: Target,
    title: 'Matching Careers',
    description: 'Comparing your profile with 500+ career paths...',
    duration: 3500,
    color: 'from-emerald-500 to-emerald-700',
    funFact: 'We analyze careers across 12+ industries in Nigeria!'
  },
  {
    id: 3,
    icon: BookOpen,
    title: 'Building Your Roadmap',
    description: 'Creating personalized learning paths...',
    duration: 3000,
    color: 'from-blue-500 to-blue-700',
    funFact: 'Each roadmap is customized to your skill level!'
  },
  {
    id: 4,
    icon: Briefcase,
    title: 'Finding Opportunities',
    description: 'Searching for relevant jobs and internships...',
    duration: 2500,
    color: 'from-orange-500 to-orange-700',
    funFact: 'We track thousands of job openings in Nigeria!'
  },
];

export default function AILoadingScreen() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    if (currentStage >= ANALYSIS_STAGES.length) {
      // All stages complete - redirect to results
      setTimeout(() => {
        router.push('/results');
      }, 1000);
      return;
    }

    const stage = ANALYSIS_STAGES[currentStage];
    const progressInterval = 50; // Update every 50ms
    const progressIncrement = (100 / (stage.duration / progressInterval));

    let progress = 0;
    const interval = setInterval(() => {
      progress += progressIncrement;
      setStageProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(interval);
        setCompletedStages(prev => [...prev, currentStage]);
        
        setTimeout(() => {
          setCurrentStage(currentStage + 1);
          setStageProgress(0);
        }, 500);
      }
    }, progressInterval);

    return () => clearInterval(interval);
  }, [currentStage, router]);

  const overallProgress = ((currentStage + stageProgress / 100) / ANALYSIS_STAGES.length) * 100;
  const CurrentIcon = ANALYSIS_STAGES[currentStage]?.icon || Sparkles;
  const currentStageData = ANALYSIS_STAGES[currentStage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl border border-neutral-200 p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4"
            >
              <Sparkles className="w-4 h-4" />
              AI Analysis in Progress
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Finding Your Perfect Career Path
            </h1>
            <p className="text-neutral-600">
              Our AI is analyzing your unique profile...
            </p>
          </div>

          {/* Main Animation Area */}
          <div className="mb-8">
            {/* Animated Icon */}
            <div className="flex justify-center mb-8">
              <motion.div
                key={currentStage}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="relative"
              >
                <motion.div
                  className={`w-32 h-32 bg-gradient-to-br ${currentStageData?.color || 'from-emerald-500 to-emerald-700'} rounded-3xl flex items-center justify-center shadow-2xl`}
                  animate={{
                    boxShadow: [
                      '0 10px 40px rgba(16, 185, 129, 0.3)',
                      '0 10px 60px rgba(16, 185, 129, 0.5)',
                      '0 10px 40px rgba(16, 185, 129, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CurrentIcon className="w-16 h-16 text-white" />
                </motion.div>

                {/* Pulse Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${currentStageData?.color || 'from-emerald-500 to-emerald-700'} rounded-3xl`}
                  animate={{
                    scale: [1, 1.3, 1.3, 1],
                    opacity: [0.5, 0, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </div>

            {/* Current Stage Info */}
            <AnimatePresence mode="wait">
              {currentStageData && (
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    {currentStageData.title}
                  </h2>
                  <p className="text-neutral-600 mb-4">
                    {currentStageData.description}
                  </p>
                  
                  {/* Fun Fact */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-start gap-2 px-4 py-3 bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl text-sm text-neutral-700"
                  >
                    <Zap className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{currentStageData.funFact}</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Overall Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-700">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {Math.round(overallProgress)}%
              </span>
            </div>
            <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="grid grid-cols-4 gap-3">
            {ANALYSIS_STAGES.map((stage, index) => {
              const StageIcon = stage.icon;
              const isCompleted = completedStages.includes(index);
              const isCurrent = index === currentStage;
              const isPending = index > currentStage;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-50 border-emerald-500'
                      : isCurrent
                      ? 'bg-white border-emerald-500 shadow-lg'
                      : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isCurrent
                          ? 'bg-emerald-500'
                          : 'bg-neutral-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <StageIcon
                          className={`w-5 h-5 ${
                            isCurrent ? 'text-white' : 'text-neutral-500'
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs text-center font-medium ${
                        isCompleted || isCurrent
                          ? 'text-neutral-900'
                          : 'text-neutral-500'
                      }`}
                    >
                      {stage.title}
                    </span>
                    
                    {/* Progress bar for current stage */}
                    {isCurrent && (
                      <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden mt-1">
                        <motion.div
                          className="h-full bg-emerald-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${stageProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-neutral-500">
              This usually takes 30-60 seconds. Hang tight! ☕
            </p>
          </motion.div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: '50%',
              top: '50%',
            }}
          />
        ))}
      </div>
    </div>
  );
}