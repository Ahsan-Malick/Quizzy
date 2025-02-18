import React, { useEffect, useState } from 'react'
import QuizResult from "../components/Result"
import { useStore } from '../store/store'
import { User } from '../store/store'




const ResultPage:React.FC = () => {

    const userDetail: User | null = useStore((state) => state.userDetail);
 

  return (
    <div>
        {userDetail?.email ? <QuizResult /> : "Loading..."}
    </div>
  )
}

export default ResultPage
