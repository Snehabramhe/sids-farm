import {createSlice} from "@reduxjs/toolkit";

export const productFeatureKey = "product";

const initialState = {
    loading: false,
    products: [],
    error: null,
    product: {},
    createProductSuccess: false,
    updateProductSuccess: false,
    deleteProductSuccess: false,
    getProductSuccess: false,
}

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {

        /**
         * Get all products from server
         * @param state
         * @param action
         */
        getAllProducts: (state, action) => {
            state.loading = true;
        },
        getAllProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        getAllProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        /**
         * Get Product By id
         * @param state
         * @param action
         */
        getProductById: (state, action) => {
            state.loading = true;
            state.getProductSuccess = false;
        },
        getProductByIdSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.getProductSuccess = true;
        },
        getProductByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.getProductSuccess = false;
        },

        /**
         * Create a new product
         * @param state
         * @param action
         */
        createNewProduct: (state, action) => {
            state.loading = true;
            state.createProductSuccess = false;
        },
        resetCreateProductSuccess: (state, action) => {
            state.loading = true;
            state.createProductSuccess = false;
        },
        createNewProductSuccess: (state, action) => {
            state.loading = false;
            state.createProductSuccess = true;
        },
        createNewProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.createProductSuccess = false;
        },
        /**
         * update the product
         * @param state
         * @param action
         */
        updateProductById: (state, action) => {
            state.loading = true;
            state.updateProductSuccess = false;
        },
        resetUpdateProductSuccess: (state, action) => {
            state.loading = true;
            state.updateProductSuccess = false;
        },
        updateProductByIdSuccess: (state, action) => {
            state.loading = false;
            state.updateProductSuccess = true;
        },
        updateProductByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.updateProductSuccess = false;
        },
        /**
         * delete the product
         * @param state
         * @param action
         */
        deleteProductById: (state, action) => {
            state.loading = true;
            state.deleteProductSuccess = false;
        },
        resetDeleteProductByIdSuccess: (state, action) => {
            state.loading = true;
            state.deleteProductSuccess = false;
        },
        deleteProductByIdSuccess: (state, action) => {
            state.loading = false;
            state.deleteProductSuccess = true;
        },
        deleteProductByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.deleteProductSuccess = false;
        },
    }
});


export const selectUpdateProductSuccess = state => state[productFeatureKey].updateProductSuccess;
export const selectDeleteProductSuccess = state => state[productFeatureKey].deleteProductSuccess;
export const selectGetProductSuccess = state => state[productFeatureKey].getProductSuccess;

export const productActions = productSlice.actions;
export default productSlice;

