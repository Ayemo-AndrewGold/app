'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  Briefcase,
  BookOpen,
  Target,
  Award,
  ExternalLink,
  ChevronRight,
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
  Brain
} from 'lucide-react';

// Mock data - replace with actual API data
const CAREER_RECOMMENDATIONS = [
  {
    id: '1',
    title: 'Full-Stack Developer',
    category: 'Technology',
    matchScore: 92,
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
    requiredSkills: [
      { name: 'React/Next.js', current: 40, required: 85, category: 'technical' },
      { name: 'Node.js/Express', current: 30, required: 80, category: 'technical' },
      { name: 'Database Design', current: 35, required: 75, category: 'technical' },
      { name: 'Problem Solving', current: 70, required: 85, category: 'soft' },
    ],
    roadmap: {
      duration: '6-9 months',
      phases: [
        {
          title: 'Foundation',
          duration: '2 months',
          skills: ['HTML/CSS', 'JavaScript Basics', 'Git & GitHub'],
        },
        {
          title: 'Frontend Development',
          duration: '2 months',
          skills: ['React.js', 'TypeScript', 'Tailwind CSS'],
        },
        {
          title: 'Backend Development',
          duration: '2 months',
          skills: ['Node.js', 'Express', 'MongoDB/PostgreSQL'],
        },
        {
          title: 'Full-Stack Projects',
          duration: '2-3 months',
          skills: ['Build 3-5 projects', 'Deploy to cloud', 'Portfolio'],
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
    requiredSkills: [
      { name: 'Figma/Design Tools', current: 50, required: 90, category: 'technical' },
      { name: 'User Research', current: 30, required: 75, category: 'technical' },
      { name: 'Prototyping', current: 40, required: 80, category: 'technical' },
      { name: 'Communication', current: 65, required: 85, category: 'soft' },
    ],
    roadmap: {
      duration: '4-6 months',
      phases: [
        {
          title: 'Design Fundamentals',
          duration: '1 month',
          skills: ['Design Principles', 'Color Theory', 'Typography'],
        },
        {
          title: 'UI Design',
          duration: '1.5 months',
          skills: ['Figma Mastery', 'Component Design', 'Design Systems'],
        },
        {
          title: 'UX Research',
          duration: '1.5 months',
          skills: ['User Research', 'Wireframing', 'Prototyping'],
        },
        {
          title: 'Portfolio Projects',
          duration: '1-2 months',
          skills: ['3-5 case studies', 'Portfolio website'],
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
    requiredSkills: [
      { name: 'Python/Excel', current: 45, required: 80, category: 'technical' },
      { name: 'SQL', current: 35, required: 85, category: 'technical' },
      { name: 'Data Visualization', current: 30, required: 75, category: 'technical' },
      { name: 'Critical Thinking', current: 75, required: 85, category: 'soft' },
    ],
    roadmap: {
      duration: '5-7 months',
      phases: [
        {
          title: 'Excel & Statistics',
          duration: '1.5 months',
          skills: ['Advanced Excel', 'Statistics Basics', 'Data Cleaning'],
        },
        {
          title: 'SQL & Databases',
          duration: '1.5 months',
          skills: ['SQL Queries', 'Database Design', 'Data Extraction'],
        },
        {
          title: 'Python for Data',
          duration: '2 months',
          skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
        },
        {
          title: 'Real Projects',
          duration: '1-2 months',
          skills: ['Business analytics', 'Dashboard creation', 'Portfolio'],
        },
      ],
    },
    topCompanies: ['Access Bank', 'GTBank', 'MTN Nigeria', 'Dangote Group'],
    jobOpportunities: 156,
  },
];

export default function ResultsPage() {
  const [selectedCareer, setSelectedCareer] = useState(CAREER_RECOMMENDATIONS[0]);

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
              Analysis Complete!
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Perfect Career Matches 🎯
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl">
              Based on your profile, our AI has identified {CAREER_RECOMMENDATIONS.length} career paths 
              that align perfectly with your interests, skills, and goals.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Target, label: 'Career Matches', value: CAREER_RECOMMENDATIONS.length },
                { icon: TrendingUp, label: 'Avg Match Score', value: '87%' },
                { icon: Briefcase, label: 'Job Opportunities', value: '586+' },
                { icon: Clock, label: 'Avg Time to Ready', value: '6 months' },
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
                Download Report
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
          <DetailedCareerView career={selectedCareer} />
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
            job opportunities, and expert guidance.
          </p>
          <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2">
            Start Learning
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// Career Card Component
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

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-xs text-neutral-600">Salary Range</div>
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
                  <div className="text-xs text-neutral-600">Opportunities</div>
                  <div className="font-semibold text-neutral-900">
                    {career.jobOpportunities}+ jobs
                  </div>
                </div>
              </div>
            </div>

            {/* Why This Matches */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-emerald-600" />
                Why this matches you:
              </h4>
              <ul className="space-y-1">
                {career.reasoning.slice(0, 3).map((reason: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Companies */}
            <div>
              <h4 className="text-xs text-neutral-600 mb-2">Top Companies Hiring:</h4>
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
              <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-sm flex items-center justify-center gap-2">
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Detailed Career View
function DetailedCareerView({ career }: any) {
  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-500 p-8">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-emerald-600" />
        Detailed Roadmap: {career.title}
      </h2>

      {/* Learning Roadmap */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Your Learning Path ({career.roadmap.duration})
        </h3>
        
        <div className="space-y-4">
          {career.roadmap.phases.map((phase: any, index: number) => (
            <div key={index} className="flex gap-4">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                  {index + 1}
                </div>
                {index < career.roadmap.phases.length - 1 && (
                  <div className="w-0.5 h-full bg-emerald-200 my-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-neutral-900">{phase.title}</h4>
                  <span className="text-sm text-neutral-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {phase.duration}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Gap */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-600" />
          Skills to Develop
        </h3>
        
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

// Skill Gap Bar
function SkillGapBar({ skill }: any) {
  const gap = skill.required - skill.current;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-700">{skill.name}</span>
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
          className="absolute h-full border-r-4 border-emerald-600"
          style={{ left: `${skill.required}%` }}
        />
        
        <div
          className="absolute -top-6 transform -translate-x-1/2"
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