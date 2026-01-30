import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userFeatureKey} from "../../redux/user/user.slice.js";
import {addressActions, addressFeatureKey} from "../../redux/address/address.slice.js";
import {Link, useNavigate} from "react-router-dom";
import {cartActions, cartFeatureKey} from "../../redux/cart/cart.slice.js";
import {PAYMENT_OPTIONS} from "../../constants/constants.js";
import {orderActions, selectOrderPlaced} from "../../redux/order/order.slice.js";
import ConfirmationOrderModal from "../../components/confirm-order-modal.jsx";

import {paymentActions} from "../../redux/payment/payment.slice.js";
import PaymentsModal from "../../components/PaymentsModal.jsx";

const CheckOutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentOption, setPaymentOption] = useState(PAYMENT_OPTIONS.COD);
    const [open, setOpen] = useState(false);
    const [openPaymentsModal, setOpenPaymentsModel] = useState(false);

    /**
     * get user data from redux
     */
    const isOrderPlaced = useSelector(selectOrderPlaced);
    const {user} = useSelector(state => state[userFeatureKey]);
    const {address} = useSelector(state => state[addressFeatureKey]);
    const {loading, error, cartItems, tax, total, cart} = useSelector(state => state[cartFeatureKey]);


    useEffect(() => {
        dispatch(addressActions.getAddress());
        dispatch(cartActions.getCartInfo())
    }, []);

    const clickAddAddress = () => {
        navigate("/addresses/add?from=checkout");
    };

    const clickEditAddress = (addressId) => {
        navigate(`/addresses/edit/${addressId}?from=checkout`);
    };

    const calculateTotal = () => {
        return (tax + total);
    }

    const getButtonText = () => {
        if (paymentOption === PAYMENT_OPTIONS.COD) {
            return "Place an Order"
        } else {
            return "Make Payment"
        }
    }

    const clickPlaceOrder = () => {
        if (paymentOption === PAYMENT_OPTIONS.COD) {
            if (!address) {
                setOpen(true);
            }
            if (address && Object.keys(address).length > 0) {
                if (cart && cart._id) {
                    dispatch(orderActions.placeOrder({
                        order: {
                            products: cartItems,
                            tax: tax,
                            total: total,
                            paymentOption: paymentOption
                        }
                    }));
                }
            }
        }
        if (paymentOption === PAYMENT_OPTIONS.ONLINE_PAYMENT) {
            localStorage.setItem('order', JSON.stringify({
                products: cartItems,
                tax: tax,
                total: total,
            }));
            setOpenPaymentsModel(true);
            const moneyObj = {
                amount: (tax + total) * 100, // 100 paisa = 1 rupee
                currency: 'inr'
            }
            dispatch(paymentActions.makePayment({
                moneyObj: moneyObj
            }));
        }
    };

    useEffect(() => {
        if (isOrderPlaced) {
            dispatch(cartActions.getCartInfo());
            navigate('/orders/me');
        }
        return () => {
            dispatch(orderActions.resetPlaceOrder());
        }
    }, [isOrderPlaced])


    return (
        <>
            <Navbar/>
            {
                open && <ConfirmationOrderModal isOpen={open} setOpen={setOpen} onConfirm={clickAddAddress}/>
            }
            {
                openPaymentsModal &&
                <PaymentsModal isOpen={openPaymentsModal} setOpen={setOpenPaymentsModel}/>
            }
            <div className="container mx-auto px-4 mt-3">
                <h1 className="text-3xl font-bold mb-6 m-5 text-green-500">Checkout Page</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Cart Items</h2>
                        {
                            cartItems.length === 0 && <div className="flex justify-center items-center">
                                <p className="text-red-700 text-xl">Your Cart is empty, Please add some Items
                                    <Link className="text-blue-500 underline ml-2" to={'/products/show-product'}>here</Link>
                                </p>
                            </div>
                        }
                        <div className="space-y-4">
                            {
                                cartItems.map(item => {
                                    return (
                                        <div key={item._id} className="flex items-center justify-between border-b pb-4">
                                            <div className="flex items-center space-x-4">
                                                <img src={item.imageUrl} alt="Product Image"
                                                     className="w-20 h-20 object-cover rounded-lg"/>
                                                <div>
                                                    <h3 className="text-lg font-semibold">{item.productName}</h3>
                                                    <p className="text-sm text-gray-500">Price
                                                        : &#8377; {item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold"> &#8377; {(item.price * item.count).toFixed(2)}</p>
                                                <p className="text-sm text-gray-500">Count: {item.count}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Summary and Shipping Section */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <p>Subtotal</p>
                                <p>&#8377; {total.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p>Shipping Tax</p>
                                <p>&#8377; {tax.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <p>Total</p>
                                <p>&#8377; {(calculateTotal()).toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col space-y-4 mt-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cod"
                                        defaultChecked={true}
                                        onChange={() => setPaymentOption(PAYMENT_OPTIONS.COD)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  cursor-pointer"
                                    />
                                    <span className="text-gray-800">Cash on Delivery (COD)</span>
                                </label>

                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="online_payment"
                                        onChange={() => setPaymentOption(PAYMENT_OPTIONS.ONLINE_PAYMENT)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-gray-800">Online Payment</span>
                                </label>
                            </div>

                            <button onClick={clickPlaceOrder}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700">
                                {getButtonText()}
                            </button>
                        </div>

                        {/* Shipping Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center text-xl font-semibold mb-4 border-b pb-2">
                                <h3>Shipping Address</h3>
                                <div>
                                    {
                                        address ?
                                            <button onClick={() => clickEditAddress(address._id)}
                                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm">Edit
                                            </button> : <button
                                                onClick={clickAddAddress}
                                                className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm mr-2">Add
                                            </button>
                                    }
                                </div>
                            </div>
                            {
                                address && Object.keys(address).length > 0 ?
                                    <div>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Mobile :</span> {address.mobile}
                                        </p>
                                        <p className="text-gray-700">
                                            <span
                                                className="font-medium">Address Line 1:</span> {address.flat}, {address.buildingName}
                                        </p>
                                        <p className="text-gray-700">
                                            <span
                                                className="font-medium">Address Line 2:</span> {address.landmark},{address.area}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">City:</span> {address.city}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">State:</span> {address.state}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Zip Code:</span> {address.zipcode}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Country:</span> {address.country}
                                        </p>
                                    </div> : <div>
                                        <p className="text-red-600 text-lg">No Address Found!</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CheckOutPage;