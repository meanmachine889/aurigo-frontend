import React from "react";
import loadRazorpayScript from "./loadRazorpayScript";
import { Button } from "./button";

interface PaymentButtonProps {
  amount: number;
  transactionId: string; // Pass the transaction ID from the parent
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, transactionId }) => {
  const initiatePayment = async () => {
    // Load the Razorpay script
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay script. Check your internet connection.");
      return;
    }

    try {
      // Step 1: Create Razorpay order from backend
      const res = await fetch(`https://v0ck2c87-5000.inc1.devtunnels.ms/api/payments/${transactionId}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Pass auth token
        },
      });

      if (!res.ok) {
        throw new Error(`Error creating payment order: ${res.statusText}`);
      }

      const { order } = await res.json();

      // Step 2: Set Razorpay Checkout options
      const options = {
        key: "rzp_test_2wY1ZDJy5Iyj36", // Replace with your Razorpay Test Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Nirman",
        description: "Test Transaction",
        order_id: order.id, // Razorpay order ID
        handler: async (response: any) => {
          console.log("Razorpay Payment Response:", response);

          // Step 3: Verify payment with backend
          const verifyRes = await fetch(
            `https://v0ck2c87-5000.inc1.devtunnels.ms/api/payments/${transactionId}/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Pass auth token
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.message === "Payment verified and transaction updated successfully") {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9876543210",
        },
        theme: { color: "#3399cc" },
      };

      // Open Razorpay Checkout
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during payment initiation:", error.message);
      } else {
        console.error("Error during payment initiation:", error);
      }
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <Button className="bg-zinc-800 text-green-500" onClick={initiatePayment}>
      Pay ₹{amount}
    </Button>
  );
};

export default PaymentButton;
