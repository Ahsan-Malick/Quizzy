'use client'

import { motion } from 'framer-motion'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { CheckCircle, XCircle, RotateCcw, Share2 } from 'lucide-react'
import { Button } from "./Button"

// Mock quiz result data
const quizResult = {
  score: 7,
  totalQuestions: 10,
  correctAnswers: 7,
  percentage: 70,
}

const QuizResultPage: React.FC=()=>{
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div 
        className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-200 to-yellow-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Quiz Results</h1>
          
          <div className="flex justify-center mb-8">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar
                value={quizResult.percentage}
                text={`${quizResult.percentage}%`}
                styles={buildStyles({
                  textColor: '#6366F1',
                  pathColor: '#6366F1',
                  trailColor: '#E0E7FF',
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.div 
              className="bg-indigo-100 p-4 rounded-lg text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-2xl font-bold text-indigo-600">{quizResult.score}</p>
              <p className="text-sm text-indigo-800">Your Score</p>
            </motion.div>
            <motion.div 
              className="bg-purple-100 p-4 rounded-lg text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-2xl font-bold text-purple-600">{quizResult.totalQuestions}</p>
              <p className="text-sm text-purple-800">Total Questions</p>
            </motion.div>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <span className="text-gray-700">Correct Answers: {quizResult.correctAnswers}</span>
            </div>
            <div className="flex items-center">
              <XCircle className="text-red-500 mr-2" />
              <span className="text-gray-700">Incorrect Answers: {quizResult.totalQuestions - quizResult.correctAnswers}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
            </Button>
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" /> Share Results
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default QuizResultPage