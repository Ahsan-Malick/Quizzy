import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import axios from "axios";

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const validateAuthAsync = useStore((state) => state.validateAuthAsync);
  
  useEffect(() => {
    // Fetch authentication status from the backend using Axios
    const checkAuth = async () => {
      try {
        const status = await validateAuthAsync()
        
        if (status === 200) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false);
          navigate("/signin");
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/signin");
      }
    };

    checkAuth();
  }, [navigate]);

  // Show loading state while authentication is being verified
  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  // Render children if authenticated, otherwise redirect is handled
  return <>{isAuthenticated && children}</>;
};

export default Auth;