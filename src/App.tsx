import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import { useStore } from "./store/store"

function App() {
  
 const getQuestionsAsync = useStore((state)=>state.getQuestionsAsync)
 const check = useStore((state)=>state.checkQuestionAttemptAsync)
 

 useEffect(()=>{
  const fetchQuestions = async () => {
    try {
      await getQuestionsAsync();
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  fetchQuestions();
 },[getQuestionsAsync])


  return (
    <>
    <Home></Home>
   
   </>
  )
}

export default App
