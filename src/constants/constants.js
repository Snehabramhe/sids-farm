export const PAYMENT_OPTIONS = {
    COD: "Cash on Delivery",
    ONLINE_PAYMENT: "Online Payment"
};

export const ORDER_STATUS = {
    ORDER_PLACED: "Order Placed",
    PACKING: "Packing",
    DISPATCHED: "Dispatched",
    SHIPPING: "In Shipping",
    DELIVERED: "Delivered",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled"
}

export const CANCELLABLE_STATES = [ORDER_STATUS.ORDER_PLACED, ORDER_STATUS.PACKING, ORDER_STATUS.DISPATCHED];

export const ordersArray = () => {
    return Object.entries(ORDER_STATUS).map(([key, value]) => ({
        key,
        value
    }));
}