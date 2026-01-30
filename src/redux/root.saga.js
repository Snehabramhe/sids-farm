import {all} from "redux-saga/effects";
import productSaga from "./product/product.saga.js";
import userSaga from "./user/user.saga.js";
import cartSaga from "./cart/cart.saga.js";
import addressSaga from "./address/address.saga.js";
import orderSaga from "./order/order.saga.js";
import paymentSaga from "./payment/payment.saga.js";

export default function* rootSaga() {
    yield all([
        productSaga(),
        userSaga(),
        cartSaga(),
        addressSaga(),
        orderSaga(),
        paymentSaga()
    ]);
}