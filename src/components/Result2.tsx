import React, { useState } from 'react';
import Confetti from 'react-confetti'; // Install: npm install react-confetti

interface Props {
  topicName: string;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: string;
  jarsSpent: number;
  // onRetry: () => void;
  // onShare: () => void;
}

const QuizResult: React.FC<Props> = ({
  topicName,
  correctAnswers,
  totalQuestions,
  timeTaken,
  jarsSpent,
}) => {
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const [showConfetti, setShowConfetti] = useState(true); // Initially show confetti

  // Stop confetti after a few seconds
  setTimeout(() => {
    setShowConfetti(false);
  }, 5000); // 5 seconds


  let message, emoji, confetti;


  if (accuracy >= 75) {
    message = "Excellent work!";
    emoji = "🎉🙌";
    confetti = <Confetti width={window.innerWidth} height={window.innerHeight-150} recycle={showConfetti}/>;

  } else if (accuracy >= 50 && accuracy < 75) {
    message = "Well done!";
    emoji = "👏👍";

  } else {
    message = "Keep learning!";
    emoji = "📚💡";
  }





  return (
    <div className="relative bg-gradient-to-r from-[#EBF1FF] to-[#FCF7DE] rounded-lg shadow-md p-6 w-96 overflow-hidden mx-auto">
       {confetti}
      <div className="flex justify-between items-start mb-6">
        {/* ... (Header remains the same) */}
      </div>

      <div className="flex flex-col items-center mb-8">
        {/* Trophy */}

        <div className="relative">
          <img src="/assets/trophy.png" alt="Trophy" className="w-24 h-24 mb-4" />
          {accuracy === 100 && ( // Show a star only if 100%
              <div className="absolute -top-4 -right-4 bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10">
                  <span className="text-white text-2xl font-bold">⭐</span>
             </div>

          )}

        </div>
<div>{topicName}</div>

        <h2 className="text-3xl text-[#3D00B3] font-bold text-center mb-2">
          {message}
        </h2>

        <div className="text-[#D3102C]">{emoji}</div>
        <p className="text-[#121212]">You got {correctAnswers} out of {totalQuestions} questions right</p>
      </div>

      {/* Time, Accuracy, Jars Section */}
       <div className="flex justify-between mb-6">
       <div>
            <div className="flex items-center"> <span className="material-symbols-outlined mr-1 text-green-400">timer</span> <p className="text-gray-500">Time</p></div> <p>{timeTaken}</p>

          </div>

           <div>
               <div className="flex items-center"> <span className="material-symbols-outlined mr-1 text-green-400">bar_chart</span> <p className="text-gray-500">Accuracy</p></div> <p>{accuracy.toFixed(0)}%</p>


          </div>
        <div>
            <div className="flex items-center"><span className="material-symbols-outlined mr-1 text-green-400">savings</span> <p className="text-gray-500">Jars Spent</p> </div><p>{jarsSpent}</p>


          </div>


       </div>

      {/* Correct/Wrong/Skipped */}

       <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#66E16F] p-3 rounded-lg">
            <p className="text-white text-center font-semibold">{correctAnswers}</p>
            <p className="text-xs text-white text-center">Correct</p>

          </div>
          <div className="bg-[#FE6A6C] p-3 rounded-lg">
            <p className="text-white text-center font-semibold">{totalQuestions - correctAnswers}</p>
            <p className="text-xs text-white text-center">Wrong</p>


          </div>
          <div className="bg-[#FFB644] p-3 rounded-lg">
             <p className="text-white text-center font-semibold">0</p>
            <p className="text-xs text-white text-center">Skipped</p>


          </div>
       </div>
    </div>
  );
};

export default QuizResult;