import {createSlice} from "@reduxjs/toolkit";
import {
    addToCartUtil,
    decrementProductQtyUtil,
    deleteCartItemUtil,
    incrementProductQtyUtil
} from "./cart.slice.util.js";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";

export const cartFeatureKey = 'cart';

export const CART_STORAGE_KEY = 'sidsfarm_cart_items';

/**
 * Hydrate the cart items from localStorage so the cart survives a page
 * refresh. Items added to the cart only live in redux until checkout, so
 * without this the cart would appear empty after every reload.
 */
const loadCartItemsFromStorage = () => {
    try {
        const persisted = localStorage.getItem(CART_STORAGE_KEY);
        const parsed = persisted ? JSON.parse(persisted) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
};

const initialState = {
    cart: {},
    cartItems: loadCartItemsFromStorage(),
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
         * Empty the cart completely (e.g. after an order is placed). The store
         * subscriber persists this empty state to localStorage automatically.
         */
        clearCart: (state) => {
            state.cartItems = [];
            state.cart = {};
            state.tax = 0;
            state.total = 0;
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
                    // The server has no saved cart (user hasn't checked out).
                    // Keep whatever is in local state (e.g. items added this
                    // session and persisted to localStorage) instead of wiping it.
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