import {createSlice} from "@reduxjs/toolkit";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";
import {ORDER_STATUS} from "../../constants/constants.js";

export const orderFeatureKey = 'order';

const initialState = {
    loading: false,
    error: null,
    order: {},
    orders: [],
    orderPlaced: false,
    orderUpdated: false,
}

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        /**
         * place an order
         */
        placeOrder: (state, action) => {
            state.loading = true;
            state.orderPlaced = false;
        },
        resetPlaceOrder: (state, action) => {
            state.orderPlaced = false;
        },
        placeOrderSuccess: (state, action) => {
            state.loading = false;
            state.orderPlaced = true;
            if (action.payload.order) {
                ToastMessageUtil.showToastMessageSuccess(`${action.payload.msg} : ${action.payload.order?._id}`);
            }
            state.order = action.payload.order;
        },
        placeOrderFailure: (state, action) => {
            state.loading = false;
            state.orderPlaced = false;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
            state.error = action.payload;
        },
        /**
         * update order status
         */
        updateOrderStatus: (state, action) => {
            state.loading = true;
            state.orderUpdated = false;
        },
        updateOrderStatusSuccess: (state, action) => {
            state.loading = false;
            state.orderUpdated = true;
            if (action.payload.order?.orderStatus) {
                if (action.payload.order?.orderStatus === ORDER_STATUS.CANCELLED) {
                    ToastMessageUtil.showToastMessageInfo('Order cancelled successfully.');
                } else {
                    ToastMessageUtil.showToastMessageSuccess(action.payload.msg);
                }
            }
            state.order = action.payload.order;
        },
        updateOrderStatusFailure: (state, action) => {
            state.loading = false;
            state.orderUpdated = false;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
            state.error = action.payload;
        },
        /**
         * get my Orders
         */
        getMyOrders: (state, action) => {
            state.loading = true;
        },
        getMyOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
        },
        getMyOrdersFailure: (state, action) => {
            state.loading = false;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
            state.error = action.payload;
        },
        /**
         * get All Orders
         */
        getAllOrders: (state, action) => {
            state.loading = true;
        },
        getAllOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
        },
        getAllOrdersFailure: (state, action) => {
            state.loading = false;
            state.orders = [];
            ToastMessageUtil.showToastMessageError(action.payload.msg);
            state.error = action.payload;
        }
    },
});


export const selectOrderPlaced = state => state[orderFeatureKey].orderPlaced;
export const selectOrderStatusUpdated = state => state[orderFeatureKey].orderUpdated;

export const orderActions = orderSlice.actions;
export default orderSlice;

