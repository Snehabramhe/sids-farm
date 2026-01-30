import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentsForm from "./PaymentsForm.jsx";
import {useSelector} from "react-redux";
import {selectClientSecret} from "../redux/payment/payment.slice.js";

const stripePromise = loadStripe('pk_test_51SvESd4FKiRkbbviDXiofloZNjFFpQycP14zZv0yHNeWSVMcCjYRThG6jrQmeM6l0ecCBPy4njJFVr3cdbVKO6rG00UdFFbuqF');

const PaymentsModal = ({isOpen, setOpen}) => {
    const clientSecretCode = useSelector(selectClientSecret);

    console.log(clientSecretCode);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                {
                    clientSecretCode &&
                    <div className="flex items-center justify-between w-full">
                        <Elements stripe={stripePromise} options={{clientSecret: clientSecretCode}}>
                            <PaymentsForm clientSecret={clientSecretCode}/>
                        </Elements>
                    </div>

                }
            </div>
        </div>
    );
};

export default PaymentsModal;