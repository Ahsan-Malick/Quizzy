import { create } from "zustand";
import axios from "axios";

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

type TestQuestion = {
  title: string;
  questions: Question[];
  email: string;
};
type Result = {
  title: string;
  total_questions: number;
  total_correct_answers: number;
};
type User = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  disabled: boolean
};

type QuizzyStore = {
  questions: Question[];
  test_questions: TestQuestion;
  no_quiz_found: string;
  currentOption: boolean | string;
  currentAnswer: string;
  result: Result;
  isLoggedIn: boolean;
  userDetail: User | null;
  getQuestionsAsync: (email: string) => Promise<void>;
  checkQuestionAttemptAsync: (question_index: number) => Promise<void>;
  getResultAsync: (result_body: { email: string, score: string|number, total_questions: number }) => Promise<void>;
  checkUsernameAsync: (body: { username: string }) => Promise<boolean>;
  checkEmailAsync: (body: { email: string }) => Promise<boolean>;
  signUpUserAsync: (data: object) => Promise<void>;
  signInUserAsync: (data: object) => Promise<void>;
  validateAuthAsync: () => Promise<number | undefined>;
  logOutUserAsync: () => Promise<void>;
};

export const useStore = create<QuizzyStore>((set) => ({
  questions: [],
  isLoggedIn: false,
  userDetail: null,
  test_questions: { questions: [], email: "", title: "" },
  result: { title: "", total_questions: 0, total_correct_answers: 0 },
  no_quiz_found: "",
  validateAuthAsync: async () => {
    const response = await axios.get("http://127.0.0.1:8000/auth/validate", {
      withCredentials: true,
    });
    if (response){
    set({isLoggedIn: true});
    set(()=>({userDetail: response.data}))
    return response.status
    }
    return undefined
  },
  checkUsernameAsync: async (body) => {
    const response = await axios.post<boolean>(
      "http://127.0.0.1:8000/auth/checkusername",
      body
    );
    if (response.data === false) {
      return false;
    } else {
      return true;
    }
  },
  checkEmailAsync: async (body) => {
    const response = await axios.post<boolean>(
      "http://127.0.0.1:8000/auth/checkemail",
      body
    );
    if (response.data === false) {
      return false;
    } else {
      return true;
    }
  },
  signUpUserAsync: async (data) => {
    try {
      const response = await axios.post<User>(
        "http://127.0.0.1:8000/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Set the correct content type
          },
          withCredentials: true, // To include cookies in the request
        }
      );
      set({userDetail: response.data})
      set(()=>({isLoggedIn: true}))
    } catch (error) {
      alert(error) //fix it
    }
  },
  signInUserAsync: async (data) => {
    try {
      const response = await axios.post<User>("http://127.0.0.1:8000/auth/signin", data, {headers:{"Content-Type":"application/x-www-form-urlencoded"}, withCredentials: true})
      set({userDetail: response.data})
      set(()=>({isLoggedIn: true}))
    } catch (error) {
      alert(error)
    }
  },
  getQuestionsAsync: async (email: string) => {
    try {
      const response = await axios.get<TestQuestion | string>(
        `http://127.0.0.1:8000/quiz/quiz_questions?email=${email}`, {withCredentials: true}
      );
      if (response.data === "null") {
        set({ no_quiz_found: "Something went wrong! No Quiz Found" });
      } else {
        const { questions, email, title } = response.data as TestQuestion; //Type assertion is used in this case of destructuringW
        set(() => ({
          test_questions: { questions: questions, email: email, title: title },
          no_quiz_found: "",
          questions: questions,
        }));
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },

  checkQuestionAttemptAsync: async (question_index: number) => {
    try {
      const response = await axios.get<boolean | string>(
        `http://127.0.0.1:8000/quiz/attempted-question?question_index=${question_index}`, {withCredentials: true}
      );
      set({ currentOption: response.data });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },
  currentOption: false,
  currentAnswer: "",
  getResultAsync: async (result_body) => {
    try {
      const response = await axios.post<Result>(
        "http://127.0.0.1:8000/quiz/result",
        result_body, {withCredentials: true} 
      );
      set({ result: response.data});
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },
  logOutUserAsync: async () => {
    const response = await axios.get("http://127.0.0.1:8000/auth/logout", {withCredentials: true})
    if (response.status === 200){
      set({isLoggedIn: false})
      set({userDetail: null})
    }
  }
}));

useStore.subscribe((state) => {
  console.log("State updated:", state);
});