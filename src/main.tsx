import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import QuizPage from "./components/QuizPage.tsx";
import Result from "./components/Result.tsx";
import QuizResult from "./components/Result2.tsx";
import WelcomePage from "./pages/welcomepage.tsx";
import QuizEnvironment from "./components/QuizPageNew.tsx";
import PokemonCardCasing from "./components/mock.tsx";
import SignInPage from "./pages/signinpage.tsx";
import SignUpPage from "./pages/signuppage.tsx"
import Auth from "./components/Auth.tsx";
import EnhancedQuizEnvironment from "./components/quiznew.tsx";
import QuizResultPage from "./components/Result.tsx";
import ResultPage from "./pages/resultpage.tsx";
import SettingsPage from "./pages/settingspage.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GmailButton from "./components/GmailButton.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/quiz", //protected route, on this page we will have to check if the user is logged in. by making parent of path.
    element: <Auth><EnhancedQuizEnvironment /></Auth>,
  },
  {
    path: "/welcome",
    element: <Auth><WelcomePage></WelcomePage></Auth>,
  },
  {
    path: "/newquiz",
    element: <Auth><QuizEnvironment></QuizEnvironment></Auth>,
  },
  {
    path: "/signin",
    element: <SignInPage></SignInPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },

  {
    path: "/result",
    element: <Auth><ResultPage/></Auth>,
  },
  {
    path: "/settings",
    element: <Auth><SettingsPage/></Auth>,
  },
  {
    path: "/s",
    element: <GmailButton/>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="332743294598-knm23bv9pm17k13ibtif5cq0i8lp85b3.apps.googleusercontent.com">
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
