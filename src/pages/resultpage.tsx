import React, { useEffect, useState } from 'react'
import QuizResult from "../components/Result"
import { useStore } from '../store/store'



type Question = {
    id: string;
    question: string;
    options: string[];
    answer: string;
  };
  type User = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    disabled: boolean;
  };

const ResultPage:React.FC = () => {

    const userDetail: User | null = useStore((state) => state.userDetail);
 

  return (
    <div>
        {userDetail?.email ? <QuizResult /> : "Loading..."}
    </div>
  )
}

export default ResultPage
