'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Sparkles,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! 👋 I'm your PathFinder AI assistant. I can help you understand how our career guidance works, answer questions about your future, or guide you through getting started. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action buttons
  const quickActions = [
    "How does PathFinder AI work?",
    "What careers can I explore?",
    "Is it really free?",
    "How accurate are the recommendations?",
  ];

  const handleQuickAction = (question: string) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-emerald-500/50 transition-shadow"
          >
            <MessageCircle className="w-7 h-7" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    PathFinder AI
                    <Sparkles className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-emerald-100">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="p-4 bg-white border-t border-neutral-200">
                <p className="text-xs text-neutral-600 mb-2">Quick questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs p-2 bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-left transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-neutral-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-neutral-100 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 disabled:cursor-not-allowed rounded-xl flex items-center justify-center text-white transition-colors"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Chat Message Component
function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-emerald-600" />
        </div>
      )}
      
      <div
        className={`max-w-[75%] rounded-2xl p-4 ${
          isUser
            ? 'bg-emerald-600 text-white rounded-tr-none'
            : 'bg-white shadow-sm rounded-tl-none'
        }`}
      >
        <p className={`text-sm leading-relaxed ${isUser ? 'text-white' : 'text-neutral-800'}`}>
          {message.content}
        </p>
        <p className={`text-xs mt-2 ${isUser ? 'text-emerald-100' : 'text-neutral-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-neutral-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-neutral-600" />
        </div>
      )}
    </motion.div>
  );
}

// Simple AI response generator (replace with actual AI API)
function generateAIResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  // Pattern matching for common questions
  if (input.includes('how') && input.includes('work')) {
    return "PathFinder AI works in 4 simple steps:\n\n1. 📝 You complete a quick questionnaire about your interests, skills, and goals\n2. 🤖 Our AI analyzes your responses against thousands of career paths\n3. 🎯 You receive personalized career recommendations with match scores\n4. 📚 Get customized learning roadmaps and job opportunities\n\nWant to get started? Click 'Get Started' on our homepage!";
  }

  if (input.includes('career') || input.includes('explore')) {
    return "We cover over 500+ career paths across various industries including:\n\n• Technology (Software Dev, Data Science, UI/UX)\n• Healthcare (Medicine, Nursing, Health Tech)\n• Business (Marketing, Finance, Entrepreneurship)\n• Creative (Design, Content, Media)\n• And many more!\n\nEach career comes with detailed info on skills needed, salary ranges, and growth opportunities specific to Nigeria.";
  }

  if (input.includes('free') || input.includes('cost') || input.includes('price')) {
    return "Yes! PathFinder AI is 100% FREE! 🎉\n\nNo hidden costs, no credit card required, no catch. We're on a mission to help Nigerian students find their perfect career path, and we believe career guidance should be accessible to everyone.\n\nYou get:\n✅ Unlimited AI career recommendations\n✅ Personalized learning roadmaps\n✅ Job matching\n✅ Skill gap analysis\n\nAll completely free!";
  }

  if (input.includes('accurate') || input.includes('recommendation')) {
    return "Our AI has a 94% satisfaction rate! 🎯\n\nWe use advanced algorithms trained on:\n• Real career success data from Nigerian professionals\n• Industry demand and job market trends\n• Skills requirements from top companies\n• Learning pathways that actually work\n\nOur recommendations consider your unique profile - interests, strengths, goals - not just your current course of study. Thousands of students have found their path with us!";
  }

  if (input.includes('start') || input.includes('begin')) {
    return "Getting started is super easy!\n\n1. Click the 'Get Started' button on our homepage\n2. Complete the 5-minute questionnaire (4 simple steps)\n3. Our AI analyzes your profile\n4. Receive your personalized career recommendations!\n\nThe whole process takes less than 10 minutes, and you'll get instant results. Ready to discover your perfect career path?";
  }

  if (input.includes('time') || input.includes('long')) {
    return "The questionnaire takes about 5-7 minutes to complete, and you'll get your AI-powered career recommendations instantly!\n\nHere's the breakdown:\n📝 Questionnaire: 5-7 minutes\n🤖 AI Analysis: 30-60 seconds\n📊 Results: Immediate\n\nYou can save your progress and come back later if needed!";
  }

  // Default response
  return "That's a great question! I'm here to help you understand how PathFinder AI can guide your career journey.\n\nYou can ask me about:\n• How our AI recommendations work\n• What careers you can explore\n• Our pricing (spoiler: it's free!)\n• How to get started\n• Anything else about finding your perfect career path!\n\nWhat would you like to know?";
}