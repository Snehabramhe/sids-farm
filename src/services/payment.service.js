import axios from "axios";
import {API_BASE_URL} from "../config.js";

export class PaymentService {
    static url = `${API_BASE_URL}/api/payments`;

    static createPayment(moneyObj) {
        return axios.post(`${PaymentService.url}/make-payment`, moneyObj);
    }
}

