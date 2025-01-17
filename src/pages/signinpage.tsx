import SignIn from "../components/SignIn";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const validateAuthAsync = useStore((state) => state.validateAuthAsync);
  const gmailValidateAuthAsync = useStore((state)=> state.gmailValidateAuthAsync)
  const [isChecking, setIsChecking] = useState(true);
  const is_google_user = useStore((state)=>state.is_google_user)
  console.log("I am here")

  useEffect(() => {
    const validateAuth = async () => {
      if(!is_google_user)
      try {   
        const status = await validateAuthAsync()
        if (status === 200) {
          setIsChecking(false); // User is authenticated
        }

      } catch (error) {
        // Silently handle the error - user is not authenticated
      } finally{
        setIsChecking(false); 
      }
      else if(is_google_user)
        try {   
          const status = await gmailValidateAuthAsync()
          if (status === 200) {
            setIsChecking(false); // User is authenticated
          }
  
        } catch (error) {
          // Silently handle the error - user is not authenticated
        } finally{
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
