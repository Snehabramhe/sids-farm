import React from 'react';
import {useNavigate} from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import HomeImg from "../assets/images/home-img.webp";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar/>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Left Side: Image */}
                        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                            <img
                                src={HomeImg} // Replace with your image URL
                                alt="Landing Page Visual"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Right Side: Header and Text */}
                        <div className="w-full lg:w-1/2 lg:pl-12">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                Welcome to Our Products
                            </h1>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Discover a world of possibilities with our innovative solutions.
                                We are dedicated to helping you achieve your goals through
                                outstanding products and services.
                            </p>
                            <div>
                                <button onClick={() => navigate('/products/show-product')}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
                                    Show Products
                                </button>
                                <button onClick={() => navigate('/products/admin-product')}
                                        className="ml-4 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-200 transition duration-300">
                                    Manage Products
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;