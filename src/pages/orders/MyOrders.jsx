import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar.jsx";
import {orderActions, orderFeatureKey, selectOrderStatusUpdated} from "../../redux/order/order.slice.js";
import {useDispatch, useSelector} from "react-redux";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";
import {ClassUtil} from "../../util/ClassUtil.js";
import {CANCELLABLE_STATES, ORDER_STATUS} from "../../constants/constants.js";
import ConfirmationCancelModal from "../../components/confirm-cancel-modal.jsx";

const MyOrders = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [orderIdToCancel, setOrderIdToCancel] = useState(false);


    // get orders from redux
    const isOrderUpdated = useSelector(selectOrderStatusUpdated);
    const {loading, error, orders} = useSelector(state => state[orderFeatureKey]);

    useEffect(() => {
        dispatch(orderActions.getMyOrders());
    }, []);

    useEffect(() => {
        dispatch(orderActions.getMyOrders());
    }, [isOrderUpdated]);

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>
    }

    const isCancel = (orderStatus) => {
        return CANCELLABLE_STATES.includes(orderStatus);
    };

    const clickCancelOrder = (orderId) => {
        setOrderIdToCancel(orderId);
        setOpen(true);
    };

    const clickConfirmCancelOrder = () => {
        setOpen(false);
        if (orderIdToCancel) {
            dispatch(orderActions.updateOrderStatus({
                orderStatus: {
                    orderStatus: ORDER_STATUS.CANCELLED,
                },
                orderId: orderIdToCancel
            }))
        }
    };

    return (
        <>
            <Navbar/>
            {
                open && <ConfirmationCancelModal isOpen={open} setOpen={setOpen} onConfirm={clickConfirmCancelOrder}/>
            }
            <div className="bg-gray-100 font-sans">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Products</th>
                                <th className="py-3 px-6 text-right">Total</th>
                                <th className="py-3 px-6 text-right">Tax</th>
                                <th className="py-3 px-6 text-right">Grand Total</th>
                                <th className="py-3 px-6 text-center">Order Status</th>
                                <th className="py-3 px-6 text-center">Placed Date</th>
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
                                                            <div key={product._id} className="flex items-center space-x-4">
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
                                            <td className="py-3 px-6 text-right">
                                                {order?.total}
                                            </td>
                                            <td className="py-3 px-6 text-right">
                                                {order?.tax}
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
                                                <button
                                                    onClick={() => clickCancelOrder(order._id)}
                                                    className="bg-red-500 text-white text-xs px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
                                                    disabled={!isCancel(order.orderStatus)}>
                                                    Cancel Order
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
export default MyOrders;