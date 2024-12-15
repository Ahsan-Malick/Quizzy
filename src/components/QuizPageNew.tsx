import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "./Button"
import { Card, CardContent } from "./ui/card"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'
import { useStore } from "../store/store"
import axios from "axios";


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
  
  type User = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    disabled: boolean
  };

 


const QuizEnvironment:React.FC = () => {


  const getQuestionsAsync = useStore((state)=>state.getQuestionsAsync)
  const checkQuestionAttemptAsync = useStore((state)=> state.checkQuestionAttemptAsync) //fetch current option against current question.
  

  const questionsList: Question[] = useStore((state)=>state.questions)
  const currentOption: boolean|string = useStore((state)=>state.currentOption) //get the current option from the state in store


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState<number>(3000) // 5 minutes in seconds
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false)
  const [page, setPage] = useState<boolean>(false)
  const userDetail: User | null = useStore((state) => state.userDetail);

  const currentQuestion: string = questionsList[currentQuestionIndex]?.question;
  const totalQuestions: number | undefined = questionsList?.length;

 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          clearInterval(timer)
          handleSubmitQuiz()
          return 0
        }
      })
    }, 1000)

    const fetchQuestions = async () => {

        try {
          await getQuestionsAsync(userDetail?.email || '');
          await checkQuestionAttemptAsync(currentQuestion);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };
      fetchQuestions();
      

    

    return () => clearInterval(timer)
  }, [getQuestionsAsync, currentQuestion, currentOption])

  const handleAnswerChange = (answer: string) => {
    
    //collecting answers in an array for some reason.
    //can be used to check if all question answered
    const newAnswers = [...userAnswers]         
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
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
        await checkQuestionAttemptAsync(question_index);
      } catch (error) {
        console.error(error);
      }
    }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
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
 
 <>{questionsList.length>0&&
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex items-center justify-center">
      <Toaster position="top-center" />
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-indigo-800">
              Question {currentQuestionIndex + 1} of {questionsList.length}
            </div>
            <div className="flex items-center text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              <Clock className="mr-2 h-5 w-5" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <Progress 
            value={(currentQuestionIndex + 1) / questionsList.length * 100}
            className="mb-6 h-2 bg-slate-400"

          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {totalQuestions !== 0 &&questionsList[currentQuestionIndex].question}
              </h2>

              <RadioGroup 
                value={userAnswers[currentQuestionIndex]} 
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {totalQuestions !== 0 &&questionsList[currentQuestionIndex].options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <RadioGroupItem value={option} id={`option-${index}`} className="peer sr-only" />
                    <Label
                      htmlFor={`option-${index}`}
                      className={`flex flex-1 items-center rounded-lg border-2 border-indigo-200 bg-white p-4 cursor-pointer transition-all duration-300 ease-in-out peer-checked:border-indigo-600 peer-checked:bg-indigo-50   ${ currentOption!=false&&currentOption===option? `bg-indigo-300`:``}`}
                      onClick={()=>handleAnswerSubmission(option, index)}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="transition-all duration-300 ease-in-out hover:bg-indigo-100"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentQuestionIndex === questionsList.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={!isAllQuestionsAnswered || isQuizSubmitted}
                className="bg-green-500 hover:bg-green-600 transition-all duration-300 ease-in-out"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={goToNextQuestion}
                className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 ease-in-out"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            {questionsList.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestionIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-full ${
                  page===true ? 'bg-indigo-200 text-indigo-800' : ''
                } ${
                  currentQuestionIndex === index ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
}
    </>
  )
}

export default QuizEnvironment