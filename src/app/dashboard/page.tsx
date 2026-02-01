'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp,
  Calendar,
  Target,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Star,
  Trophy,
  Zap,
  Brain,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Sparkles,
  MessageCircle,
  BarChart3,
  Activity
} from 'lucide-react';

// Mock user progress data
const USER_PROGRESS = {
  userId: '12345',
  name: 'Andrew Gold',
  startedAt: '2024-01-15',
  selectedCareer: 'Full-Stack Developer',
  currentPhase: 'Frontend Development',
  
  stats: {
    daysActive: 45,
    overallProgress: 38,
    phasesCompleted: 1,
    totalPhases: 4,
    skillsGained: 8,
    totalSkills: 15,
    hoursInvested: 95,
    streakDays: 7,
  },

  roadmap: [
    {
      id: 1,
      title: 'Foundation',
      status: 'completed',
      progress: 100,
      startedAt: '2024-01-15',
      completedAt: '2024-02-28',
      duration: '6 weeks',
      skills: ['HTML/CSS', 'JavaScript Basics', 'Git & GitHub'],
      achievements: ['First Commit', 'Portfolio Started'],
    },
    {
      id: 2,
      title: 'Frontend Development',
      status: 'in-progress',
      progress: 52,
      startedAt: '2024-03-01',
      completedAt: null,
      duration: '8 weeks',
      skills: ['React.js', 'TypeScript', 'Tailwind CSS'],
      currentFocus: 'Building React components',
      nextMilestone: 'Complete Todo App project',
    },
    {
      id: 3,
      title: 'Backend Development',
      status: 'locked',
      progress: 0,
      startedAt: null,
      completedAt: null,
      duration: '8 weeks',
      skills: ['Node.js', 'Express', 'MongoDB'],
    },
    {
      id: 4,
      title: 'Full-Stack Projects',
      status: 'locked',
      progress: 0,
      startedAt: null,
      completedAt: null,
      duration: '10 weeks',
      skills: ['Build 3-5 projects', 'Deploy to cloud', 'Portfolio'],
    },
  ],

  skillsProgress: [
    { name: 'HTML/CSS', before: 20, current: 85, target: 85, status: 'mastered' },
    { name: 'JavaScript', before: 15, current: 65, target: 85, status: 'in-progress' },
    { name: 'React.js', before: 0, current: 45, target: 85, status: 'in-progress' },
    { name: 'Git/GitHub', before: 10, current: 75, target: 75, status: 'mastered' },
    { name: 'TypeScript', before: 0, current: 30, target: 80, status: 'in-progress' },
    { name: 'Node.js', before: 0, current: 0, target: 80, status: 'not-started' },
    { name: 'Database Design', before: 0, current: 0, target: 75, status: 'not-started' },
  ],

  recentAchievements: [
    {
      id: 1,
      title: 'First Project Deployed!',
      description: 'Successfully deployed portfolio to Netlify',
      unlockedAt: '2024-02-25',
      icon: '🚀',
    },
    {
      id: 2,
      title: '7 Day Streak',
      description: 'Learning consistently for a week',
      unlockedAt: '2024-03-10',
      icon: '🔥',
    },
    {
      id: 3,
      title: 'Foundation Complete',
      description: 'Completed Phase 1 of learning roadmap',
      unlockedAt: '2024-02-28',
      icon: '🎯',
    },
  ],

  aiCheckIns: [
    {
      id: 1,
      date: '2024-03-15',
      type: 'weekly-reflection',
      aiMessage: "Great progress on React! I noticed you're building components confidently. Ready to tackle state management next?",
      userResponse: null,
    },
    {
      id: 2,
      date: '2024-03-08',
      type: 'encouragement',
      aiMessage: "You've maintained a 7-day streak! Consistency is key. Keep it up! 🔥",
      userResponse: 'acknowledged',
    },
    {
      id: 3,
      date: '2024-03-01',
      type: 'milestone',
      aiMessage: "Congratulations on completing Foundation! You've built a solid base. Frontend development will build on this.",
      userResponse: 'acknowledged',
    },
  ],

  upcomingMilestones: [
    { task: 'Complete React Todo App', dueDate: '2024-03-25', priority: 'high' },
    { task: 'Learn React Hooks', dueDate: '2024-03-28', priority: 'high' },
    { task: 'Build Portfolio v2', dueDate: '2024-04-05', priority: 'medium' },
  ],
};

