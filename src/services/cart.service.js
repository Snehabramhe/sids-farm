import axios from "axios";
import {API_BASE_URL} from "../config.js";

export class CartService {
    static url = `${API_BASE_URL}/api/carts`;

    static createCart(cart) {
        return axios.post(`${CartService.url}/create`, cart);
    }

    static getCartInfo() {
        return axios.get(`${CartService.url}/info`);
    }
}