import {takeLatest, call, put} from "redux-saga/effects";
import {orderActions} from "./order.slice.js";
import {AxiosUtil} from "../../util/AxioUtil.js";
import {OrderService} from "../../services/order.service.js";

function* placeOrderAction(action) {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(OrderService.placeAnOrder, action.payload.order);
            if (response.status === 201) {
                yield put(orderActions.placeOrderSuccess(response.data)); // call slice for success
            } else {
                yield put(orderActions.placeOrderFailure(response.data));
            }
        }
    } catch (error) {
        yield put(orderActions.placeOrderFailure(error.response.data)); // call slice for failure
    }
}


function* updateOrderStatusAction(action) {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(OrderService.updateOrderStatus, action.payload.orderStatus, action.payload.orderId);
            if (response.status === 200) {
                yield put(orderActions.updateOrderStatusSuccess(response.data)); // call slice for success
            } else {
                yield put(orderActions.updateOrderStatusFailure(response.data));
            }
        }
    } catch (error) {
        yield put(orderActions.updateOrderStatusFailure(error.response.data)); // call slice for failure
    }
}

function* getMyOrdersAction() {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(OrderService.getMyOrders);
            if (response.status === 200) {
                yield put(orderActions.getMyOrdersSuccess(response.data)); // call slice for success
            } else {
                yield put(orderActions.getMyOrdersFailure(response.data));
            }
        }
    } catch (error) {
        yield put(orderActions.getMyOrdersFailure(error.response.data)); // call slice for failure
    }
}

function* getAllOrdersAction() {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(OrderService.getAllOrders);
            if (response.status === 200) {
                yield put(orderActions.getAllOrdersSuccess(response.data)); // call slice for success
            } else {
                yield put(orderActions.getAllOrdersFailure(response.data));
            }
        }
    } catch (error) {
        yield put(orderActions.getAllOrdersFailure(error.response.data)); // call slice for failure
    }
}

export default function* orderSaga() {
    yield takeLatest(orderActions.placeOrder, placeOrderAction)
    yield takeLatest(orderActions.updateOrderStatus, updateOrderStatusAction)
    yield takeLatest(orderActions.getMyOrders, getMyOrdersAction)
    yield takeLatest(orderActions.getAllOrders, getAllOrdersAction)
}