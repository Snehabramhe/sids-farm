import {combineReducers} from "@reduxjs/toolkit";
import productSlice, {productFeatureKey} from "./product/product.slice.js";
import userSlice, {userFeatureKey} from "./user/user.slice.js";
import cartSlice, {cartFeatureKey} from "./cart/cart.slice.js";
import addressSlice, {addressFeatureKey} from "./address/address.slice.js";
import orderSlice, {orderFeatureKey} from "./order/order.slice.js";
import paymentSlice, {paymentFeatureKey} from "./payment/payment.slice.js";


const rootReducer = combineReducers({
    [productFeatureKey]: productSlice.reducer,
    [userFeatureKey]: userSlice.reducer,
    [cartFeatureKey]: cartSlice.reducer,
    [addressFeatureKey]: addressSlice.reducer,
    [orderFeatureKey]: orderSlice.reducer,
    [paymentFeatureKey]: paymentSlice.reducer,
})
export default rootReducer;