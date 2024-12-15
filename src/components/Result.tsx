'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, ThumbsUp, Target, BookOpen, BarChart2, RefreshCcw } from 'lucide-react'
import { Button } from "./Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import confetti from 'canvas-confetti'
import {useStore} from '../store/store'
import { Link } from 'react-router-dom'



export default function QuizResultPage() {

  const result = useStore((state) => state.result);
  const score = result.total_correct_answers;
  const totalQuestions = result.total_questions;
  const quizTitle = result.title;
  
  const [progress, setProgress] = useState(0)
  const percentage = Math.round((score / totalQuestions) * 100)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 500)
    return () => clearTimeout(timer)
  }, [percentage])

  useEffect(() => {
    if (percentage >= 90) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [percentage])

  const getMessage = () => {
    if (percentage >= 90) return { text: "Excellent!", icon: Trophy, color: "#FFC107" }
    if (percentage >= 70) return { text: "Good Job!", icon: ThumbsUp, color: "#4CAF50" }
    if (percentage >= 50) return { text: "Nice Effort!", icon: Target, color: "#2196F3" }
    return { text: "Keep Practicing!", icon: BookOpen, color: "#3F51B5" }
  }

  const message = getMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="w-full bg-white shadow-xl border-indigo-200 border-2">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {quizTitle}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">Your Quiz Results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-48 h-48 mx-auto"
              >
                <CircularProgressbar
                  value={progress}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: 'round',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(62, 152, 199, ${progress / 100})`,
                    textColor: '#3e98c7',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                  })}
                />
              </motion.div>
            </div>
            <div className="text-center space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center text-2xl font-bold"
                style={{ color: message.color }}
              >
                <message.icon className="mr-2 h-6 w-6" />
                {message.text}
              </motion.div>
              <p className="text-gray-600">
                You scored {score} out of {totalQuestions} questions correctly.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <h3 className="text-lg font-semibold mb-2 text-indigo-700">Performance Breakdown</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Correct Answers</span>
                  <span className="font-bold text-green-600">{score}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Incorrect Answers</span>
                  <span className="font-bold text-red-600">{totalQuestions - score}</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Link to = "/welcome">
            <Button variant="outline" className="bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50">
              <BarChart2 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            </Link>
            
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}