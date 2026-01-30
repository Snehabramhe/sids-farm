import {createSlice} from "@reduxjs/toolkit";
import {
    addToCartUtil,
    decrementProductQtyUtil,
    deleteCartItemUtil,
    incrementProductQtyUtil
} from "./cart.slice.util.js";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";

export const cartFeatureKey = 'cart';

const initialState = {
    cart: {},
    cartItems: [],
    loading: false,
    error: null,
    tax: 0,
    total: 0,
    isCartCreationSuccess: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        /**
         * add to cart
         */
        addToCart: (state, action) => {
            state.cartItems = addToCartUtil(state, action);
        },
        incrementProductQty: (state, action) => {
            state.cartItems = incrementProductQtyUtil(state, action)
        },
        decrementProductQty: (state, action) => {
            state.cartItems = decrementProductQtyUtil(state, action)
        },
        deleteCartItem: (state, action) => {
            state.cartItems = deleteCartItemUtil(state, action);
            ToastMessageUtil.showToastMessageInfo('Item deleted from the Cart!');
        },
        /**
         * Create Cart
         */
        createCart: (state, action) => {
            state.loading = true;
            state.isCartCreationSuccess = false;
        },
        resetCreateCart: (state, action) => {
            state.isCartCreationSuccess = false;
        },
        createCartSuccess: (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            state.cartItems = action.payload?.cart?.products;
            state.tax = action.payload?.cart?.tax;
            state.total = action.payload?.cart?.total;
            state.isCartCreationSuccess = true;
        },
        createCartFailure: (state, action) => {
            state.loading = false;
            state.cart = {};
            state.cartItems = [];
            state.isCartCreationSuccess = false;
            state.error = action.payload;
            state.tax = 0;
            state.total = 0;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
        },
        /**
         * get cart Items
         */
        getCartInfo: (state, action) => {
            state.loading = true;
        },
        getCartInfoSuccess: (state, action) => {
            state.loading = false;
            if (action.payload?.cart) {
                if (Object.keys(action.payload?.cart).length === 0) {
                    state.cartItems = [];
                    state.tax = 0;
                    state.total = 0;
                    state.cart = {};
                } else {
                    state.cartItems = action.payload?.cart?.products;
                    state.tax = action.payload?.cart?.tax;
                    state.total = action.payload?.cart?.total;
                    state.cart = action.payload?.cart;
                }
            }
        },
        getCartInfoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.tax = 0;
            state.total = 0;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
        },
    }
});

export const selectCartCreationSuccess = state => state[cartFeatureKey].isCartCreationSuccess;
export const selectCartCount = state => state[cartFeatureKey].cartItems?.length ? state[cartFeatureKey].cartItems?.length : 0;

export const cartActions = cartSlice.actions;
export default cartSlice;