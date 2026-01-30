import axios from "axios";

export class UserService {
    static url = "http://localhost:9000/api/users";

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