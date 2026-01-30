import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectRegisterUserSuccess, userActions} from "../../redux/user/user.slice.js";
import RegisterImg from "../../assets/images/register-img.jpg";

const RegisterUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get State data from redux
    const isRegistrationSuccess = useSelector(selectRegisterUserSuccess);

    const [user, setUser] = useState({
        username: "",
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

    const submitRegisterUser = (event) => {
        event.preventDefault();
        dispatch(userActions.registerUser({
            user: {
                ...user,
                username: user.username.trim(),
                password: user.password.trim(),
                email: user.email.trim(),
            }
        }));
    };

    useEffect(() => {
        if (isRegistrationSuccess) {
            navigate('/users/login');
        }
        return () => {
            if (isRegistrationSuccess) {
                dispatch(userActions.resetRegisterUser());
            }
        }
    }, [isRegistrationSuccess]);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-red-300">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Left Side: Image */}
                        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                            <img
                                src={RegisterImg} // Replace with your image URL
                                alt="Landing Page Visual"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Right Side: Header and Text */}
                        <div className="w-full lg:w-1/2 lg:pl-12 flex justify-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                                {/* <pre>{JSON.stringify(user)}</pre>*/}
                                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Create Account</h2>

                                <form onSubmit={submitRegisterUser}>

                                    <div className="mb-4">
                                        <label htmlFor="username"
                                               className="block text-gray-600 font-semibold mb-2">Username</label>
                                        <input
                                            type="text" id="username"
                                            name="username"
                                            value={user.username}
                                            onChange={updateInput}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                            placeholder="Enter username" required/>
                                    </div>

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
                                            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">Register
                                    </button>
                                </form>

                                <p className="mt-4 text-center text-gray-600">
                                    Already have an account? <Link to="/users/login"
                                                                   className="text-indigo-600 hover:underline">Login
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
export default RegisterUser;