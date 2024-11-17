import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../store/store"


const QuizPage: React.FC = () => {

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
  };

  const getQuestionsAsync = useStore((state)=>state.getQuestionsAsync)
  const checkQuestionAttemptAsync = useStore((state)=> state.checkQuestionAttemptAsync)

  const questions: Question[] = useStore((state)=>state.questions)
  const currentOption: boolean|string = useStore((state)=>state.currentOption)

  const [Qindex, setQIndex] = useState<number>(1);

  const currentQuestion: Question = questions[Qindex-1];
  const totalQuestions: number | undefined = questions?.length;
  const question = currentQuestion?.question
  

  //Move to next or previous question using prev or next button
  const handleQindex = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = e.target as HTMLButtonElement; //Type assertion necessary in this case
    let buttonType = buttonElement.textContent;
    if (Qindex >= totalQuestions && buttonType === "Next") {
      setQIndex(1);
    } else if (Qindex === 1 && buttonType === "Prev") {
      setQIndex(totalQuestions);
    } else if (buttonType === "Next") {
      let updatedIndex = Qindex + 1;
      setQIndex(updatedIndex);
    } else {
      let updatedIndex = Qindex - 1;
      setQIndex(updatedIndex);
    }
  };

//Switch between questions directly
const handlePageNumber = (e: React.MouseEvent<HTMLButtonElement>) =>{
  const val = e.target as HTMLButtonElement
  let currentPage = val.textContent;
  setQIndex(Number(currentPage))
}

const handleAnswerSubmission = async (option: string) => {

// const question = currentQuestion.question
const user_answer = option
const result = "incorrect" //default value, will be decided finally in the backend
// const optionIndex = index;
// // setOptIndex(optionIndex);


  const answer: Answer = {
    email: "dummy@ymail.com", question, user_answer, result
  }
  try {
    await axios.post(
      "http://127.0.0.1:8000/check-answer/", answer
    );
    await checkQuestionAttemptAsync(question);
  } catch (error) {
    console.error(error);
  }
}

console.log("hello")
useEffect(()=>{
  const fetchQuestions = async () => {

    try {
      await getQuestionsAsync();
      await checkQuestionAttemptAsync(question);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  fetchQuestions();
 },[getQuestionsAsync, question])

  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <span className="text-gray-700 text-lg font-medium">
            Time remaining:
          </span>
          <span className="text-green-500 text-lg font-bold ml-2">
            14:44:00
          </span>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">
          Submit
        </button>
      </div>

      <div className="mb-10">
        {/* Increased margin */}
        <p className="text-gray-700 font-medium">
          Question {Qindex} of {totalQuestions}
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {totalQuestions !== 0 ? questions[Qindex - 1].question : "loading"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {totalQuestions !== 0 &&
            currentQuestion.options.map((option) => (
              <button
                // Call handleAnswer on click
                className={`bg-gray-100 border-gray-300 text-gray-800 font-medium py-4 px-6 rounded-lg  ${ currentOption!=false&&currentOption===option? `bg-green-600`:``} text-left`}
                onClick={()=>handleAnswerSubmission(option)}
              >

                {option}
              </button>
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg"
          onClick={handleQindex}
        >
          Prev
        </button>
        <div className="flex space-x-2">
          {questions?.map((_, index) => (
            <button
              key={index+1}
              className={`${
                Qindex === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }  font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}

              onClick={handlePageNumber}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg"
          onClick={handleQindex}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
