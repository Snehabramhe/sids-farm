import {takeLatest, call, put} from "redux-saga/effects";
import {productActions, productFeatureKey} from "./product.slice.js";
import {ProductService} from "../../services/product-service.js";


function* getAllProducts() {
    try {
        const response = yield call(ProductService.getAllProducts); // call the server for getting all products
        if (response.status === 200) {
            yield put(productActions.getAllProductsSuccess(response.data)); // call slice for success
        }
    } catch (error) {
        yield put(productActions.getAllProductsFailure(error.response.data)); // call slice for failure
    }
}

function* getProductById(action) {
    try {
        const response = yield call(ProductService.getProduct, action.payload.productId); // call the server for getting all products
        if (response.status === 200) {
            yield put(productActions.getProductByIdSuccess(response.data)); // call slice for success
        }
    } catch (error) {
        yield put(productActions.getProductByIdFailure(error.response.data)); // call slice for failure
    }
}

function* createNewProduct(action) {
    try {
        const response = yield call(ProductService.createProduct, action.payload.product); // call the server for create a product
        if (response.status === 201) {
            yield put(productActions.createNewProductSuccess(response.data)); // call slice for success
        }
    } catch (error) {
        yield put(productActions.createNewProductFailure(error.response.data)); // call slice for failure
    }
}

function* updateProductById(action) {
    try {
        const response = yield call(ProductService.updateProduct, action.payload.product, action.payload.productId); // call the server for update a product
        if (response.status === 200) {
            yield put(productActions.updateProductByIdSuccess(response.data)); // call slice for success
        }
    } catch (error) {
        yield put(productActions.updateProductByIdFailure(error.response.data)); // call slice for failure
    }
}

function* deleteProductById(action) {
    try {
        const response = yield call(ProductService.deleteProduct, action.payload.productId); // call the server for delete a product
        if (response.status === 200) {
            yield put(productActions.deleteProductByIdSuccess(response.data)); // call slice for success
        }
    } catch (error) {
        yield put(productActions.deleteProductByIdFailure(error.response.data)); // call slice for failure
    }
}

export default function* productSaga() {
    yield takeLatest(productActions.getAllProducts, getAllProducts);
    yield takeLatest(productActions.getProductById, getProductById);
    yield takeLatest(productActions.createNewProduct, createNewProduct);
    yield takeLatest(productActions.updateProductById, updateProductById);
    yield takeLatest(productActions.deleteProductById, deleteProductById);
}
