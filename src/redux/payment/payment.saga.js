import {takeLatest, call, put} from "redux-saga/effects";
import {AxiosUtil} from "../../util/AxioUtil.js";
import {CartService} from "../../services/cart.service.js";
import {cartActions} from "../cart/cart.slice.js";
import {paymentActions} from "./payment.slice.js";
import {PaymentService} from "../../services/payment.service.js";

function* makePaymentAction(action) {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(PaymentService.createPayment, action.payload.moneyObj);
            if (response.status === 200) {
                yield put(paymentActions.makePaymentSuccess(response.data)); // call slice for success
            } else {
                yield put(paymentActions.makePaymentFailure(response.data));
            }
        }
    } catch (error) {
        yield put(paymentActions.makePaymentFailure(error.response.data)); // call slice for failure
    }
}

export default function* paymentSaga() {
    yield takeLatest(paymentActions.makePayment, makePaymentAction)
}