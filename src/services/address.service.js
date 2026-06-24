import axios from "axios";
import {API_BASE_URL} from "../config.js";

export class AddressService {
    static url = `${API_BASE_URL}/api/addresses`;

    static createAddress(address) {
        return axios.post(`${AddressService.url}/`, address);
    }

    static updateAddress(address, addressId) {
        return axios.put(`${AddressService.url}/${addressId}`, address);
    }

    static deleteAddress(addressId) {
        return axios.delete(`${AddressService.url}/${addressId}`);
    }

    static getAddressInfo() {
        return axios.get(`${AddressService.url}/me`);
    }
}