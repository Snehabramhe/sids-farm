import React, {useEffect} from 'react';
import Navbar from "../../components/navbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {cartActions, cartFeatureKey, selectCartCreationSuccess} from "../../redux/cart/cart.slice.js";
import {Link, useNavigate} from "react-router-dom";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";

const CartPage = () => {
    const TAX_AMOUNT = 12;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    /**
     * read the cart items from the store
     */
    const {loading, error, cartItems} = useSelector(state => state[cartFeatureKey]);
    const isCartCreationSuccess = useSelector(selectCartCreationSuccess)

    useEffect(() => {
        if (cartItems.length === 0) {
            dispatch(cartActions.getCartInfo());
        }
    }, [cartItems])

    const calculateSubTotal = () => {
        let total = 0;
        for (let item of cartItems) {
            total += (item.price * item.count)
        }
        return total;
    }

    const calculateTax = () => {
        return calculateSubTotal() * TAX_AMOUNT / 100;
    }

    const calculateTotal = () => {
        return (calculateSubTotal() + calculateTax());
    }


    const clickIncrementQty = (productId) => {
        dispatch(cartActions.incrementProductQty({
            _id: productId,
        }))
    };

    const clickDecrementQty = (productId) => {
        dispatch(cartActions.decrementProductQty({
            _id: productId,
        }))
    };

    const clickDeleteItem = (productId) => {
        dispatch(cartActions.deleteCartItem({
            _id: productId,
        }))
    };

    const clickCheckout = () => {
        dispatch(cartActions.createCart({
            cart: {
                products: cartItems,
                tax: calculateTax(),
                total: calculateSubTotal()
            }
        }))
    };

    useEffect(() => {
        if (isCartCreationSuccess) {
            navigate('/carts/checkout');
        }
        return () => {
            if (isCartCreationSuccess) {
                dispatch(cartActions.resetCreateCart());
            }
        }
    }, [isCartCreationSuccess]);

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>
    }

    return (
        <>
            <Navbar/>
            <div className="container mx-auto py-5">
                {
                    cartItems.length === 0 ?
                        <div className="flex justify-center text-center items-center m-5">
                            <div>
                                <p className="text-red-600 text-xl">You don't any items in the cart!</p>
                                <pre>Kindly add some products to the cart</pre>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
                                        onClick={() => navigate("/products/show-product")}>Add Products
                                </button>
                            </div>
                        </div> : <div>
                            <h1 className="text-3xl font-bold mb-6 m-5 text-green-500">Your Cart</h1>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                                    <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

                                    {
                                        cartItems.map(item => {
                                            return (
                                                <div key={item._id}
                                                     className="flex items-center justify-between border-b py-4">
                                                    <div className="flex items-center">
                                                        <img className="w-16 h-16 rounded-md object-cover"
                                                             src={item.imageUrl}
                                                             alt="Product Image"/>
                                                        <div className="ml-4">
                                                            <h3 className="text-lg font-medium">{item.productName}</h3>
                                                            <p className="text-gray-500 text-sm">&#8377; {item.price.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex  items-center space-x-4">
                                                        <div>
                                                            <p className="text-lg font-semibold"> &#8377; {(item.price * item.count).toFixed(2)}</p>
                                                        </div>
                                                        <div className="flex items-center border rounded-md px-2">

                                                            <button onClick={() => clickDecrementQty(item._id)}
                                                                    className="text-gray-500 hover:text-black px-2">-
                                                            </button>
                                                            <span className="px-2">{item.count}</span>
                                                            <button onClick={() => clickIncrementQty(item._id)}
                                                                    className="text-gray-500 hover:text-black px-2">+
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => clickDeleteItem(item._id)}
                                                            className="text-red-500 hover:text-red-700">Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                {/* Order Summary */}
                                {
                                    cartItems.length > 0 && <div className="bg-white p-6 rounded-lg shadow">
                                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <p className="text-gray-500">Subtotal</p>
                                                <p>&#8377; {calculateSubTotal().toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-gray-500">Tax</p>
                                                <p>&#8377; {calculateTax().toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between border-t pt-4">
                                                <p className="font-semibold">Total</p>
                                                <p className="font-semibold">&#8377; {calculateTotal().toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <button onClick={clickCheckout}
                                                className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 hover:bg-blue-600">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                }

                            </div>
                        </div>
                }
            </div>
        </>
    )
}
export default CartPage;