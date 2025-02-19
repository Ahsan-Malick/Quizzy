import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useStore } from "../store/store";
import axios from "axios";

const GmailButton = () => {
  const gmailSignInUserAsync = useStore((state) => state.gmailSignInUserAsync);

  const handleSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      try {
        await gmailSignInUserAsync(response.credential);
        // Handle successful authentication, e.g., store tokens, redirect user
       
      } catch (error) {
        // Handle errors from the backend
        console.error("Error during authentication:", error);
      }
    } else {
      console.error("No credential received");
    }
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GmailButton;
