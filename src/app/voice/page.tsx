'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic,
  MicOff,
  Pause,
  Play,
  Trash2,
  Send,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Volume2,
  FileAudio,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function VoiceReflection() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [showDemoNote, setShowDemoNote] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to use voice reflection.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setTranscript('');
    setAiResponse('');
    setRecordingTime(0);
  };

  const processVoice = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);

    // Simulate voice-to-text processing (in production, use Whisper API or browser SpeechRecognition)
    setTimeout(() => {
      // Mock transcription
      const mockTranscript = "I've been making good progress on React, but I'm finding TypeScript challenging. I'm not sure if I should slow down or push through. I completed the Todo app but it took longer than expected.";
      setTranscript(mockTranscript);

      // Simulate AI analysis
      setTimeout(() => {
        const mockAiResponse = `Great reflection, Chioma! Here's what I'm picking up:

**What's Going Well:**
- ✅ You completed the Todo app - that's a solid milestone!
- ✅ You're being honest about challenges (TypeScript)
- ✅ You're reflecting on your pace

**AI Recommendation:**
Don't rush TypeScript. It's normal for it to feel challenging at first. Here's my suggestion:

1. **Slow down on TypeScript basics** - Spend 2-3 more days on fundamentals
2. **Keep building** - Practice makes perfect
3. **Updated your roadmap** - Extended TypeScript learning by 1 week

**Encouragement:**
The fact that you completed the Todo app (even if slower) shows you CAN do this. TypeScript will click soon. Trust the process! 🚀

**Next Steps:**
- Focus on TypeScript types and interfaces this week
- Build one small TypeScript project
- Don't move to hooks until you feel 70% confident

You're doing great! Keep going! 💪`;

        setAiResponse(mockAiResponse);
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            <Mic className="w-4 h-4" />
            Voice Reflection (Beta)
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Weekly Voice Reflection
          </h1>
          <p className="text-lg text-neutral-600">
            Share your progress and challenges - your AI coach is listening
          </p>
        </motion.div>

        {/* Demo Note */}
        {showDemoNote && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2">
                  🎤 Demo Note: How Voice Reflection Works
                </h3>
                <p className="text-sm text-blue-800 mb-3 leading-relaxed">
                  <strong>For MVP Demo:</strong> Voice is recorded and converted to text using browser speech-to-text. 
                  The AI then analyzes the text to detect emotional tone, extract keywords (interests, challenges), 
                  and provide personalized guidance.
                </p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>Production:</strong> Will integrate with Whisper API for accurate transcription and real-time 
                  voice conversation capabilities.
                </p>
                <button
                  onClick={() => setShowDemoNote(false)}
                  className="mt-3 text-sm text-blue-600 font-semibold hover:text-blue-700"
                >
                  Got it, hide this
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Recording Area */}
        <div className="bg-white rounded-2xl border-2 border-neutral-200 p-8 mb-8">
          {/* Recording Interface */}
          {!audioBlob && (
            <div className="text-center">
              {/* Recording Visualizer */}
              <motion.div
                className="relative w-48 h-48 mx-auto mb-8"
              >
                {/* Outer rings */}
                {isRecording && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-red-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="absolute inset-0 bg-red-400 rounded-full"
                    />
                  </>
                )}

                {/* Center button */}
                <motion.button
                  onClick={isRecording ? stopRecording : startRecording}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording
                      ? 'bg-red-500 shadow-2xl shadow-red-500/50'
                      : 'bg-gradient-to-br from-purple-500 to-purple-700 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-16 h-16 text-white" />
                  ) : (
                    <Mic className="w-16 h-16 text-white" />
                  )}
                </motion.button>
              </motion.div>

              {/* Status */}
              <div className="mb-6">
                {isRecording ? (
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-lg font-semibold text-red-600">
                        {isPaused ? 'Paused' : 'Recording...'}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-4">
                      {formatTime(recordingTime)}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={pauseRecording}
                        className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-300 transition-colors flex items-center gap-2"
                      >
                        {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                        {isPaused ? 'Resume' : 'Pause'}
                      </button>
                      <button
                        onClick={stopRecording}
                        className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <MicOff className="w-5 h-5" />
                        Stop
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-neutral-600 mb-4">
                      Click the microphone to start recording your reflection
                    </p>
                    <p className="text-sm text-neutral-500">
                      💡 Tip: Share what you learned, what challenged you, and how you're feeling
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recorded Audio Preview */}
          {audioBlob && !transcript && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileAudio className="w-12 h-12 text-purple-600" />
              </div>
              
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Recording Complete!
              </h3>
              <p className="text-neutral-600 mb-6">
                Duration: {formatTime(recordingTime)}
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={deleteRecording}
                  className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-300 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
                <button
                  onClick={processVoice}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:bg-purple-400"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Reflection
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Transcript & AI Response */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Transcript */}
              <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Volume2 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-blue-900">
                    Your Reflection (Transcribed)
                  </h3>
                </div>
                <p className="text-blue-800 leading-relaxed italic">
                  "{transcript}"
                </p>
              </div>

              {/* AI Response */}
              {isProcessing ? (
                <div className="bg-purple-50 rounded-2xl border-2 border-purple-200 p-8 text-center">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-purple-700 font-semibold">
                    AI is analyzing your reflection...
                  </p>
                  <p className="text-sm text-purple-600 mt-2">
                    Detecting emotional tone, extracting insights, and preparing guidance
                  </p>
                </div>
              ) : aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-300 p-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-purple-900">
                      AI Coach Response
                    </h3>
                  </div>
                  <div className="prose prose-purple max-w-none">
                    {aiResponse.split('\n').map((line, i) => (
                      <p key={i} className="text-purple-900 mb-2 whitespace-pre-wrap">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-purple-200">
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-semibold">Your roadmap has been updated based on this reflection</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              {aiResponse && (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={deleteRecording}
                    className="px-6 py-3 bg-white border-2 border-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-colors"
                  >
                    Record Another
                  </button>
                  <button 
                    onClick={() => window.location.href = '/dashboard'}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    View Updated Dashboard
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-neutral-50 rounded-xl p-6 border border-neutral-200"
        >
          <h3 className="font-bold text-neutral-900 mb-4">
            🧠 How Voice Reflection Helps Your Journey
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-neutral-900 mb-1">1. Emotional Awareness</div>
              <p className="text-neutral-600">AI detects frustration, confidence, or confusion to adjust support</p>
            </div>
            <div>
              <div className="font-semibold text-neutral-900 mb-1">2. Progress Tracking</div>
              <p className="text-neutral-600">Updates your skills and roadmap based on what you share</p>
            </div>
            <div>
              <div className="font-semibold text-neutral-900 mb-1">3. Personalized Guidance</div>
              <p className="text-neutral-600">Provides encouragement and adjusts learning pace as needed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
