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
  Loader2,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! 👋 I'm your PathFinder AI assistant. You can type or use the microphone to speak with me! I can help you understand how our career guidance works. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          if (event.error !== 'no-speech') {
            console.error('Speech recognition error:', event.error);
          }
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && typeof recognitionRef.current.start === 'function') {
      setInputValue('');
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSend = async (isVoiceMessage: boolean = false) => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      isVoice: isVoiceMessage,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Auto-speak response if user used voice
      if (isVoiceMessage) {
        speakResponse(aiResponse);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(false);
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
                  <p className="text-xs text-emerald-100">Type or speak 🎤</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  stopSpeaking();
                  stopListening();
                }}
                className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Voice Listening Indicator */}
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-b border-red-200 p-3 flex items-center justify-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-red-500 rounded-full"
                />
                <span className="text-sm text-red-700 font-medium">Listening... Speak now!</span>
              </motion.div>
            )}

            {/* Speaking Indicator */}
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border-b border-blue-200 p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700 font-medium">AI is speaking...</span>
                </div>
                <button
                  onClick={stopSpeaking}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Stop
                </button>
              </motion.div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message}
                  onSpeak={() => speakResponse(message.content)}
                  isSpeaking={isSpeaking}
                />
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
                  placeholder={isListening ? "Listening..." : "Type or click mic to speak..."}
                  className="flex-1 px-4 py-3 bg-neutral-100 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-colors"
                  disabled={isListening}
                />
                
                {/* Voice Button */}
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isTyping}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-700'
                  } disabled:bg-neutral-300 disabled:cursor-not-allowed text-white`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>

                {/* Send Button */}
                <button
                  onClick={() => handleSend(isListening)}
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
              
              {/* Voice Hint */}
              <p className="text-xs text-center text-neutral-500 mt-2">
                💡 Click <Mic className="w-3 h-3 inline" /> to use your voice
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Chat Message Component with Voice Playback
function ChatMessage({ message, onSpeak, isSpeaking }: { 
  message: Message;
  onSpeak: () => void;
  isSpeaking: boolean;
}) {
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
      
      <div className="flex flex-col gap-2 max-w-[75%]">
        <div
          className={`rounded-2xl p-4 ${
            isUser
              ? 'bg-emerald-600 text-white rounded-tr-none'
              : 'bg-white shadow-sm rounded-tl-none'
          }`}
        >
          {/* Voice indicator for user messages */}
          {isUser && message.isVoice && (
            <div className="flex items-center gap-1 mb-2 text-emerald-100">
              <Mic className="w-3 h-3" />
              <span className="text-xs">Voice message</span>
            </div>
          )}
          
          <p className={`text-sm leading-relaxed whitespace-pre-line ${isUser ? 'text-white' : 'text-neutral-800'}`}>
            {message.content}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <p className={`text-xs ${isUser ? 'text-emerald-100' : 'text-neutral-400'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            
            {/* Speak button for AI messages */}
            {!isUser && (
              <button
                onClick={onSpeak}
                className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                <Volume2 className="w-3 h-3" />
                Listen
              </button>
            )}
          </div>
        </div>
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
    return "PathFinder AI works in 4 simple steps:\n\n1. You complete a quick questionnaire about your interests, skills, and goals\n2. Our AI analyzes your responses against thousands of career paths\n3. You receive personalized career recommendations with match scores\n4. Get customized learning roadmaps and job opportunities\n\nWant to get started? Click 'Get Started' on our homepage!";
  }

  if (input.includes('career') || input.includes('explore')) {
    return "We cover over 500+ career paths across various industries including:\n\n• Technology (Software Dev, Data Science, UI/UX)\n• Healthcare (Medicine, Nursing, Health Tech)\n• Business (Marketing, Finance, Entrepreneurship)\n• Creative (Design, Content, Media)\n• And many more!\n\nEach career comes with detailed info on skills needed, salary ranges, and growth opportunities specific to Nigeria.";
  }

  if (input.includes('free') || input.includes('cost') || input.includes('price')) {
    return "Yes! PathFinder AI is 100% FREE!\n\nNo hidden costs, no credit card required, no catch. We're on a mission to help Nigerian students find their perfect career path, and we believe career guidance should be accessible to everyone.\n\nYou get:\n✅ Unlimited AI career recommendations\n✅ Personalized learning roadmaps\n✅ Job matching\n✅ Skill gap analysis\n\nAll completely free!";
  }

  if (input.includes('accurate') || input.includes('recommendation')) {
    return "Our AI has a 94% satisfaction rate!\n\nWe use advanced algorithms trained on:\n• Real career success data from Nigerian professionals\n• Industry demand and job market trends\n• Skills requirements from top companies\n• Learning pathways that actually work\n\nOur recommendations consider your unique profile - interests, strengths, goals - not just your current course of study. Thousands of students have found their path with us!";
  }

  if (input.includes('start') || input.includes('begin')) {
    return "Getting started is super easy!\n\n1. Click the 'Get Started' button on our homepage\n2. Complete the 5-minute questionnaire (4 simple steps)\n3. Our AI analyzes your profile\n4. Receive your personalized career recommendations!\n\nThe whole process takes less than 10 minutes, and you'll get instant results. Ready to discover your perfect career path?";
  }

  if (input.includes('time') || input.includes('long')) {
    return "The questionnaire takes about 5-7 minutes to complete, and you'll get your AI-powered career recommendations instantly!\n\nHere's the breakdown:\n📝 Questionnaire: 5-7 minutes\n🤖 AI Analysis: 30-60 seconds\n📊 Results: Immediate\n\nYou can save your progress and come back later if needed!";
  }

  if (input.includes('voice') || input.includes('speak')) {
    return "Yes! You can use your voice to chat with me! Just click the microphone button and speak your question. I can also read my responses out loud to you.\n\nThis makes it easier for everyone to get help, especially if you prefer speaking over typing!";
  }

  // Default response
  return "That's a great question! I'm here to help you understand how PathFinder AI can guide your career journey.\n\nYou can ask me about:\n• How our AI recommendations work\n• What careers you can explore\n• Our pricing (spoiler: it's free!)\n• How to get started\n• Anything else about finding your perfect career path!\n\nWhat would you like to know?";
}