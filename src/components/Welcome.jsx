import React from 'react';
import {Link, Navigate} from "react-router-dom";
import {TokenUtil} from "../util/TokenUtil.js";

const Welcome = () => {
    const isLoggedIn = TokenUtil.isLoggedIn();

    if (!isLoggedIn) {
        return <Navigate to={'/users/login'}/>
    } else {
        return <Navigate to={'/home'}/>
    }


};
export default Welcome;