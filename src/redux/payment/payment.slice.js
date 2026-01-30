import {createSlice} from "@reduxjs/toolkit";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";
import {orderFeatureKey} from "../order/order.slice.js";

export const paymentFeatureKey = "payment";

const initialState = {
    loading: false,
    error: null,
    clientSecret: null
}

const paymentSlice = createSlice({
    name: "payment",
    initialState: initialState,
    reducers: {
        makePayment: (state, action) => {
            state.loading = true;
        },
        makePaymentSuccess: (state, action) => {
            state.loading = false;
            state.clientSecret = action.payload.clientSecret;
        },
        resetClientSecret: (state, action) => {
            state.clientSecret = null;
        },
        makePaymentFailure: (state, action) => {
            state.loading = false;
            ToastMessageUtil.showToastMessageError('Payment is Failed');
            state.error = action.payload;
        }
    }
});

export const selectClientSecret = state => state[paymentFeatureKey].clientSecret;

export const paymentActions = paymentSlice.actions;
export default paymentSlice;