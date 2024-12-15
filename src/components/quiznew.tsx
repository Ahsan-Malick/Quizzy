"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
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
import { toast, Toaster } from "react-hot-toast";
import { useStore } from "../store/store";
import axios from "axios";
import NoQuestionsPage from "./NoQuestionsPage";
import { Link } from "react-router-dom";

// Mock quiz data with 50 questions for demonstration
const quizData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  question: `This is question ${i + 1}?`,
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option A",
}));

// type question we are getting from data base after generation
type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

// type answer we will be sending to data base after choosing the option
type Answer = {
  email: string | undefined;
  user_answer: string | number;
  result: string;
  question_index: number;
  option_index: number;
};

type User = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  disabled: boolean;
};

type Record = {
  question_index: number;
  option_index: number;
};

export default function EnhancedQuizEnvironment() {
  //   const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(quizData.length).fill(null))
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes in seconds
  const [showWarning, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [unattemptedQuestions, setUnattemptedQuestions] = useState<number[]>(
    []
  );

  const getQuestionsAsync = useStore((state) => state.getQuestionsAsync);
  const getResultsAsync = useStore((state) => state.getResultAsync);
 

  const questionsList: Question[] = useStore((state) => state.questions); //fetching questions from store
  const quizTitle: string = useStore((state) => state.test_questions.title);

  const [userAnswers, setUserAnswers] = useState<string[]>([]); // 5 minutes in seconds
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const userDetail: User | null = useStore((state) => state.userDetail);
  const [record, setRecord] = useState<Record[]>([]); //record of all the questions answered

  const attemptedQuestions = record.map((item) => item.question_index);
  const allQuestions = questionsList.map((question) => Number(question.id));

  const unattemptedQuest = allQuestions.filter(
    (question) => !attemptedQuestions.includes(question)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    const fetchQuestions = async () => {
      try {
        await getQuestionsAsync(userDetail?.email || "");
        // await checkQuestionAttemptAsync(currentQuestion);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSubmit = async () => {
    const result_body = {email: userDetail?.email || "", score: "0", total_questions: questionsList.length};
    console.log(userDetail);
    if (unattemptedQuest.length > 0) {
      setShowWarning(true);
    } else {
      await getResultsAsync(result_body);
      
      console.log("Quiz submitted:", userAnswers);
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
        "http://127.0.0.1:8000/quiz/check-answer/",
        answer,
        { withCredentials: true } // check if the current question is answered
      );
      setRecord(response.data);
      // console.log(response.data);
      // await checkQuestionAttemptAsync(question_index); //may we delete this line
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitQuiz = () => {
    //will set logic to show error in last few mins "Please make sure you attempt all the question"
    if (userAnswers.some((answer) => answer === "")) {
      toast.error("Please answer all questions before submitting!");
      return;
    }
    setIsQuizSubmitted(true);
    // Here you would typically send the answers to a server for grading
    toast.success("Quiz submitted successfully!");
  };

  const isAllQuestionsAnswered = userAnswers.every((answer) => answer !== "");

  useEffect(() => {
    const fetch = async () => {
      const answer = { email: userDetail?.email };

      //checks if the current question is right or wrong and then submit the answer to database
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/quiz/check-answer/",
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

  return (
    <>
      {questionsList.length > 0 ? (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col ">
          <div className="max-w-4xl w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">{quizTitle}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                  <Clock className="mr-2 h-5 w-5" />
                  <span className="font-semibold">{formatTime(timeLeft)}</span>
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
                
                { submitted ? (
                <Button
                  
                  className="bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> View Result
                </Button>): (
                  <Link to="/result">
                  <Button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Submit Quiz
                </Button>
                </Link>)
}
                
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
                  (userAnswers.filter(Boolean).length / quizData.length) * 100
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
                    console.log(
                      "Quiz submitted with unattempted questions:",
                      userAnswers
                    );
                  }}
                >
                  Submit Anyway
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ): <NoQuestionsPage/>}
    </>
  );
}
