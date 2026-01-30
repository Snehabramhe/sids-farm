import React, {useState} from "react";
import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {ToastMessageUtil} from "../util/ToastMessageUtil.js";

const stripePromise = loadStripe("pk_test_51SvESd4FKiRkbbviDXiofloZNjFFpQycP14zZv0yHNeWSVMcCjYRThG6jrQmeM6l0ecCBPy4njJFVr3cdbVKO6rG00UdFFbuqF");

const PaymentsForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setIsLoading(true);

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {return_url: "http://localhost:5173/payments/payment-success"},
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment successful!");
            ToastMessageUtil.showToastMessageSuccess("Payment successful!");
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="p-4 border rounded-md">
                <PaymentElement/>
                <button type="submit" disabled={!stripe || isLoading}
                        className="bg-blue-500 px-4 py-2 rounded-lg text-white mt-3">
                    {isLoading ? "Processing..." : "Pay Now"}
                </button>
                {message && <p className="text-red-500 mt-2">{message}</p>}
            </form>
        </div>
    );
};
export default PaymentsForm;