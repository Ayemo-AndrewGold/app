'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  User,
  Heart,
  Target,
  Zap,
  Sparkles
} from 'lucide-react';

// Step data configuration
const STEPS = [
  {
    id: 1,
    title: 'Tell Us About You',
    subtitle: 'Basic information to get started',
    icon: User,
    color: 'emerald',
  },
  {
    id: 2,
    title: 'Your Interests',
    subtitle: 'What excites and motivates you?',
    icon: Heart,
    color: 'orange',
  },
  {
    id: 3,
    title: 'Your Goals',
    subtitle: 'Where do you see yourself?',
    icon: Target,
    color: 'blue',
  },
  {
    id: 4,
    title: 'Your Skills',
    subtitle: 'Rate your current abilities',
    icon: Zap,
    color: 'purple',
  },
];

export default function OnboardingQuestionnaire() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    institution: '',
    courseOfStudy: '',
    currentLevel: '',
    age: '',
    
    // Step 2: Interests
    interests: [] as string[],
    strengths: '',
    weaknesses: '',
    
    // Step 3: Goals
    careerGoals: '',
    workStyle: '',
    industryPreferences: [] as string[],
    
    // Step 4: Skills
    technicalSkills: {} as Record<string, number>,
    softSkills: {} as Record<string, number>,
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

//   const handleSubmit = async () => {

//   try {
//     // Send to your backend
//     const response = await fetch('/api/onboarding', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();
    
//     // Navigate to loading
//     router.push('/loading');
//   } catch (error) {
//     console.error('Error:', error);
//     // For now, still navigate (fallback)
//     router.push('/loading');
//   }
// };
  
const handleSubmit = () => {
    // For demo: Save to localStorage
    localStorage.setItem('pathfinderOnboardingData', JSON.stringify(formData));
    
    // Navigate to loading screen
    router.push('/loading');
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Let's Find Your Path
          </h1>
          <p className="text-lg text-neutral-600">
            Answer a few questions so our AI can personalize your career journey
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-emerald-500 to-emerald-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-12">
          {STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isCompleted 
                        ? '#10b981' 
                        : isCurrent 
                        ? '#10b981' 
                        : '#e5e7eb',
                    }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                      isCompleted || isCurrent ? 'shadow-lg' : ''
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <StepIcon className={`w-6 h-6 ${
                        isCurrent ? 'text-white' : 'text-neutral-400'
                      }`} />
                    )}
                  </motion.div>
                  <span className={`text-xs text-center hidden sm:block ${
                    isCompleted || isCurrent ? 'text-neutral-900 font-medium' : 'text-neutral-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-neutral-200'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-neutral-600">
              {STEPS[currentStep - 1].subtitle}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1 formData={formData} updateField={updateField} />
            )}
            {currentStep === 2 && (
              <Step2 formData={formData} updateField={updateField} />
            )}
            {currentStep === 3 && (
              <Step3 formData={formData} updateField={updateField} />
            )}
            {currentStep === 4 && (
              <Step4 formData={formData} updateField={updateField} />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 1
                ? 'text-neutral-400 cursor-not-allowed'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all shadow-lg shadow-emerald-500/30"
          >
            {currentStep === STEPS.length ? (
              <>
                <Sparkles className="w-5 h-5" />
                Get My Results
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== STEP 1: Basic Information ====================
function Step1({ formData, updateField }: StepProps) {
  const nigerianUniversities = [
    'University of Lagos (UNILAG)',
    'Obafemi Awolowo University (OAU)',
    'University of Ibadan (UI)',
    'Ahmadu Bello University (ABU)',
    'University of Nigeria, Nsukka (UNN)',
    'Lagos State University (LASU)',
    'Covenant University',
    'Other',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Institution <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.institution}
          onChange={(e) => updateField('institution', e.target.value)}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Select your institution</option>
          {nigerianUniversities.map((uni) => (
            <option key={uni} value={uni}>{uni}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Course of Study <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.courseOfStudy}
          onChange={(e) => updateField('courseOfStudy', e.target.value)}
          placeholder="e.g., Computer Science, Medicine, Law"
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Current Level <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.currentLevel}
            onChange={(e) => updateField('currentLevel', e.target.value)}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
            required
          >
            <option value="">Select level</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
            <option value="500">500 Level</option>
            <option value="graduate">Fresh Graduate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateField('age', e.target.value)}
            placeholder="e.g., 21"
            min="16"
            max="50"
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}

// ==================== STEP 2: Interests ====================
function Step2({ formData, updateField }: StepProps) {
  const interestOptions = [
    'Technology & Innovation',
    'Business & Entrepreneurship',
    'Healthcare & Medicine',
    'Education & Teaching',
    'Arts & Creative Design',
    'Engineering & Construction',
    'Finance & Banking',
    'Marketing & Sales',
    'Law & Legal Services',
    'Science & Research',
    'Media & Communications',
    'Social Impact & NGO',
  ];

  const toggleInterest = (interest: string) => {
    const current = formData.interests || [];
    if (current.includes(interest)) {
      updateField('interests', current.filter((i: string) => i !== interest));
    } else {
      updateField('interests', [...current, interest]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          What are your interests? <span className="text-neutral-500">(Select 2-4)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {interestOptions.map((interest) => {
            const isSelected = formData.interests?.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-neutral-200 hover:border-emerald-300 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-300'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-emerald-900' : 'text-neutral-700'
                  }`}>
                    {interest}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          What are your top strengths?
        </label>
        <textarea
          value={formData.strengths}
          onChange={(e) => updateField('strengths', e.target.value)}
          placeholder="e.g., Problem-solving, Communication, Leadership, Creativity..."
          rows={3}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none transition-colors"
        />
        <p className="text-xs text-neutral-500 mt-1">Separate with commas</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Areas you'd like to improve
        </label>
        <textarea
          value={formData.weaknesses}
          onChange={(e) => updateField('weaknesses', e.target.value)}
          placeholder="e.g., Public speaking, Time management, Technical writing..."
          rows={3}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none transition-colors"
        />
      </div>
    </motion.div>
  );
}

