import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import QuizPage from './components/QuizPage.tsx';
import Result from './components/Result.tsx';
import QuizResult from './components/Result2.tsx';
import UserWelcome from './components/Welcome.tsx';
import QuizEnvironment from './components/QuizPageNew.tsx';
import PokemonCardCasing from './components/mock.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/quiz", //protected route, on this page we will have to check if the user is logged in. by making parent of path.
    element: <QuizPage/>
  },
  {
    path: "/result",
    element: <Result/>,
  },
  {
    path: "/welcome",
    element: <UserWelcome></UserWelcome>,
  },
  {
    path: "/newquiz",
    element: <QuizEnvironment></QuizEnvironment>,
  }, {
    path: "/mock",
    element: <PokemonCardCasing></PokemonCardCasing>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
