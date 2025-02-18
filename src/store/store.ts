import { create } from "zustand";
import axios from "axios";

export type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

export type TestQuestion = {
  title: string;
  questions: Question[];
  email: string;
  number_of_questions: number;
  quiztime_set: number;
  difficulty: string;
  category: string;
};

type Result = {
  title: string;
  total_questions: number;
  total_correct_answers: number;
};
export type User = {
  firstname: string;
  lastname: string;
  username: string|null;
  email: string;
  avatar: string;
  is_google_user: boolean;
  disabled: boolean
};

export type ResultBody = {
  email: string,
  quiz_no: number,
  title: string,
  category: string,
  score: string|number,
  total_questions: number,
  timestamp: null
}

export type UserPerformance = {
  email: string;
  quizzes_taken: number;
  highest_score: number;
  lowest_score: number;
  average_score: number;
  popular_category: string | null;
}

export type RecentQuizzes = {
  title: string,
  quiz_no: number,
  score_percentage: number
}

type QuizzyStore = {
  questions: Question[];
  test_questions: TestQuestion;
  no_quiz_found: string;
  currentOption: boolean | string;
  currentAnswer: string;
  result: Result;
  isLoggedIn: boolean;
  userDetail: User | null;
  quizTime: number;
  userPerformance: UserPerformance;
  recent_quizzes: RecentQuizzes[] ;
  is_google_user: boolean;
  userPerformanceAsync: (email: string)=>Promise<void>;
  getQuestionsAsync: (email: string) => Promise<TestQuestion|null>;
  checkQuestionAttemptAsync: (question_index: number) => Promise<void>;
  getResultAsync: (result_body: ResultBody) => Promise<void>;
  checkUsernameAsync: (body: { username: string }) => Promise<boolean>;
  checkEmailAsync: (body: { email: string }) => Promise<boolean>;
  signUpUserAsync: (data: object) => Promise<void>;
  signInUserAsync: (data: object) => Promise<void>;
  gmailSignInUserAsync: (credentialToken: string) => Promise<void>;
  validateAuthAsync: () => Promise<number | undefined>;
  gmailValidateAuthAsync: () => Promise<number | undefined>;
  logOutUserAsync: () => Promise<void>;
  resetQuestions: () => void; 
};




export const useStore = create<QuizzyStore>((set) => ({
  questions: [],
  isLoggedIn: false,
  is_google_user: false,
  userDetail: null,
  test_questions: { questions: [], email: "", title: "", difficulty: "", category: "", number_of_questions: 0, quiztime_set: 0 },
  result: { title: "", total_questions: 0, total_correct_answers: 0 },
  recent_quizzes: [],
  no_quiz_found: "",
  quizTime: 0,
  userPerformance: {
    email: "",
    quizzes_taken: 0,
    highest_score: 0,
    lowest_score: 0,
    average_score: 0,
    popular_category: null,
  },
  validateAuthAsync: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/validate`, {
      withCredentials: true,
    });
    
    if (response){
    set({isLoggedIn: true});
    set(()=>({userDetail: response.data as User}))

    return response.status
    }
    return undefined
  },
  gmailValidateAuthAsync: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/gmail-validate`, {
      withCredentials: true,
    });
    if (response){
    set({isLoggedIn: true});
    set(()=>({userDetail: response.data as User}))

    return response.status
    }
    return undefined
  },
 
  checkUsernameAsync: async (body) => {
    const response = await axios.post<boolean>(
      `${import.meta.env.VITE_API_URL}/auth/checkusername`,
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
      `${import.meta.env.VITE_API_URL}/auth/checkemail`,
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json", // Set the correct content type
          },
          withCredentials: true, // To include cookies in the request
        }
      );
      set({userDetail: response.data as User})
      set(()=>({isLoggedIn: true}))
  
    } catch (error) {
      alert("Invalid Otp")
    }
  },
  signInUserAsync: async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, data, {headers:{"Content-Type":"application/x-www-form-urlencoded"}, withCredentials: true})
      set({userDetail: response.data as User})
      set(()=>({isLoggedIn: true}))
    } catch (error) {
      alert(error)
    }
  },
  gmailSignInUserAsync: async (credentialToken: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google-signin?token=${credentialToken}`, {withCredentials: true})
      console.log(response.data)
      set({userDetail: response.data as User})
      set(()=>({isLoggedIn: true}))
      set({is_google_user: response.data.is_google_user})
    } catch (error) {
      alert(error)
    }
  },
  getQuestionsAsync: async (email: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/quiz/quiz_questions?email=${email}`, {withCredentials: true}
      );
      if (response.data === "null") {
        set({ no_quiz_found: "Something went wrong! No Quiz Found" });
      } else {
        const { questions, email, title, difficulty, category, number_of_questions, quiztime_set } = response.data as TestQuestion; //Type assertion is used in this case of destructuringW
        set(() => ({
          test_questions: { questions: questions, email: email, title: title, difficulty: difficulty, category: category, number_of_questions: number_of_questions, quiztime_set: quiztime_set },
          no_quiz_found: "",
          questions: questions,
        }));
        return response.data;
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/quiz/result`,
        result_body, {withCredentials: true} 
      );
      set({ result: response.data as Result});
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },
  userPerformanceAsync: async(email: string)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/quiz/performance?email=${email}`,{}, {withCredentials: true});
    const {response_data, recent_quizzes} = response.data
    console.log(recent_quizzes)
    set({userPerformance: response_data})
    set({recent_quizzes: recent_quizzes})
   
    
  },
  resetQuestions: () => set({ questions: [] }),
  logOutUserAsync: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {withCredentials: true})
    if (response.status === 200){
      set({isLoggedIn: false})
      set({userDetail: null})
    }
  }
}));

// useStore.subscribe((state) => {
//   console.log("State updated:", state);
// });