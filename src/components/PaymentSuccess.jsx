import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {orderActions, orderFeatureKey, selectOrderPlaced} from "../redux/order/order.slice.js";
import {PAYMENT_OPTIONS} from "../constants/constants.js";
import {Link} from "react-router-dom";
import Navbar from "./navbar.jsx";
import {paymentActions} from "../redux/payment/payment.slice.js";

const orderInfo = JSON.parse(localStorage.getItem('order'));
const PaymentSuccess = (props) => {
    const dispatch = useDispatch();

    const {order} = useSelector(state => state[orderFeatureKey]);
    const isOrderPlaced = useSelector(selectOrderPlaced);

    useEffect(() => {
        if (orderInfo) {
            dispatch(orderActions.placeOrder({
                order: {
                    ...orderInfo,
                    paymentOption: PAYMENT_OPTIONS.ONLINE_PAYMENT
                }
            }));
        }
    }, [orderInfo]);

    useEffect(() => {
        if (isOrderPlaced) {
            dispatch(paymentActions.resetClientSecret());
            dispatch(orderActions.resetPlaceOrder());
            localStorage.removeItem('order');
        }
    }, [isOrderPlaced]);

    if (!orderInfo) {
        return (
            <>
                <Navbar/>
                <div className="flex justify-center text-center items-center m-5">

                    <div>
                        <p className="text-red-600 text-xl">You are not authorized to access this page.</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
                                onClick={() => navigate("/home")}>Back to Home
                        </button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar/>
            {
                <div className="bg-gray-100 flex items-center justify-center h-screen">
                    <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
                        <div
                            className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800 mt-4">Payment Successful!</h1>
                        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been
                            confirmed.</p>

                        {
                            order && <div className="mt-6 border-t pt-4 text-gray-700">
                                <p><strong>Order ID:</strong> {order?._id}</p>
                            </div>
                        }

                        <div className="mt-6 flex justify-center space-x-4">
                            <Link to="/home" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go
                                to
                                Home</Link>
                            <Link to="/orders/me"
                                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">View
                                Orders</Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default PaymentSuccess;