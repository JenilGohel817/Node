import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(false);
      setLoading(false);
    } else {
      setPaymentError(null);
      setPaymentSuccess(true);
      handlePayment(token);
    }
  };

  const handlePayment = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 10, // Set the amount to be charged
          token,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Handle payment success, e.g., show a success message
        alert("Payment successful!");
      } else {
        // Handle payment failure, e.g., show an error message
        alert(`Payment failed: ${result.error}`);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Card details
            <CardElement />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
      {paymentError && <div style={{ color: "red" }}>{paymentError}</div>}
      {paymentSuccess && (
        <div style={{ color: "green" }}>Payment successful!</div>
      )}
    </div>
  );
};

export default PaymentForm;
