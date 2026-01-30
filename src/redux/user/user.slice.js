import {createSlice} from "@reduxjs/toolkit";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";
import {TokenUtil} from "../../util/TokenUtil.js";

export const userFeatureKey = "user";

const initialState = {
    loading: true,
    error: null,
    user: null,
    isAuthenticated: false,
    token: null,
    isRegistrationSuccess: false,
    isLoginSuccess: false,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        /**
         * Register User
         */
        registerUser: (state, action) => {
            state.loading = true;
            state.isRegistrationSuccess = false;
        },
        registerUserSuccess: (state, action) => {
            state.loading = false;
            state.isRegistrationSuccess = true;
            ToastMessageUtil.showToastMessageSuccess(action.payload.msg);
        },
        registerUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isRegistrationSuccess = false;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
        },
        resetRegisterUser: (state, action) => {
            state.isRegistrationSuccess = false;
        },
        /**
         * Login User
         */
        loginUser: (state, action) => {
            state.loading = true;
            state.isLoginSuccess = false;
        },
        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            ToastMessageUtil.showToastMessageSuccess(action.payload.msg);
            TokenUtil.saveTokenToSession(action.payload.token);
            state.isLoginSuccess = true;
        },
        loginUserFailure: (state, action) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = action.payload;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
            TokenUtil.removeTokenFromSession();
            state.isLoginSuccess = false;
        },
        signOutUser: (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            ToastMessageUtil.showToastMessageInfo("SignOut is Success");
            TokenUtil.removeTokenFromSession();
            state.isLoginSuccess = false;
        },
        resetLoginUser: (state, action) => {
            state.isLoginSuccess = false;
        },
        /**
         * get User Info
         */
        getUserInfo: (state, action) => {
            state.loading = true;
        },
        getUserInfoSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        getUserInfoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const selectIsAdminUser = state => state[userFeatureKey].user?.isAdmin;
export const selectRegisterUserSuccess = state => state[userFeatureKey].isRegistrationSuccess;
export const selectLoginUserSuccess = state => state[userFeatureKey].isLoginSuccess;

export const userActions = userSlice.actions;
export default userSlice;