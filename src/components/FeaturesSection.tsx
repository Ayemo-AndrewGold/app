import React from 'react'
import { Target, BookOpen, TrendingUp, Briefcase, Brain, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {

  

const features = [
  {
    icon: Target,
    title: 'AI Career Matching',
    description: 'Advanced AI analyzes your interests, strengths, and goals to recommend the perfect career paths tailored specifically for you.',
  },
  {
    icon: BookOpen,
    title: 'Personalized Roadmaps',
    description: 'Get step-by-step learning paths with courses, projects, and certifications customized to your chosen career.',
  },
  {
    icon: TrendingUp,
    title: 'Skill Gap Analysis',
    description: 'Visual insights showing where you are vs. where you need to be, with actionable improvement plans.',
  },
  {
    icon: Briefcase,
    title: 'Job Opportunities',
    description: 'Discover internships and entry-level positions that match your skills and career aspirations in Nigeria.',
  },
  {
    icon: Brain,
    title: 'Career Simulation',
    description: 'Experience a day in the life of your dream career with realistic simulations and salary projections.',
  },
  {
    icon: Award,
    title: 'Real-time Guidance',
    description: 'Continuous AI support and insights as you progress through your learning journey and career development.',
  },
]

function FeatureCard({ feature, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <feature.icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-neutral-600 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

 return (
    <section id="features" className="py-20 md:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Find careers based on your strengths, interests, and goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection