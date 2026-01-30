import {takeLatest, call, put} from "redux-saga/effects";
import {cartActions} from "./cart.slice.js";
import {CartService} from "../../services/cart.service.js";
import {AxiosUtil} from "../../util/AxioUtil.js";


function* createCartAction(action) {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(CartService.createCart, action.payload.cart); // call the server cart creation
            if (response.status === 201) {
                yield put(cartActions.createCartSuccess(response.data)); // call slice for success
            } else {
                yield put(cartActions.createCartFailure(response.data));
            }
        }
    } catch (error) {
        yield put(cartActions.createCartFailure(error.response.data)); // call slice for failure
    }
}

function* getCartInfoAction() {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(CartService.getCartInfo); // call the server get cart info
            if (response.status === 200) {
                yield put(cartActions.getCartInfoSuccess(response.data)); // call slice for success
            } else {
                yield put(cartActions.getCartInfoFailure(response.data));
            }
        }
    } catch (error) {
        yield put(cartActions.getCartInfoFailure(error.response.data)); // call slice for failure
    }
}

export default function* cartSaga() {
    yield takeLatest(cartActions.createCart, createCartAction)
    yield takeLatest(cartActions.getCartInfo, getCartInfoAction)
}