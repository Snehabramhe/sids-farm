import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectLoginUserSuccess, userActions} from "../../redux/user/user.slice.js";
import {cartActions} from "../../redux/cart/cart.slice.js";
import LoginImg from "../../assets/images/login-img.png";

const LoginUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get State data from redux
    const isLoginSuccess = useSelector(selectLoginUserSuccess);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const updateInput = (event) => {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value,
        })
    };

    const submitLoginUser = (event) => {
        event.preventDefault();
        dispatch(userActions.loginUser({
            user: {
                ...user,
                password: user.password.trim(),
                email: user.email.trim(),
            }
        }));
    };

    useEffect(() => {
        if (isLoginSuccess) {
            navigate('/');
            /**
             * BUG FIX : as soon as the user loggedIn, the cart Count to be updated to the latest
             */
            dispatch(cartActions.getCartInfo()); // Get cart information,  as soon as user logged in
        }
        return () => {
            if (isLoginSuccess) {
                dispatch(userActions.resetLoginUser());
            }
        }
    }, [isLoginSuccess]);


    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-red-300">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Left Side: Image */}
                        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                            <img
                                src={LoginImg} // Replace with your image URL
                                alt="Landing Page Visual"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Right Side: Header and Text */}
                        <div className="w-full lg:w-1/2 lg:pl-12 flex justify-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                                {/* <pre>{JSON.stringify(user)}</pre>*/}
                                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login Here</h2>

                                <form onSubmit={submitLoginUser}>

                                    <div className="mb-4">
                                        <label htmlFor="email"
                                               className="block text-gray-600 font-semibold mb-2">Email</label>
                                        <input type="email" id="email"
                                               name="email"
                                               value={user.email}
                                               onChange={updateInput}
                                               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                               placeholder="Enter your email" required/>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="password"
                                               className="block text-gray-600 font-semibold mb-2">Password</label>
                                        <input type="password" id="password"
                                               name="password"
                                               value={user.password}
                                               onChange={updateInput}
                                               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                               placeholder="Enter password" required/>
                                    </div>

                                    <button type="submit"
                                            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">Login
                                    </button>
                                </form>

                                <p className="mt-4 text-center text-gray-600">
                                    Don't have an account? <Link to="/users/register"
                                                                 className="text-indigo-600 hover:underline">Register
                                    here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default LoginUser;