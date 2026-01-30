import axios from "axios";

export class CartService {
    static url = "http://localhost:9000/api/carts";

    static createCart(cart) {
        return axios.post(`${CartService.url}/create`, cart);
    }

    static getCartInfo() {
        return axios.get(`${CartService.url}/info`);
    }
}