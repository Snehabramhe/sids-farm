import axios from "axios";
import {API_BASE_URL} from "../config.js";

export class OrderService {
    static url = `${API_BASE_URL}/api/orders`;

    static placeAnOrder(order) {
        return axios.post(`${OrderService.url}/place`, order);
    }

    static updateOrderStatus(orderStatus, orderId) {
        return axios.put(`${OrderService.url}/${orderId}`, orderStatus);
    }

    static getMyOrders() {
        return axios.get(`${OrderService.url}/me`);
    }

    static getAllOrders() {
        return axios.get(`${OrderService.url}/all`);
    }
}