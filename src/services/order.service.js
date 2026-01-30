import axios from "axios";

export class OrderService {
    static url = "http://localhost:9000/api/orders";

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