import React from 'react';
import {TokenUtil} from "../util/TokenUtil.js";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAdminUser} from "../redux/user/user.slice.js";
import Navbar from "../components/navbar.jsx";

const AdminRouter = ({children}) => {
    const navigate = useNavigate();
    const isLoggedIn = TokenUtil.isLoggedIn();
    const isAdminUser = useSelector(selectIsAdminUser);

    const clickNavigateHome = () => {
        navigate('/home');
    }

    if (!isLoggedIn) {
        return <Navigate to={'/users/login'}/>
    }
    if (isLoggedIn && !isAdminUser) {
        return (
            <>
                <Navbar/>
                <div className="flex justify-center text-center items-center m-5">

                    <div>
                        <p className="text-red-600 text-xl">You are not authorized to access this page.</p>
                        <pre>Please contact the Admin Support</pre>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
                                onClick={() => clickNavigateHome()}>Back to Home
                        </button>
                    </div>
                </div>
            </>
        )
    } else {
        return children;
    }
};
export default AdminRouter;