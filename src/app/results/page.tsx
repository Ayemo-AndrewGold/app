'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  Briefcase,
  BookOpen,
  Target,
  Award,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  DollarSign,
  Users,
  Sparkles,
  Download,
  Share2,
  ArrowRight,
  CheckCircle2,
  Zap,
  Brain,
  User,
  GraduationCap,
  Heart,
  TrendingDown
} from 'lucide-react';

// Mock data - replace with actual API data
const CAREER_RECOMMENDATIONS = [
  {
    id: '1',
    title: 'Full-Stack Developer',
    category: 'Technology',
    matchScore: 92,
    confidenceLevel: 'Very High',
    description: 'Build complete web applications from front-end to back-end, working with modern frameworks, databases, and cloud services.',
    salaryRange: {
      min: 3000000,
      max: 8000000,
      currency: 'NGN',
    },
    jobGrowth: 'high' as const,
    reasoning: [
      'Strong alignment with your programming interests',
      'Matches your problem-solving strengths perfectly',
      'High demand in Nigerian tech market',
      'Your analytical skills are ideal for this role',
    ],
    whyThisMatch: 'Your interest in Technology & Innovation (selected), combined with your Programming skills (rated 4/5) and problem-solving strength make you a perfect fit. The high demand in Lagos also aligns with your location.',
    keyFactors: {
      interests: ['Technology & Innovation', 'Business & Entrepreneurship'],
      skills: ['Programming: 4/5', 'Problem Solving: 4/5'],
      goals: 'Build tech products',
    },
    requiredSkills: [
      { name: 'React/Next.js', current: 40, required: 85, category: 'technical', priority: 'high' },
      { name: 'Node.js/Express', current: 30, required: 80, category: 'technical', priority: 'high' },
      { name: 'Database Design', current: 35, required: 75, category: 'technical', priority: 'medium' },
      { name: 'Problem Solving', current: 70, required: 85, category: 'soft', priority: 'low' },
    ],
    roadmap: {
      duration: '6-9 months',
      estimatedHours: '400-500 hours',
      phases: [
        {
          title: 'Foundation',
          duration: '2 months',
          hours: '100 hours',
          skills: ['HTML/CSS', 'JavaScript Basics', 'Git & GitHub'],
          completed: false,
        },
        {
          title: 'Frontend Development',
          duration: '2 months',
          hours: '120 hours',
          skills: ['React.js', 'TypeScript', 'Tailwind CSS'],
          completed: false,
        },
        {
          title: 'Backend Development',
          duration: '2 months',
          hours: '120 hours',
          skills: ['Node.js', 'Express', 'MongoDB/PostgreSQL'],
          completed: false,
        },
        {
          title: 'Full-Stack Projects',
          duration: '2-3 months',
          hours: '160 hours',
          skills: ['Build 3-5 projects', 'Deploy to cloud', 'Portfolio'],
          completed: false,
        },
      ],
    },
    topCompanies: ['Andela', 'Flutterwave', 'Paystack', 'Interswitch'],
    jobOpportunities: 247,
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    category: 'Design',
    matchScore: 87,
    confidenceLevel: 'High',
    description: 'Create beautiful, user-friendly interfaces and experiences for digital products, combining creativity with user research.',
    salaryRange: {
      min: 2500000,
      max: 6500000,
      currency: 'NGN',
    },
    jobGrowth: 'high' as const,
    reasoning: [
      'Excellent match with your design interests',
      'Leverages your creative strengths',
      'Growing field in Nigerian tech ecosystem',
      'Your attention to detail is perfect',
    ],
    whyThisMatch: 'Your selection of Arts & Creative Design interest, combined with your Design skills (rated 3/5) and strong Communication (4/5) make you well-suited. Growing demand in Nigerian fintech.',
    keyFactors: {
      interests: ['Arts & Creative Design', 'Technology & Innovation'],
      skills: ['Design: 3/5', 'Communication: 4/5'],
      goals: 'Create beautiful products',
    },
    requiredSkills: [
      { name: 'Figma/Design Tools', current: 50, required: 90, category: 'technical', priority: 'high' },
      { name: 'User Research', current: 30, required: 75, category: 'technical', priority: 'high' },
      { name: 'Prototyping', current: 40, required: 80, category: 'technical', priority: 'medium' },
      { name: 'Communication', current: 65, required: 85, category: 'soft', priority: 'low' },
    ],
    roadmap: {
      duration: '4-6 months',
      estimatedHours: '300-400 hours',
      phases: [
        {
          title: 'Design Fundamentals',
          duration: '1 month',
          hours: '60 hours',
          skills: ['Design Principles', 'Color Theory', 'Typography'],
          completed: false,
        },
        {
          title: 'UI Design',
          duration: '1.5 months',
          hours: '90 hours',
          skills: ['Figma Mastery', 'Component Design', 'Design Systems'],
          completed: false,
        },
        {
          title: 'UX Research',
          duration: '1.5 months',
          hours: '90 hours',
          skills: ['User Research', 'Wireframing', 'Prototyping'],
          completed: false,
        },
        {
          title: 'Portfolio Projects',
          duration: '1-2 months',
          hours: '100 hours',
          skills: ['3-5 case studies', 'Portfolio website'],
          completed: false,
        },
      ],
    },
    topCompanies: ['Kuda Bank', 'PiggyVest', 'Carbon', 'Moniepoint'],
    jobOpportunities: 183,
  },
  {
    id: '3',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    matchScore: 81,
    confidenceLevel: 'High',
    description: 'Extract insights from data to help businesses make informed decisions using statistical analysis and visualization.',
    salaryRange: {
      min: 2800000,
      max: 7000000,
      currency: 'NGN',
    },
    jobGrowth: 'medium' as const,
    reasoning: [
      'Good fit with your analytical mindset',
      'Matches your attention to detail',
      'High demand across Nigerian industries',
      'Your structured thinking is valuable',
    ],
    whyThisMatch: 'Your analytical skills and interest in problem-solving align well. Your Data Analysis rating (3/5) shows foundational knowledge. Finance industry demand in Nigeria is high.',
    keyFactors: {
      interests: ['Technology & Innovation', 'Finance & Banking'],
      skills: ['Data Analysis: 3/5', 'Problem Solving: 4/5'],
      goals: 'Work with data',
    },
    requiredSkills: [
      { name: 'Python/Excel', current: 45, required: 80, category: 'technical', priority: 'high' },
      { name: 'SQL', current: 35, required: 85, category: 'technical', priority: 'high' },
      { name: 'Data Visualization', current: 30, required: 75, category: 'technical', priority: 'medium' },
      { name: 'Critical Thinking', current: 75, required: 85, category: 'soft', priority: 'low' },
    ],
    roadmap: {
      duration: '5-7 months',
      estimatedHours: '350-450 hours',
      phases: [
        {
          title: 'Excel & Statistics',
          duration: '1.5 months',
          hours: '80 hours',
          skills: ['Advanced Excel', 'Statistics Basics', 'Data Cleaning'],
          completed: false,
        },
        {
          title: 'SQL & Databases',
          duration: '1.5 months',
          hours: '80 hours',
          skills: ['SQL Queries', 'Database Design', 'Data Extraction'],
          completed: false,
        },
        {
          title: 'Python for Data',
          duration: '2 months',
          hours: '120 hours',
          skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
          completed: false,
        },
        {
          title: 'Real Projects',
          duration: '1-2 months',
          hours: '100 hours',
          skills: ['Business analytics', 'Dashboard creation', 'Portfolio'],
          completed: false,
        },
      ],
    },
    topCompanies: ['Access Bank', 'GTBank', 'MTN Nigeria', 'Dangote Group'],
    jobOpportunities: 156,
  },
];

export default function ResultsPage() {
  const [selectedCareer, setSelectedCareer] = useState(CAREER_RECOMMENDATIONS[0]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  useEffect(() => {
    // Load user profile from localStorage
    const stored = localStorage.getItem('pathfinderOnboardingData');
    if (stored) {
      setUserProfile(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Success Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              AI Analysis Complete!
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Perfect Career Matches 🎯
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl">
              Based on your profile, our AI has identified {CAREER_RECOMMENDATIONS.length} career paths 
              that align with your interests, skills, and goals.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Target, label: 'Career Matches', value: CAREER_RECOMMENDATIONS.length },
                { icon: TrendingUp, label: 'Avg Match Score', value: '87%' },
                { icon: Briefcase, label: 'Job Opportunities', value: '586+' },
                { icon: Clock, label: 'Est. Time to Job-Ready', value: '~6 months' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <stat.icon className="w-6 h-6 text-emerald-200 mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-emerald-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download PDF Report
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Results
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Summary Card - NEW! */}
        {userProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-6 mb-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-1">
                  Your Profile Summary
                </h2>
                <p className="text-neutral-600">
                  Here's what our AI analyzed to generate your matches
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Education
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-neutral-600">Institution:</span>
                    <p className="font-semibold text-neutral-900">{userProfile.institution || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-600">Course:</span>
                    <p className="font-semibold text-neutral-900">{userProfile.courseOfStudy || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-600">Level:</span>
                    <p className="font-semibold text-neutral-900">{userProfile.currentLevel || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-600" />
                  Interests & Strengths
                </h3>
                <div className="space-y-2">
                  {userProfile.interests?.slice(0, 3).map((interest: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span className="text-sm text-neutral-800">{interest}</span>
                    </div>
                  ))}
                  {userProfile.strengths && (
                    <div className="mt-2 pt-2 border-t border-blue-200">
                      <span className="text-xs text-neutral-600">Top Strength:</span>
                      <p className="text-sm font-medium text-neutral-800">
                        {userProfile.strengths.split(',')[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  Current Skills
                </h3>
                <div className="space-y-2">
                  {Object.entries(userProfile.technicalSkills || {})
                    .slice(0, 3)
                    .map(([skill, level]: [string, any]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm text-neutral-700">{skill.split('/')[0]}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < level ? 'bg-yellow-500' : 'bg-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-neutral-600 italic">
                💡 <strong>AI Insight:</strong> Your profile shows strong alignment with tech careers, 
                with room to grow in technical skills. Your {userProfile.workStyle || 'flexible'} work 
                preference matches well with modern tech roles.
              </p>
            </div>
          </motion.div>
        )}

        {/* Career Cards */}
        <div className="space-y-6 mb-12">
          {CAREER_RECOMMENDATIONS.map((career, index) => (
            <CareerCard 
              key={career.id} 
              career={career} 
              index={index}
              isSelected={selectedCareer.id === career.id}
              onClick={() => setSelectedCareer(career)}
            />
          ))}
        </div>

        {/* Detailed View for Selected Career */}
        <motion.div
          key={selectedCareer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DetailedCareerView 
            career={selectedCareer} 
            expandedPhase={expandedPhase}
            setExpandedPhase={setExpandedPhase}
          />
        </motion.div>

        {/* AI Disclaimer - NEW! */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-neutral-100 rounded-xl border border-neutral-200"
        >
          <p className="text-sm text-neutral-600 text-center">
            🤖 <strong>Demo Note:</strong> AI recommendations currently use simulated matching 
            for demonstration purposes. Production version will integrate with OpenAI/Gemini 
            for real-time personalized analysis.
          </p>
        </motion.div>

        {/* Next Steps CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Choose a career path and get access to your personalized learning roadmap, 
            curated resources, and real job opportunities.
          </p>
          <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2 text-lg">
            Start Learning Path
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// Career Card Component - ENHANCED
function CareerCard({ career, index, isSelected, onClick }: any) {
  const matchInfo = getMatchScoreInfo(career.matchScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className={`bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'border-emerald-500 shadow-xl shadow-emerald-100'
          : 'border-neutral-200 hover:border-emerald-300 hover:shadow-lg'
      }`}
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Info */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-neutral-900">
                    {career.title}
                  </h3>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Top Match
                    </span>
                  )}
                </div>
                <p className="text-neutral-600">{career.category}</p>
              </div>
            </div>

            <p className="text-neutral-700 mb-4 leading-relaxed">
              {career.description}
            </p>

            {/* AI Reasoning - NEW! */}
            <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <h4 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-600" />
                Why {career.matchScore}% Match?
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {career.whyThisMatch}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-xs text-neutral-600">Annual Salary</div>
                  <div className="font-semibold text-neutral-900">
                    ₦{(career.salaryRange.min / 1000000).toFixed(1)}M - ₦{(career.salaryRange.max / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-xs text-neutral-600">Job Growth</div>
                  <div className={`font-semibold ${
                    career.jobGrowth === 'high' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {career.jobGrowth.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-xs text-neutral-600">Open Positions</div>
                  <div className="font-semibold text-neutral-900">
                    {career.jobOpportunities}+ jobs
                  </div>
                </div>
              </div>
            </div>

            {/* Top Companies */}
            <div>
              <h4 className="text-xs text-neutral-600 mb-2">Nigerian Companies Hiring:</h4>
              <div className="flex flex-wrap gap-2">
                {career.topCompanies.map((company: string) => (
                  <span key={company} className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Match Score */}
          <div className="flex md:flex-col items-center justify-center gap-4 md:w-48">
            <CircularProgress value={career.matchScore} size={140} />
            <div className="text-center md:mt-4">
              <div className={`inline-flex items-center gap-1 px-3 py-1 ${matchInfo.bgColor} ${matchInfo.color} rounded-full text-xs font-bold mb-2`}>
                {matchInfo.label}
              </div>
              <div className="text-xs text-neutral-600 mb-3">
                Confidence: {career.confidenceLevel}
              </div>
              <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-sm flex items-center justify-center gap-2">
                View Roadmap
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Detailed Career View - ENHANCED WITH COLLAPSIBLE SECTIONS
function DetailedCareerView({ career, expandedPhase, setExpandedPhase }: any) {
  const totalPhases = career.roadmap.phases.length;
  const completedPhases = career.roadmap.phases.filter((p: any) => p.completed).length;
  const overallProgress = (completedPhases / totalPhases) * 100;

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-500 p-8">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
        <Target className="w-6 h-6 text-emerald-600" />
        Complete Learning Roadmap: {career.title}
      </h2>
      <p className="text-neutral-600 mb-6">
        Estimated time to job-ready: <strong>{career.roadmap.duration}</strong> ({career.roadmap.estimatedHours})
      </p>

      {/* Overall Progress */}
      <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-neutral-900">Your Progress</h3>
          <span className="text-2xl font-bold text-emerald-600">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-3 bg-neutral-200 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        <p className="text-sm text-neutral-600">
          {completedPhases} of {totalPhases} phases completed
        </p>
      </div>

      {/* Learning Roadmap - COLLAPSIBLE */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Phase-by-Phase Learning Path
        </h3>
        
        <div className="space-y-3">
          {career.roadmap.phases.map((phase: any, index: number) => {
            const isExpanded = expandedPhase === index;
            
            return (
              <div key={index} className="border-2 border-neutral-200 rounded-xl overflow-hidden">
                {/* Phase Header */}
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : index)}
                  className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      phase.completed 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {phase.completed ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-neutral-900">{phase.title}</h4>
                      <p className="text-sm text-neutral-600">
                        {phase.duration} • {phase.hours}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-neutral-600 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Phase Content - Collapsible */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-neutral-200 p-4 bg-neutral-50"
                  >
                    <h5 className="text-sm font-semibold text-neutral-700 mb-3">
                      Skills You'll Learn:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill: string) => (
                        <span 
                          key={skill} 
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {!phase.completed && (
                      <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm">
                        Start This Phase
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Gap - ENHANCED */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-600" />
          Skills Gap Analysis
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          Focus on high-priority skills first for fastest progress
        </p>
        
        <div className="space-y-4">
          {career.requiredSkills.map((skill: any) => (
            <SkillGapBar key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Circular Progress Component
function CircularProgress({ value, size = 120 }: { value: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-neutral-900">{value}%</span>
        <span className="text-xs text-neutral-600">Match</span>
      </div>
    </div>
  );
}

// Skill Gap Bar - ENHANCED WITH PRIORITY
function SkillGapBar({ skill }: any) {
  const gap = skill.required - skill.current;
  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-green-100 text-green-700 border-green-300',
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-700">{skill.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${priorityColors[skill.priority]}`}>
            {skill.priority.toUpperCase()} PRIORITY
          </span>
        </div>
        <span className="text-xs text-neutral-600">
          Gap: <span className="font-semibold text-orange-600">{gap}%</span>
        </span>
      </div>
      
      <div className="relative h-8 bg-neutral-200 rounded-xl overflow-hidden">
        {/* Current Level */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.current}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-end pr-2"
        >
          <span className="text-xs font-semibold text-white">{skill.current}%</span>
        </motion.div>

        {/* Required Level Marker */}
        <div
          className="absolute h-full border-r-4 border-emerald-600 z-10"
          style={{ left: `${skill.required}%` }}
        />
        
        <div
          className="absolute -top-6 transform -translate-x-1/2 z-10"
          style={{ left: `${skill.required}%` }}
        >
          <div className="px-2 py-0.5 bg-emerald-600 text-white text-xs rounded font-semibold whitespace-nowrap">
            Target: {skill.required}%
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function
function getMatchScoreInfo(score: number) {
  if (score >= 85) {
    return {
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      label: 'Excellent Match',
    };
  }
  if (score >= 75) {
    return {
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      label: 'Great Match',
    };
  }
  if (score >= 65) {
    return {
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      label: 'Good Match',
    };
  }
  return {
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    label: 'Fair Match',
  };
}