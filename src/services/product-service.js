import axios from "axios";
import {API_BASE_URL} from "../config.js";

export class ProductService {
    static url = `${API_BASE_URL}/api/products`;

    static getAllProducts({page, limit} = {}) {
        // When page is provided the API returns a paginated payload,
        // otherwise it returns the full list (used by the admin screen).
        if (page) {
            return axios.get(`${ProductService.url}`, {params: {page, limit}});
        }
        return axios.get(`${ProductService.url}`);
    }

    static getProduct(productId) {
        return axios.get(`${ProductService.url}/${productId}`);
    }

    static createProduct(product) {
        return axios.post(`${ProductService.url}`, product);
    }

    static updateProduct(product, productId) {
        return axios.put(`${ProductService.url}/${productId}`, product);
    }

    static deleteProduct(productId) {
        return axios.delete(`${ProductService.url}/${productId}`);
    }

}