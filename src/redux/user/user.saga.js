import {takeLatest, call, put} from "redux-saga/effects";
import {userActions} from "./user.slice.js";
import {UserService} from "../../services/user.service.js";
import {AxiosUtil} from "../../util/AxioUtil.js";


function* registerUserAction(action) {
    try {
        const response = yield call(UserService.registerUser, action.payload.user); // call the server for register User
        if (response.status === 201) {
            yield put(userActions.registerUserSuccess(response.data)); // call slice for success
        } else {
            yield put(userActions.registerUserFailure(response.data));
        }
    } catch (error) {
        yield put(userActions.registerUserFailure(error.response.data)); // call slice for failure
    }
}

function* loginUserAction(action) {
    try {
        const response = yield call(UserService.loginUser, action.payload.user); // call the server for login User
        if (response.status === 200) {
            yield put(userActions.loginUserSuccess(response.data)); // call slice for success
        }
    } catch (error) {
        yield put(userActions.loginUserFailure(error.response.data)); // call slice for failure
    }
}

/**
 * private url, need to set the token to the header
 * @returns {Generator<*, void, *>}
 */
function* getUserInfoAction() {
    try {
        if (AxiosUtil.setTokenToHeader()) {
            const response = yield call(UserService.getUserInfo); // call the server for get User Info
            if (response.status === 200) {
                yield put(userActions.getUserInfoSuccess(response.data)); // call slice for success
            }
        }
    } catch (error) {
        yield put(userActions.getUserInfoFailure(error.response.data)); // call slice for failure
    }
}

export default function* userSaga() {
    yield takeLatest(userActions.registerUser, registerUserAction);
    yield takeLatest(userActions.loginUser, loginUserAction);
    yield takeLatest(userActions.getUserInfo, getUserInfoAction);
}