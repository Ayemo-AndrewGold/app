'use client';

import React from 'react'
import { Target, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion';
import Link from 'next/link'

const Navigation = () => {
return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              PathFinder AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-neutral-700 hover:text-emerald-600 transition-colors font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-neutral-700 hover:text-emerald-600 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="#about" className="text-neutral-700 hover:text-emerald-600 transition-colors font-medium">
              About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="hidden sm:block px-4 py-2 text-neutral-700 hover:text-emerald-600 font-medium transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/onboarding">
              <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navigation