export default function ProgressDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'skills' | 'check-ins'>('overview');
  const [showCelebration, setShowCelebration] = useState(false);
  const progress = USER_PROGRESS;

  useEffect(() => {
    // Show celebration for recent achievements
    const hasRecent = progress.recentAchievements.some(a => {
      const days = Math.floor((new Date().getTime() - new Date(a.unlockedAt).getTime()) / (1000 * 60 * 60 * 24));
      return days < 7;
    });
    if (hasRecent) setShowCelebration(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6" />
              <span className="text-emerald-200 font-semibold">Progress Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {progress.name}! 👋
            </h1>
            <p className="text-emerald-100 text-lg">
              You're {progress.stats.overallProgress}% of the way to becoming a {progress.selectedCareer}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <StatCard
                icon={Calendar}
                label="Days Active"
                value={progress.stats.daysActive}
                color="blue"
              />
              <StatCard
                icon={Flame}
                label="Current Streak"
                value={`${progress.stats.streakDays} days`}
                color="orange"
              />
              <StatCard
                icon={Clock}
                label="Hours Invested"
                value={progress.stats.hoursInvested}
                color="purple"
              />
              <StatCard
                icon={Trophy}
                label="Achievements"
                value={progress.recentAchievements.length}
                color="yellow"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'roadmap', label: 'Roadmap', icon: Target },
            { id: 'skills', label: 'Skills', icon: Zap },
            { id: 'check-ins', label: 'AI Check-ins', icon: Brain },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && <OverviewTab progress={progress} />}
          {activeTab === 'roadmap' && <RoadmapTab progress={progress} />}
          {activeTab === 'skills' && <SkillsTab progress={progress} />}
          {activeTab === 'check-ins' && <CheckInsTab progress={progress} />}
        </AnimatePresence>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <CelebrationModal
          achievement={progress.recentAchievements[0]}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
}

