import axios from "axios";

export class PaymentService {
    static url = "http://localhost:9000/api/payments";

    static createPayment(moneyObj) {
        return axios.post(`${PaymentService.url}/make-payment`, moneyObj);
    }
}

