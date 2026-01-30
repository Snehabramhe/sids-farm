import axios from "axios";

export class ProductService {
    static url = "http://localhost:9000/api/products";

    static getAllProducts() {
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