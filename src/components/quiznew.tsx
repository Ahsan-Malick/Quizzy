'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "./Button"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"
import { ScrollArea } from "./ui/scroll-area"
import { Clock, CheckCircle, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog"
import { toast, Toaster } from 'react-hot-toast'
import { useStore } from "../store/store"
import axios from "axios";

// Mock quiz data with 50 questions for demonstration
const quizData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  question: `This is question ${i + 1}?`,
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option A"
}))


// type question we are getting from data base after generation
type Question = {
    id: string;
    question: string;
    options: string[];
    answer: string;
  };

  // type answer we will be sending to data base after choosing the option
  type Answer = {
    email: string
    question: string;
    user_answer: string|number;
    result: string
    question_index: number
    option_index: number
  };

export default function EnhancedQuizEnvironment() {
//   const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(quizData.length).fill(null))
  const [timeLeft, setTimeLeft] = useState<number>(3600) // 60 minutes in seconds
  const [showWarning, setShowWarning] = useState(false)
  const [unattemptedQuestions, setUnattemptedQuestions] = useState<number[]>([])



  const getQuestionsAsync = useStore((state)=>state.getQuestionsAsync)
  const checkQuestionAttemptAsync = useStore((state)=> state.checkQuestionAttemptAsync) //fetch current option against current question.
  

  const questionsList: Question[] = useStore((state)=>state.questions)
  const currentOption: boolean|string = useStore((state)=>state.currentOption) //get the current option from the state in store


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([]) // 5 minutes in seconds
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false)
  const [page, setPage] = useState<boolean>(false)

  const currentQuestion: string = questionsList[currentQuestionIndex]?.question;
  const totalQuestions: number | undefined = questionsList?.length;



  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    const fetchQuestions = async () => {

        try {
          await getQuestionsAsync();
          await checkQuestionAttemptAsync(currentQuestion);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };
      fetchQuestions();

    return () => clearInterval(timer)
  }, [getQuestionsAsync, currentQuestion, currentOption])





  useEffect(() => {
    const unattempted = userAnswers.reduce((acc, answer, index) => {
      if (answer === null) acc.push(index + 1)
      return acc
    }, [] as number[])
    setUnattemptedQuestions(unattempted)
  }, [userAnswers])

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[questionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const handleSubmit = () => {
    if (unattemptedQuestions.length > 0) {
      setShowWarning(true)
    } else {
      // Handle quiz submission logic here
      console.log('Quiz submitted:', userAnswers)
    }
  }

  const scrollToQuestion = (questionNumber: number) => {
    const element = document.getElementById(`question-${questionNumber}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }


  const handleAnswerSubmission = async (option: string, index: number ) => {

    //index(0-3) refers to any option out of four
    const question = currentQuestion
    const user_answer = option
    const result = "incorrect" //default
    const question_index = currentQuestionIndex
    const option_index = index+1
    
    
      const answer: Answer = {
        email: "dummy@ymail.com", question, user_answer, result, option_index, question_index
      }

      try {
        await axios.post(
          "http://127.0.0.1:8000/check-answer/", answer // check if the current question is answered
        );
        await checkQuestionAttemptAsync(question);
      } catch (error) {
        console.error(error);
      }
    }



    const handleSubmitQuiz = () => {
        //will set logic to show error in last few mins "Please make sure you attempt all the question"
        if (userAnswers.some(answer => answer === '')) {
          toast.error('Please answer all questions before submitting!')
          return
        }
        setIsQuizSubmitted(true)
        // Here you would typically send the answers to a server for grading
        toast.success('Quiz submitted successfully!')
      }
    
      const isAllQuestionsAnswered = userAnswers.every(answer => answer !== '')

  return (
    <>
    {questionsList.length>0&&
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <div className="max-w-4xl w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Quiz Title</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              <Clock className="mr-2 h-5 w-5" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Unattempted ({unattemptedQuestions.length})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Unattempted Questions</DialogTitle>
                  <DialogDescription>
                    The following questions have not been attempted:
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <ul className="grid grid-cols-5 gap-2">
                    {unattemptedQuestions.map((q) => (
                      <li key={q}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            scrollToQuestion(q)
                            document.body.click() // Close the dialog
                          }}
                          className="w-full"
                        >
                          Q{q}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600">
              <CheckCircle className="mr-2 h-4 w-4" /> Submit Quiz
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-grow p-6" style={{ height: 'calc(100vh - 180px)' }}>
          <div className="space-y-8">
            {questionsList.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                id={`question-${question.id}`}
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {question.id}. {question.question}
                </h2>
                <RadioGroup
                  value={userAnswers[Number(question.id) - 1] || ''}
                  onValueChange={(value) => handleAnswerChange(Number(question.id) - 1, value)}
                  className="space-y-2"
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <RadioGroupItem
                        value={option}
                        id={`q${question.id}-option${optionIndex}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`q${question.id}-option${optionIndex}`}
                        className="flex flex-1 items-center rounded-lg border-2 border-gray-200 bg-white p-4 cursor-pointer transition-all duration-300 ease-in-out peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-gray-50"
                      >
                        <span className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center peer-checked:border-indigo-600 peer-checked:bg-indigo-600">
                          <span className="text-xs">{String.fromCharCode(65 + optionIndex)}</span>
                        </span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 p-4">
          <Progress value={(userAnswers.filter(Boolean).length / quizData.length) * 100} className="w-full" />
          <p className="text-center mt-2 text-sm text-gray-600">
            {userAnswers.filter(Boolean).length} of {quizData.length} questions answered
          </p>
        </div>
      </div>

      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warning: Unattempted Questions</DialogTitle>
            <DialogDescription>
              You have {unattemptedQuestions.length} unattempted questions. Are you sure you want to submit the quiz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWarning(false)}>
              Go Back
            </Button>
            <Button onClick={() => {
              setShowWarning(false)
              // Handle final submission here
              console.log('Quiz submitted with unattempted questions:', userAnswers)
            }}>
              Submit Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
}
    </>
  )
}