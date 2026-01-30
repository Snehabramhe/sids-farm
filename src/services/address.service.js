import axios from "axios";

export class AddressService {
    static url = "http://localhost:9000/api/addresses";

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