// ==================== STEP 3: Goals ====================
function Step3({ formData, updateField }: StepProps) {
  const workStyles = [
    { value: 'remote', label: 'Remote', icon: '🏠', description: 'Work from anywhere' },
    { value: 'hybrid', label: 'Hybrid', icon: '🔄', description: 'Office & remote mix' },
    { value: 'office', label: 'Office', icon: '🏢', description: 'Traditional office' },
    { value: 'flexible', label: 'Flexible', icon: '✨', description: 'Varies by project' },
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Telecommunications',
    'Oil & Gas',
    'Agriculture',
  ];

  const toggleIndustry = (industry: string) => {
    const current = formData.industryPreferences || [];
    if (current.includes(industry)) {
      updateField('industryPreferences', current.filter((i: string) => i !== industry));
    } else {
      updateField('industryPreferences', [...current, industry]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          What are your career goals? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.careerGoals}
          onChange={(e) => updateField('careerGoals', e.target.value)}
          placeholder="Describe your career aspirations, what you want to achieve in the next 5 years..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Preferred work style
        </label>
        <div className="grid grid-cols-2 gap-3">
          {workStyles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => updateField('workStyle', style.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                formData.workStyle === style.value
                  ? 'border-emerald-500 bg-emerald-50 shadow-md'
                  : 'border-neutral-200 hover:border-emerald-300 hover:bg-neutral-50'
              }`}
            >
              <div className="text-2xl mb-2">{style.icon}</div>
              <div className="font-semibold text-neutral-900">{style.label}</div>
              <div className="text-sm text-neutral-600 mt-1">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Preferred industries <span className="text-neutral-500">(Select 1-3)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {industries.map((industry) => {
            const isSelected = formData.industryPreferences?.includes(industry);
            return (
              <button
                key={industry}
                type="button"
                onClick={() => toggleIndustry(industry)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-neutral-200 hover:border-emerald-300 hover:bg-neutral-50'
                }`}
              >
                {industry}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ==================== STEP 4: Skills ====================
function Step4({ formData, updateField }: StepProps) {
  const technicalSkills = [
    'Programming/Coding',
    'Data Analysis',
    'Design (UI/UX)',
    'Digital Marketing',
    'Project Management',
  ];

  const softSkills = [
    'Communication',
    'Leadership',
    'Problem Solving',
    'Teamwork',
    'Time Management',
  ];

  const updateSkill = (type: 'technicalSkills' | 'softSkills', skill: string, level: number) => {
    const current = formData[type] || {};
    updateField(type, { ...current, [skill]: level });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Technical Skills
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          Rate your proficiency (1 = Beginner, 5 = Expert)
        </p>
        <div className="space-y-4">
          {technicalSkills.map((skill) => (
            <SkillRating
              key={skill}
              skill={skill}
              value={formData.technicalSkills?.[skill] || 0}
              onChange={(level) => updateSkill('technicalSkills', skill, level)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Soft Skills
        </h3>
        <div className="space-y-4">
          {softSkills.map((skill) => (
            <SkillRating
              key={skill}
              skill={skill}
              value={formData.softSkills?.[skill] || 0}
              onChange={(level) => updateSkill('softSkills', skill, level)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Skill Rating Component
function SkillRating({ skill, value, onChange }: {
  skill: string;
  value: number;
  onChange: (level: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-700">{skill}</span>
        <span className="text-xs text-neutral-500">
          {value === 0 ? 'Not rated' : `Level ${value}`}
        </span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`flex-1 h-10 rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
              level <= value
                ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                : 'border-neutral-200 hover:border-emerald-300 text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

interface StepProps {
  formData: any;
  updateField: (field: string, value: any) => void;
}