// ==================== OVERVIEW TAB ====================
function OverviewTab({ progress }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Overall Progress */}
      <div className="bg-white rounded-2xl border-2 border-neutral-200 p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-emerald-600" />
          Overall Progress to Job-Ready
        </h2>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-neutral-700 font-medium">
              {progress.stats.phasesCompleted} of {progress.stats.totalPhases} phases completed
            </span>
            <span className="text-3xl font-bold text-emerald-600">
              {progress.stats.overallProgress}%
            </span>
          </div>
          <div className="h-4 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.stats.overallProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-500 rounded-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-sm text-blue-700 mb-1">Current Phase</div>
            <div className="font-bold text-blue-900">{progress.currentPhase}</div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="text-sm text-emerald-700 mb-1">Skills Gained</div>
            <div className="font-bold text-emerald-900">
              {progress.stats.skillsGained} / {progress.stats.totalSkills}
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="text-sm text-purple-700 mb-1">Est. Time Remaining</div>
            <div className="font-bold text-purple-900">4-5 months</div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-2xl border-2 border-neutral-200 p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          Recent Achievements
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {progress.recentAchievements.map((achievement: any) => (
            <motion.div
              key={achievement.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 * achievement.id }}
              className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300 text-center"
            >
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h3 className="font-bold text-neutral-900 mb-2">{achievement.title}</h3>
              <p className="text-sm text-neutral-600">{achievement.description}</p>
              <div className="text-xs text-neutral-500 mt-2">
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Milestones */}
      <div className="bg-white rounded-2xl border-2 border-neutral-200 p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-blue-600" />
          Upcoming Milestones
        </h2>

        <div className="space-y-3">
          {progress.upcomingMilestones.map((milestone: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-emerald-400 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  milestone.priority === 'high' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{milestone.task}</h3>
                  <p className="text-sm text-neutral-600">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                milestone.priority === 'high'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {milestone.priority.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Learning CTA */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
        <Sparkles className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Keep the momentum going!</h2>
        <p className="text-emerald-100 mb-6">
          You're on track. Let's continue with {progress.currentPhase}.
        </p>
        <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2">
          Continue Learning
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

// ==================== ROADMAP TAB ====================
function RoadmapTab({ progress }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl border-2 border-neutral-200 p-8"
    >
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-emerald-600" />
        Your Learning Roadmap
      </h2>

      <div className="space-y-6">
        {progress.roadmap.map((phase: any, index: number) => (
          <RoadmapPhaseCard key={phase.id} phase={phase} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function RoadmapPhaseCard({ phase, index }: any) {
  const isCompleted = phase.status === 'completed';
  const isInProgress = phase.status === 'in-progress';
  const isLocked = phase.status === 'locked';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`border-2 rounded-xl overflow-hidden ${
        isCompleted
          ? 'border-emerald-500 bg-emerald-50'
          : isInProgress
          ? 'border-blue-500 bg-blue-50'
          : 'border-neutral-300 bg-neutral-50 opacity-60'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Phase Number */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
            isCompleted
              ? 'bg-emerald-500 text-white'
              : isInProgress
              ? 'bg-blue-500 text-white'
              : 'bg-neutral-300 text-neutral-600'
          }`}>
            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
          </div>

          {/* Phase Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-neutral-900">{phase.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : isInProgress
                  ? 'bg-blue-500 text-white'
                  : 'bg-neutral-400 text-white'
              }`}>
                {phase.status.toUpperCase().replace('-', ' ')}
              </span>
            </div>

            <p className="text-neutral-600 mb-4">Duration: {phase.duration}</p>

            {/* Progress Bar for In-Progress */}
            {isInProgress && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Progress</span>
                  <span className="text-sm font-bold text-blue-600">{phase.progress}%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${phase.progress}%` }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
                <p className="text-sm text-neutral-600 mt-2">
                  <strong>Current Focus:</strong> {phase.currentFocus}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  <strong>Next Milestone:</strong> {phase.nextMilestone}
                </p>
              </div>
            )}

            {/* Skills */}
            <div>
              <h4 className="text-sm font-semibold text-neutral-700 mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {phase.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      isCompleted
                        ? 'bg-emerald-200 text-emerald-800'
                        : isInProgress
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Timestamps */}
            {phase.startedAt && (
              <div className="mt-4 text-xs text-neutral-500">
                Started: {new Date(phase.startedAt).toLocaleDateString()}
                {phase.completedAt && ` • Completed: ${new Date(phase.completedAt).toLocaleDateString()}`}
              </div>
            )}

            {/* Achievements */}
            {phase.achievements && (
              <div className="mt-4 flex gap-2">
                {phase.achievements.map((achievement: string) => (
                  <span key={achievement} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                    🏆 {achievement}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== SKILLS TAB ====================
function SkillsTab({ progress }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl border-2 border-neutral-200 p-8"
    >
      <h2 className="text-2xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
        <Zap className="w-6 h-6 text-yellow-600" />
        Skills Growth Tracker
      </h2>
      <p className="text-neutral-600 mb-6">
        Track how your skills have improved since you started
      </p>

      <div className="space-y-6">
        {progress.skillsProgress.map((skill: any, index: number) => (
          <SkillGrowthBar key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function SkillGrowthBar({ skill, index }: any) {
  const growth = skill.current - skill.before;
  const isGrowing = growth > 0;
  const isMastered = skill.status === 'mastered';
  const isNotStarted = skill.status === 'not-started';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-neutral-900">{skill.name}</span>
          {isMastered && (
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              MASTERED
            </span>
          )}
          {isGrowing && !isMastered && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +{growth}%
            </span>
          )}
        </div>
        <span className="text-sm text-neutral-600">
          {skill.current}% / {skill.target}%
        </span>
      </div>

      <div className="relative h-12 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200">
        {/* Before level (faded) */}
        {skill.before > 0 && (
          <div
            className="absolute h-full bg-neutral-300 opacity-40"
            style={{ width: `${skill.before}%` }}
          />
        )}

        {/* Current level */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.current}%` }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
          className={`absolute h-full ${
            isMastered
              ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
              : isNotStarted
              ? 'bg-neutral-300'
              : 'bg-gradient-to-r from-blue-400 to-blue-600'
          } flex items-center justify-end pr-3`}
        >
          {skill.current > 0 && (
            <span className="text-sm font-bold text-white">
              {skill.current}%
            </span>
          )}
        </motion.div>

        {/* Target marker */}
        <div
          className="absolute h-full border-r-4 border-yellow-500"
          style={{ left: `${skill.target}%` }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-yellow-500 text-white text-xs rounded font-bold whitespace-nowrap">
            Target
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mt-2 text-xs text-neutral-500">
        <span>Before: {skill.before}%</span>
        <span>Gap: {Math.max(0, skill.target - skill.current)}%</span>
      </div>
    </motion.div>
  );
}

// ==================== AI CHECK-INS TAB ====================
function CheckInsTab({ progress }: any) {
  const [newMessage, setNewMessage] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* AI Check-ins */}
      <div className="bg-white rounded-2xl border-2 border-neutral-200 p-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          AI Career Coach Check-ins
        </h2>
        <p className="text-neutral-600 mb-6">
          Your AI mentor checks in weekly to track progress and provide guidance
        </p>

        <div className="space-y-4">
          {progress.aiCheckIns.map((checkIn: any) => (
            <AICheckInCard key={checkIn.id} checkIn={checkIn} />
          ))}
        </div>
      </div>

      {/* Weekly Reflection Prompt */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 p-8">
        <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-purple-600" />
          This Week's Reflection
        </h3>
        <p className="text-neutral-700 mb-4">
          How are you feeling about your progress? What challenges did you face this week?
        </p>
        
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Share your thoughts... (This helps the AI adjust your learning path)"
          rows={4}
          className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none mb-4"
        />
        
        <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Submit Reflection
        </button>
      </div>
    </motion.div>
  );
}

function AICheckInCard({ checkIn }: any) {
  const typeIcons: any = {
    'weekly-reflection': Brain,
    'encouragement': Sparkles,
    'milestone': Trophy,
  };
  
  const Icon = typeIcons[checkIn.type] || Brain;

  return (
    <div className="flex gap-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200">
      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-600 font-semibold uppercase">
            {checkIn.type.replace('-', ' ')}
          </span>
          <span className="text-xs text-neutral-500">
            {new Date(checkIn.date).toLocaleDateString()}
          </span>
        </div>
        
        <p className="text-neutral-800 leading-relaxed">
          {checkIn.aiMessage}
        </p>
        
        {!checkIn.userResponse && (
          <button className="mt-3 text-sm text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
            Respond
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ==================== HELPER COMPONENTS ====================
function StatCard({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-emerald-100">{label}</div>
    </div>
  );
}

function CelebrationModal({ achievement, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="bg-white rounded-2xl p-8 max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">{achievement.icon}</div>
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">
          {achievement.title}
        </h2>
        <p className="text-neutral-600 mb-6">
          {achievement.description}
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
        >
          Awesome! 🎉
        </button>
      </motion.div>
    </motion.div>
  );
}