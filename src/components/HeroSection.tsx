import React from 'react'
import { ArrowRight, Briefcase, Brain, CheckCircle2, Globe, Play, Sparkles, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion';
import Link from 'next/link'

const HeroSection = () => {

  function StatCard({ icon: Icon, value, label, delay }: any) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="text-3xl font-bold text-neutral-900 mb-1">{value}</div>
        <div className="text-sm text-neutral-600">{label}</div>
      </motion.div>
    );
  }
return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-orange-50 -z-10" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm font-medium text-emerald-700 mb-6 shadow-sm">
                <Sparkles className="w-4 h-4" />
                AI-Powered Career Guidance
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-[1.1]">
                Find Your{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
                  Perfect Career
                </span>{' '}
                Path
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-neutral-600 mb-8 leading-relaxed">
                AI-powered career guidance helping Nigerian students discover their ideal path with personalized roadmaps and real job opportunities.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/onboarding">
                  <button className="group px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="group px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-900 rounded-xl font-semibold text-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Instant Results</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual/Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={Briefcase}
                value="500+"
                label="Career Paths"
                delay={0.3}
              />
              <StatCard
                icon={Users}
                value="+"
                label="Students Guided"
                delay={0.4}
              />
              <StatCard
                icon={TrendingUp}
                value="94%"
                label="Success Rate"
                delay={0.5}
              />
              <StatCard
                icon={Globe}
                value="24/7"
                label="AI Available"
                delay={0.6}
              />
            </div>

            {/* Floating Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-2xl rotate-12 hidden lg:block"
            >
              <div className="flex items-center justify-center h-full">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection