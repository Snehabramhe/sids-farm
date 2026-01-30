import React from 'react';
import {TokenUtil} from "../util/TokenUtil.js";
import {Navigate} from "react-router-dom";

const AuthRouter = ({children}) => {
    const isLoggedIn = TokenUtil.isLoggedIn();

    if (!isLoggedIn) {
        return <Navigate to={'/users/login'}/>
    } else {
        return children;
    }
};
export default AuthRouter;