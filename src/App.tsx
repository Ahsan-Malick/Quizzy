import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import { useStore } from "./store/store"

function App() {
  
 const getQuestionsAsync = useStore((state)=>state.getQuestionsAsync)
 const check = useStore((state)=>state.checkQuestionAttemptAsync)
 const validateAuthAsync = useStore((state)=>state.validateAuthAsync)

 const [isloggedin, setIsLogedIn] = useState<boolean>(false)
 

 useEffect(()=>{
  const fetchQuestions = async () => {
    try {
      await getQuestionsAsync();
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const validateAuth = async () => {
    await validateAuthAsync();
  };
  validateAuth();

  fetchQuestions();
 },[getQuestionsAsync, validateAuthAsync])


  return (
    <>
    <Home userLogged={isloggedin}></Home>
   
   </>
  )
}

export default App
