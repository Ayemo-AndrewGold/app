import React from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
 return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Career?
          </h2>
          <p className="text-xl md:text-2xl text-emerald-100 mb-10 leading-relaxed">
            Join thousands of Nigerian students who have discovered their career path with PathFinder AI
          </p>
          
          <Link href="/onboarding">
            <button className="px-10 py-5 bg-white text-emerald-600 rounded-xl font-bold text-xl hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200 shadow-2xl inline-flex items-center gap-3">
              Get Started for Free
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>

          <p className="mt-6 text-emerald-100">
            No credit card required • Instant results • 100% free
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection