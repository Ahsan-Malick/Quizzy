import SignIn from "../components/SignIn";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const validateAuthAsync = useStore((state) => state.validateAuthAsync);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        await validateAuthAsync();
      } catch (error) {
        // Silently handle the error - user is not authenticated
      } finally {
        setIsChecking(false);
      }
    };
    validateAuth();
  }, [validateAuthAsync]);

  if (isChecking) {
    return <div>Loading...</div>; // Or a proper loading spinner component
  }

  return <SignIn />;

};

export default SignInPage;
