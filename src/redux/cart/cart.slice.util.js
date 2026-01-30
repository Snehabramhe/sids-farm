import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";

export const addToCartUtil = (state, action) => {
    const {product} = action.payload;
    // check if the product is existing in the cart
    const isExists = state.cartItems.find(item => item._id === product._id);
    if (isExists) {
        ToastMessageUtil.showToastMessageWarning('Item is already in cart!');
        return state.cartItems;
    }

    // add to cart
    state.cartItems = [...state.cartItems, product];
    ToastMessageUtil.showToastMessageSuccess('Item is added to cart!');
    return state.cartItems;
}

export const incrementProductQtyUtil = (state, action) => {
    const {_id} = action.payload;
    return state.cartItems.map(item => {
        if (item._id === _id) {
            return {
                ...item,
                count: item.count + 1
            }
        } else {
            return item;
        }
    });
}

export const decrementProductQtyUtil = (state, action) => {
    const {_id} = action.payload;
    return state.cartItems.map(item => {
        if (item._id === _id) {
            return {
                ...item,
                count: item.count - 1 > 0 ? item.count - 1 : 1,
            }
        } else {
            return item;
        }
    });
}

export const deleteCartItemUtil = (state, action) => {
    const {_id} = action.payload;
    return state.cartItems.filter(item => item._id !== _id);
}