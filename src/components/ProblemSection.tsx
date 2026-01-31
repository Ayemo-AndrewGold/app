import React from 'react'
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const ProblemSection = () => {

  const problemStats = [
  {
    stat: '33%',
    label: 'of Nigerian graduates are unemployed',
    source: 'NBS Labour Force Survey',
  },
  {
    stat: '60%',
    label: 'pick careers without proper counseling',
    source: 'World Bank Education Report',
  },
  {
    stat: '1:3000',
    label: 'counselor to student ratio in Nigeria',
    source: 'UNESCO Standards',
  },
];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            The Career Crisis in Nigeria
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Nigerian students face unprecedented challenges in choosing the right career path
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problemStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50" />
              
              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold text-red-600 mb-3">
                  {stat.stat}
                </div>
                <div className="text-lg font-semibold text-neutral-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-neutral-600">
                  Source: {stat.source}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center"
        >
          <Zap className="w-12 h-12 mx-auto mb-4" />
          <p className="text-2xl font-semibold">
            PathFinder AI is here to change this reality
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemSection