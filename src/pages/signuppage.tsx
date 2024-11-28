import SignUp from "../components/SignUp";
import { useStore } from "../store/store";
import { useEffect } from "react";

const SignUpPage = () => {
  const validateAuthAsync = useStore((state) => state.validateAuthAsync);

  useEffect(() => {
    //make the user data available to the signup page
    try{
    const validateAuth = async () => {
      await validateAuthAsync();
    };
    validateAuth();
  } catch (error) {
    alert(error)
  }
  }, []);

  return <SignUp />;
};

export default SignUpPage;
