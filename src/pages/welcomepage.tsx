import { useStore } from "../store/store";
import { useEffect } from "react";
import UserWelcome from "../components/Welcome";

const WelcomePage = () => {
  const userDetails = useStore((state) => state.userDetail);

  useEffect(() => {
    if (!userDetails) {
        
      // Using window.location.href for redirection ensures a full page reload, which can be beneficial for clearing any existing state and ensuring that the user is fully redirected to the sign-in page.
      window.location.href = "/signin"; // Redirect to sign-in page if user details are not available
    }
  }, [userDetails]);

  return <UserWelcome/>;
};

export default WelcomePage;
