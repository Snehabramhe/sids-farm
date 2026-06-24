import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./root.reducer.js";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root.saga.js";
import {cartFeatureKey, CART_STORAGE_KEY} from "./cart/cart.slice.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, logger)
});
sagaMiddleware.run(rootSaga);

/**
 * Persist cart items to localStorage on every change so the cart survives a
 * page refresh (the cart is client-side only until the user checks out).
 */
let lastPersistedCartItems;
store.subscribe(() => {
    const cartItems = store.getState()[cartFeatureKey].cartItems;
    if (cartItems !== lastPersistedCartItems) {
        lastPersistedCartItems = cartItems;
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (e) {
            // storage unavailable (e.g. private mode) — ignore
        }
    }
});

export default store;