import { create } from 'zustand'
import axios from "axios";

type Question = {
    id: string;
    question: string;
    options: string[];
    answer: string;
  };

  type TestQuestion = {
    questions: Question[],
    email: string
  };  
  type Result = {
    result: string
  }

type QuizzyStore = {
    questions: Question[];
    test_questions: TestQuestion;
    no_quiz_found: string;
    getQuestionsAsync: ()=>Promise<void>;
    // testgetQuestionsAsync: ()=>Promise<void>;
    checkQuestionAttemptAsync: (question: string)=>Promise<void>;
    currentOption: boolean|string;
    currentAnswer: string;
    getResultAsync: (body: {email: string} )=>Promise<void>
    result: string
}


export const useStore = create<QuizzyStore>((set) => ({
  questions: [],
  test_questions: {questions:[], email: ""},
  no_quiz_found: "",
  getQuestionsAsync: async () => {
    try {
    const response = await axios.get<TestQuestion|string>(
        "http://127.0.0.1:8000/quiz_questions"
      );
    if (response.data==="null"){
      set({no_quiz_found:"Something went wrong! No Quiz Found"})
    }
    else {
      console.log("hi")
    const { questions, email } = response.data as TestQuestion; //Type assertion is used in this case of destructuringW
    set(() => ({
      test_questions: { questions: questions, email: email },
      no_quiz_found: "",
      questions: questions
    }));
  }

  }catch (error){
    console.error("Error fetching questions:", error);
    
  }} ,
  // getQuestionsAsync: async () => {
  //   try {
  //   const response = await axios.get<Question[]>(
  //       " http://localhost:3000/Questions"
  //     );
  //   set({ questions: response.data})
  // }catch (error){
  //   console.error("Error fetching questions:", error);
    
  // }} ,
  checkQuestionAttemptAsync: async (question: string) => {
    try {
    const response = await axios.get<boolean|string>(
        `http://127.0.0.1:8000/attempted-question?question=${question}`
      );
    set({ currentOption: response.data})
  }catch (error){
    console.error("Error fetching questions:", error);
    
  }} ,
  currentOption: false,
  currentAnswer: "",
  getResultAsync: async (body) => {
    try {
    const response = await axios.post<Result>(
        "http://127.0.0.1:8000/result", body
      );
    set({ result: response.data.result})
  }catch (error){
    console.error("Error fetching questions:", error);
    
  }},
  result:""
}))

