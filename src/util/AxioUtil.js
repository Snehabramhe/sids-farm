import {TokenUtil} from "./TokenUtil.js";
import axios from "axios";

export class AxiosUtil {

    static setTokenToHeader() {
        let isLoggedIn = TokenUtil.isLoggedIn();
        if (!isLoggedIn) {
            return false;
        }
        axios.defaults.headers['x-access-token'] = TokenUtil.getTokenFromSession();
        return true;
    }
}