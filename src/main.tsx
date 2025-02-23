// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import WelcomePage from "./pages/welcomepage.tsx";
import SignInPage from "./pages/signinpage.tsx";
import SignUpPage from "./pages/signuppage.tsx"
import Auth from "./components/Auth.tsx";
import EnhancedQuizEnvironment from "./components/quiznew.tsx";
import ResultPage from "./pages/resultpage.tsx";
import SettingsPage from "./pages/settingspage.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import PasswordResetPage from "./pages/password-reset-page.tsx";



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
    path: "/reset-password/:token",
    element: <PasswordResetPage></PasswordResetPage>
  }

]);

createRoot(document.getElementById("root")!).render(
 
    <GoogleOAuthProvider clientId="332743294598-knm23bv9pm17k13ibtif5cq0i8lp85b3.apps.googleusercontent.com">
    <RouterProvider router={router} />
    </GoogleOAuthProvider>

);
