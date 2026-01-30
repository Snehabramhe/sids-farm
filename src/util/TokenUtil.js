export class TokenUtil {

    static TOKEN_KEY = "x-access-token";

    static saveTokenToSession(token) {
        sessionStorage.setItem(TokenUtil.TOKEN_KEY, token);
    }

    static removeTokenFromSession() {
        sessionStorage.removeItem(TokenUtil.TOKEN_KEY);
    }

    static getTokenFromSession() {
        return sessionStorage.getItem(TokenUtil.TOKEN_KEY);
    }

    static isLoggedIn() {
        return TokenUtil.getTokenFromSession();
    }
}