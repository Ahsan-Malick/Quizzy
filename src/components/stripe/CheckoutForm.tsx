import React, { useCallback, useState} from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';


import DuplicateEmailError from "./DuplicateEmaiError";
import { useStore } from "../../store/store";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const user_email = useStore((state) => state.userDetail?.email);
const [duplicateEmail, setDuplicateEmail] = useState(false);
const email = user_email;
  const fetchClientSecret = useCallback(async () => {
    try {
      // Create a Checkout Session
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/stripe/create-checkout-session?email=${email}`, 
        { method: "POST" }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      // Option to show an alert
      setDuplicateEmail(true);
      
      throw error;
    }
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
        {
            duplicateEmail?
            <DuplicateEmailError />

            :
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
}
    </div>
  )
}

export default CheckoutForm;

