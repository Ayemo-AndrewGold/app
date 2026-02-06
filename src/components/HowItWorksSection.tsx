import React from 'react'
import { motion } from 'framer-motion';
import {Users, Brain, Target, BookOpen} from 'lucide-react'

const HowItWorksSection = () => {
    
  function StepCard({ step, index }: any) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
    >
      <div className={isEven ? 'lg:text-right' : 'lg:col-start-2'}>
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {index + 1}
          </div>
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
            Step {index + 1}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
          {step.title}
        </h3>
        <p className="text-lg text-neutral-600 leading-relaxed">
          {step.description}
        </p>
      </div>

      <div className={isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}>
        <div className="bg-gradient-to-br from-emerald-50 to-orange-50 rounded-2xl p-8 border-2 border-emerald-200">
          <step.icon className="w-16 h-16 text-emerald-600 mx-auto" />
        </div>
      </div>
    </motion.div>
  );
}

const steps = [
  {
    icon: Users,
    title: 'Tell Us About Yourself',
    description: 'Complete a simple questionnaire about your interests, strengths, goals, and current skills. Our AI needs to understand you first.',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our advanced AI processes your information, analyzing thousands of career paths to find the perfect matches for your unique profile.',
  },
  {
    icon: Target,
    title: 'Get Your Recommendations',
    description: 'The AI explains why a path fits with detailed roadmaps, skill requirements, and salary expectations. so students trust their decisions',
  },
  {
    icon: BookOpen,
    title: 'Start Learning & Growing',
    description: 'Follow your customized learning path, track your progress, and discover job opportunities as you develop new skills.',
  },
];
  
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            How PathFinder AI Works
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Get personalized career guidance in 4 simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200 hidden lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection