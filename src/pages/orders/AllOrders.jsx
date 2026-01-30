import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar.jsx";
import {orderActions, orderFeatureKey, selectOrderStatusUpdated} from "../../redux/order/order.slice.js";
import {useDispatch, useSelector} from "react-redux";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";
import {selectIsAdminUser} from "../../redux/user/user.slice.js";
import {ordersArray} from "../../constants/constants.js";
import {ClassUtil} from "../../util/ClassUtil.js";

const AllOrders = () => {
    const dispatch = useDispatch();
    const [orderSelect, setOrderSelect] = useState("");

    // get orders from redux
    const isOrderUpdated = useSelector(selectOrderStatusUpdated);
    const {loading, error, orders} = useSelector(state => state[orderFeatureKey]);
    const isAdminUser = useSelector(selectIsAdminUser);

    useEffect(() => {
        dispatch(orderActions.getAllOrders());
    }, []);

    useEffect(() => {
        dispatch(orderActions.getAllOrders());
    }, [isOrderUpdated]);

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>
    }

    if (!loading && !error && !isAdminUser) {
        return (
            <>
                <Navbar/>
                <div className="flex justify-center text-center items-center m-5">

                    <div>
                        <p className="text-red-600 text-xl">You are not authorized to access this page.</p>
                        <pre>Please contact the Admin Support</pre>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
                                onClick={() => navigate("/home")}>Back to Home
                        </button>
                    </div>
                </div>
            </>
        )
    }

    const clickUpdateOrder = (orderId) => {
        if (orderId && orderSelect) {
            dispatch(orderActions.updateOrderStatus({
                orderStatus: {
                    orderStatus: orderSelect
                },
                orderId: orderId
            }))
        }
    }


    return (
        <>
            <Navbar/>
            <div className="bg-gray-100 font-sans">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Products</th>
                                <th className="py-3 px-6 text-right">Grand Total</th>
                                <th className="py-3 px-6 text-center">Order Status</th>
                                <th className="py-3 px-6 text-center">Placed Date</th>
                                <th className="py-3 px-6 text-center">Ordered By</th>
                                <th className="py-3 px-6 text-center">Ordered Status</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm font-light">

                            {
                                orders && orders.map(order => {
                                    return (
                                        <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <span
                                                    className="font-medium">{order._id?.substring(order._id.length - 7)}</span>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {
                                                    order?.products?.map(product => {
                                                        return (
                                                            <div className="flex items-center space-x-4">
                                                                <img src={product.imageUrl} alt="Product Image"
                                                                     className="w-20 h-20 object-cover rounded-lg"/>
                                                                <div>
                                                                    <h3 className="text-lg font-semibold">{product.productName}</h3>
                                                                    <p className="text-sm text-gray-500">Price: {product.price}</p>
                                                                    <p className="text-sm text-gray-500">Count: {product.count}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td className="py-3 px-6 text-right font-bold">
                                                {order?.total + order?.tax}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                 <span
                                                     className={`${ClassUtil.showColorClass(order?.orderStatus)} text-xs font-medium px-2 py-1 rounded-full`}>
                                    {order.orderStatus}
                                  </span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {order?.orderBy?.username}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="">
                                                    <select
                                                        onChange={(e) => setOrderSelect(e.target.value)}
                                                        id="order-status"
                                                        name="order-status"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                                    >
                                                        {
                                                            ordersArray().map(item => {
                                                                return (
                                                                    <option value={item.value}
                                                                            key={item.key}>{item.value}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <button onClick={() => clickUpdateOrder(order?._id)}
                                                        className="bg-green-500 text-white text-xs px-4 py-2 rounded hover:bg-green-700">
                                                    Update Order
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AllOrders;