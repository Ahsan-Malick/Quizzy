import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "../../store/store";
import PaymentSuccessful from "./PaymentSuccessful";
const Return = () => {
    const [status, setStatus] = useState<string | null>(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const getStripeSessionStatusAsync = useStore((state) => state.getStripeSessionStatusAsync);
   
  
    useEffect(() => {
      const fetchSessionStatus = async () => {
        try {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const sessionId = urlParams.get('session_id');
          
          if (sessionId) {
            const response = await getStripeSessionStatusAsync(sessionId);
            setStatus(response?.status || null);
          }
        } catch (error) {
          console.error("Error fetching session status:", error);
        }
      };
      
      fetchSessionStatus();
    }, []);
  
  
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }
    if (status === 'duplicate_email_error') {
      return (
        // <Navigate to="/checkout" />
        <div>
          {/* <h1>Duplicate Email Error</h1>
          <p>The email you provided is already subscribed</p> */}
          <PaymentSuccessful/>
        </div>  
      )
    }
  
    if (status === 'complete') {
      return (
        <section id="success">
         <PaymentSuccessful />
        </section>
      )
    }
  
    return null;
  }

  export default Return;