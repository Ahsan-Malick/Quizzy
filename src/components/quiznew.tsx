"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useStore } from "../store/store";
import axios from "axios";
import NoQuestionsPage from "./NoQuestionsPage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ResultBody, TestQuestion, Question, User} from "../store/store"; //importing types

// Mock quiz data with 50 questions for demonstration
const quizDatax = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  question: `This is question ${i + 1}?`,
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option A",
}));




// type answer we will be sending to data base after choosing the option
type Answer = {
  email: string | undefined;
  user_answer: string | number;
  result: string;
  question_index: number;
  option_index: number;
};


type Record = {
  question_index: number;
  option_index: number;
};


export default function EnhancedQuizEnvironment() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showWarning, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  

  const getQuestionsAsync = useStore((state) => state.getQuestionsAsync);
  const getResultsAsync = useStore((state) => state.getResultAsync);
  const resetQuestions = useStore((state)=>state.resetQuestions)

  const questionsList: Question[] = useStore((state) => state.questions); //fetching questions from store
  const quizTitle: string = useStore((state) => state.test_questions.title);
  const duration: number = useStore((state)=>state.test_questions.quiztime_set)
  const quizData: TestQuestion = useStore((state)=>state.test_questions)

  const [userAnswers, setUserAnswers] = useState<string[]>([]); // 5 minutes in seconds

  const userDetail: User | null = useStore((state) => state.userDetail);
  const [record, setRecord] = useState<Record[]>([]); //record of all the questions answered

  const attemptedQuestions = record.map((item) => item.question_index);
  const allQuestions = questionsList.map((question) => Number(question.id));

  const unattemptedQuest = allQuestions.filter(
    (question) => !attemptedQuestions.includes(question)
  );

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

 

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  //Submitting the final quiz
  const handleSubmit = async () => {
    const result_body: ResultBody = {
      email: userDetail?.email || "",
      quiz_no: 1,
      title: quizData.title,
      category: quizData.category,
      score: "0",
      total_questions: questionsList.length,
      timestamp: null
    };
    if (unattemptedQuest.length > 0 && timeLeft !== null && timeLeft > 0) {
      setShowWarning(true);
    } else {
      await getResultsAsync(result_body);
      resetQuestions();
      navigate("/result");
      
    }
  };

  const scrollToQuestion = (questionNumber: number) => {
    const element = document.getElementById(`question-${questionNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAnswerSubmission = async (
    option: string,
    index: number,
    questionIndex: number
  ) => {
    //index(0-3) refers to any option out of four
    const user_answer = option;
    const result = "incorrect"; //default
    const question_index = questionIndex + 1;
    const option_index = index + 1;

    const answer: Answer = {
      email: userDetail?.email,
      user_answer,
      result,
      option_index,
      question_index,
    };

    //checks if the current question is right or wrong and then submit the answer to database
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/quiz/check-answer/`,
        answer,
        { withCredentials: true } // check if the current question is answered
      );
      setRecord(response.data);
      
      // await checkQuestionAttemptAsync(question_index); //may we delete this line
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const answer = { email: userDetail?.email };
      //checks if the current question is right or wrong and then submit the answer to database
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/quiz/check-answer/`,
          answer,
          { withCredentials: true } // check if the current question is answered
        );
        setRecord(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    } else if (timeLeft === 59) {
      toast.warn("⚠️ Hurry up! Less than 1 minute left", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [timeLeft]);

  //to fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        await getQuestionsAsync(userDetail?.email || "");
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    
    const fetchQuizDetails = async () => {
      const started_at = new Date().toISOString();
      const end_time = new Date(new Date().getTime() + duration*60*1000).toISOString();
      const startQuizData = { email: userDetail?.email, started_at, end_time };
      console.log("startQuizData",{startQuizData})
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/quiz/start-quiz`,
        startQuizData,
        { withCredentials: true }
      ); // Example duration: 5 minutes
      const endTime = new Date(response.data.end_time).getTime();
      const startedTime = new Date(response.data.started_at).getTime();
      const remainingTime = Math.max(
        Math.floor((endTime - startedTime) / 1000),
        0
      );
      console.log("endtime",{endTime})
      console.log("response.data.end_time",response.data.end_time )
      console.log("startedtime",{startedTime})
      console.log("difference",{diff: endTime-startedTime})
     
      setTimeLeft(remainingTime);
    };

    fetchQuizDetails();
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          console.log("here 1")
          return 0;
        }
        console.log("here 2")
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (timeLeft === null && questionsList.length > 0) {
    console.log("timeLeft here",{timeLeft})
    return <div>Loading...</div>;
  }
  console.log("here 3",{timeLeft})

  return (
    <>
      {questionsList.length > 0  ? (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col ">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <div className="max-w-4xl w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 mdsm:flex mdsm:justify-between mdsm:items-center max-mdsm:flex max-mdsm:flex-col max-mdsm:items-center max-mdsm:space-y-2 max-mdsm:justify-center">
              <h1 className="text-2xl font-bold text-gray-800">{quizTitle}</h1>
              <div className="xsm:flex xsm:items-center xsm:space-x-4 max-xsm:flex max-xsm:flex-col max-xsm:items-center max-xsm:space-y-2 max-xsm:justify-center">
                <div className="flex items-center text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                  <Clock className="mr-2 h-5 w-5" />
                  <span className="font-semibold">
                    {timeLeft !== null && formatTime(timeLeft)}
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    >
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Unattempted ({unattemptedQuest.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-black">
                    <DialogHeader>
                      <DialogTitle>Unattempted Questions</DialogTitle>
                      <DialogDescription>
                        The following questions have not been attempted:
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      <ul className="grid grid-cols-5 gap-2 text-black">
                        {unattemptedQuest.map((q) => (
                          <li key={q}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                scrollToQuestion(q);
                                document.body.click(); // Close the dialog
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

                {submitted ? (
                  <Button className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="mr-2 h-4 w-4" /> View Result
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Submit Quiz
                  </Button>
                )}
              </div>
            </div>

            <ScrollArea
              className="flex-grow p-6"
              style={{ height: "calc(100vh - 180px)" }}
            >
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
                      value={userAnswers[Number(question.id) - 1] || ""}
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
                            className={`flex flex-1 items-center rounded-lg border-2 border-gray-200 bg-white p-4 cursor-pointer transition-all duration-300 ease-in-out ${
                              record?.some(
                                (item) =>
                                  item.question_index === Number(question.id) &&
                                  item.option_index === optionIndex + 1
                              )
                                ? "bg-green-500 text-white"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerSubmission(option, optionIndex, index)
                            }
                          >
                            <span className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center peer-checked:border-indigo-600 peer-checked:bg-indigo-600">
                              <span className="text-xs">
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
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
              <Progress
                value={
                  (userAnswers.filter(Boolean).length / quizDatax.length) * 100
                }
                className="w-full"
              />
              <p className="text-center mt-2 text-sm text-gray-600">
                {record.length} of {questionsList.length} questions answered
              </p>
            </div>
          </div>

          <Dialog open={showWarning} onOpenChange={setShowWarning}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Warning: Unattempted Questions</DialogTitle>
                <DialogDescription className="bg-white">
                  You have {unattemptedQuest?.length} unattempted questions.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowWarning(false)}>
                  Go Back
                </Button>
                <Button
                  onClick={() => {
                    setShowWarning(false);
                    // Handle final submission here
              
                  }}
                >
                  Submit Anyway
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <NoQuestionsPage />
      )}
    </>
  );
}
