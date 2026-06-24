import axios from "axios";
import {API_BASE_URL} from "../config.js";

export class UserService {
    static url = `${API_BASE_URL}/api/users`;

    static registerUser(user) {
        return axios.post(`${UserService.url}/register`, user);
    }

    static loginUser(user) {
        return axios.post(`${UserService.url}/login`, user);
    }

    static getUserInfo() {
        return axios.get(`${UserService.url}/me`);
    }
}