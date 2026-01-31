import React from 'react'
import { Target } from 'lucide-react'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                PathFinder AI
              </span>
            </div>
            <p className="text-neutral-400 mb-4 max-w-md">
              AI-powered career guidance helping Nigerian students discover their perfect career path.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="hover:text-emerald-400 transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center">
          <p className="text-sm text-neutral-400">
            © 2026 PathFinder AI. All rights reserved. Built with ❤️ for Nigerian students.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer