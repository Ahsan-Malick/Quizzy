import { create } from 'zustand'
import axios from "axios";

type Question = {
    id: string;
    question: string;
    options: string[];
    answer: string;
  };

  type Result = {
    result: string
  }

type QuizzyStore = {
    questions: Question[];
    getQuestionsAsync: ()=>Promise<void>;
    checkQuestionAttemptAsync: (question: string)=>Promise<void>;
    currentOption: boolean|string;
    currentAnswer: string;
    getResultAsync: (body: {email: string} )=>Promise<void>
    result: string
}


export const useStore = create<QuizzyStore>((set) => ({
  questions: [],
  getQuestionsAsync: async () => {
    try {
    const response = await axios.get<Question[]>(
        "http://localhost:3000/Questions"
      );
    set({ questions: response.data})
  }catch (error){
    console.error("Error fetching questions:", error);
    
  }} ,
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

