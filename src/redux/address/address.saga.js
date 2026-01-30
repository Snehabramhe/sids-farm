import {takeLatest, call, put} from "redux-saga/effects";
import {addressActions} from "./address.slice.js";
import {AxiosUtil} from "../../util/AxioUtil.js";
import {UserService} from "../../services/user.service.js";
import {userActions} from "../user/user.slice.js";
import {AddressService} from "../../services/address.service.js";

function* createAddressAction(action) {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(AddressService.createAddress, action.payload.address);
            if (response.status === 201) {
                yield put(addressActions.createAddressSuccess(response.data)); // call slice for success
            }
        }
    } catch (error) {
        yield put(addressActions.createAddressFailure(error.response.data)); // call slice for failure
    }
}

function* updateAddressAction(action) {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(AddressService.updateAddress, action.payload.address, action.payload.addressId);
            if (response.status === 200) {
                yield put(addressActions.updateAddressSuccess(response.data)); // call slice for success
            }
        }
    } catch (error) {
        yield put(addressActions.updateAddressFailure(error.response.data)); // call slice for failure
    }
}

function* getAddressAction() {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(AddressService.getAddressInfo);
            if (response.status === 200) {
                yield put(addressActions.getAddressSuccess(response.data)); // call slice for success
            }
        }
    } catch (error) {
        yield put(addressActions.getAddressFailure(error.response.data)); // call slice for failure
    }
}

function* deleteAddressAction(action) {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(AddressService.deleteAddress, action.payload.addressId);
            if (response.status === 200) {
                yield put(addressActions.deleteAddressSuccess(response.data)); // call slice for success
            }
        }
    } catch (error) {
        yield put(addressActions.deleteAddressFailure(error.response.data)); // call slice for failure
    }
}

export default function* addAddressSaga() {
    yield takeLatest(addressActions.createAddress, createAddressAction)
    yield takeLatest(addressActions.updateAddress, updateAddressAction)
    yield takeLatest(addressActions.getAddress, getAddressAction)
    yield takeLatest(addressActions.deleteAddress, deleteAddressAction)
}