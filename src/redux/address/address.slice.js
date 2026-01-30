import {createSlice} from "@reduxjs/toolkit";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";

export const addressFeatureKey = "address";

const initialState = {
    loading: false,
    error: null,
    address: null,
    isCreateAddressSuccess: false,
    isUpdateAddressSuccess: false,
    isDeleteAddressSuccess: false,
}

const addressSlice = createSlice({
    name: "address",
    initialState: initialState,
    reducers: {
        /**
         * create Address
         */
        createAddress: (state, action) => {
            state.loading = true;
            state.isCreateAddressSuccess = false;
        },
        resetCreateAddress: (state, action) => {
            state.isCreateAddressSuccess = false;
        },
        createAddressSuccess: (state, action) => {
            state.loading = false;
            state.isCreateAddressSuccess = true;
            state.address = action.payload.address;
            ToastMessageUtil.showToastMessageSuccess(action.payload.msg);
        },
        createAddressFailure: (state, action) => {
            state.loading = false;
            state.isCreateAddressSuccess = false;
            state.address = null;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
        },
        /**
         * Update Address
         */
        updateAddress: (state, action) => {
            state.loading = true;
            state.isUpdateAddressSuccess = false;
        },
        resetUpdateAddress: (state, action) => {
            state.isUpdateAddressSuccess = false;
        },
        updateAddressSuccess: (state, action) => {
            state.loading = false;
            state.isUpdateAddressSuccess = true;
            state.address = action.payload.address;
            ToastMessageUtil.showToastMessageSuccess(action.payload.msg);
        },
        updateAddressFailure: (state, action) => {
            state.loading = false;
            state.isUpdateAddressSuccess = false;
            state.address = null;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
        },
        /**
         * Get Address
         */
        getAddress: (state, action) => {
            state.loading = true;
        },
        getAddressSuccess: (state, action) => {
            state.loading = false;
            state.address = action.payload;
        },
        getAddressFailure: (state, action) => {
            state.loading = false;
            state.address = null;
        },
        /**
         * Get Address
         */
        deleteAddress: (state, action) => {
            state.loading = true;
            state.isDeleteAddressSuccess = false;
        },
        deleteAddressSuccess: (state, action) => {
            state.loading = false;
            state.isDeleteAddressSuccess = false;
            state.address = null;
            ToastMessageUtil.showToastMessageInfo(action.payload.msg);
        },
        deleteAddressFailure: (state, action) => {
            state.loading = false;
            ToastMessageUtil.showToastMessageError(action.payload.msg);
        }
    }
});

export const selectIsCreateAddressSuccess = state => state[addressFeatureKey].isCreateAddressSuccess;
export const selectIsUpdateAddressSuccess = state => state[addressFeatureKey].isUpdateAddressSuccess;
export const selectIsDeleteAddressSuccess = state => state[addressFeatureKey].isDeleteAddressSuccess;

export const addressActions = addressSlice.actions;
export default addressSlice;
