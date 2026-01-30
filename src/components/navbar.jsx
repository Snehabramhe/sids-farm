import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userActions, userFeatureKey} from "../redux/user/user.slice.js";
import {ShoppingCartIcon} from "@heroicons/react/24/solid/index.js";
import {cartActions, selectCartCount} from "../redux/cart/cart.slice.js";
import {orderActions, selectOrderPlaced} from "../redux/order/order.slice.js";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // get data from redux
    const {user} = useSelector(state => state[userFeatureKey]);
    const cartCount = useSelector(selectCartCount);

    const clickSignOut = () => {
        setTimeout(() => {
            dispatch(userActions.signOutUser());
            navigate("/users/login");
        }, 300)
    };


    return (
        <>
            <nav className="bg-gray-800 text-white">
                <div className="container mx-auto flex items-center justify-between py-4 px-4">
                    {/* Logo */}
                    <div className="text-2xl font-bold">
                        <Link to="/" className="hover:text-gray-300">
                            Sids Farm
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex space-x-6 items-center">

                        {/* <li>
                            <Link
                                to="/products/show-product"
                                className="hover:text-gray-300 transition-colors duration-300"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products/admin-product"
                                className="hover:text-gray-300 transition-colors duration-300"
                            >
                                Admin
                            </Link>
                        </li>*/}
                        <li>
                            {/* <div className="flex">
                                <span>Hi {user?.username}</span>
                                <img src={user?.imageUrl} alt="" width={30} height={30} className="rounded-full ml-2"/>
                            </div>*/}
                            <div className="relative">
                                <button
                                    className="text-gray-300 hover:text-white px-3 py-2 text-sm flex items-center"
                                    onClick={toggleDropdown}
                                >
                                    <div className="flex">
                                        <span>Hi {user?.username}</span>
                                        <img src={user?.imageUrl} alt="" width={30} height={30}
                                             className="rounded-full ml-2"/>
                                    </div>
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
                                        <Link
                                            to="/users/profile"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/orders/me"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                        >
                                            My Orders
                                        </Link>
                                        <p className="border-b-2"></p>
                                        <Link
                                            to="/orders/all"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                        >
                                            Manage Orders
                                        </Link>
                                        <Link
                                            to="/products/admin-product"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                        >
                                            Manage Products
                                        </Link>
                                        <p className="border-b-2"></p>
                                        <span
                                            onClick={clickSignOut}
                                            className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                        >
                                            Logout
                                        </span>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li className="relative inline-block cursor-pointer"
                            onClick={() => navigate("/carts/page")}>
                            <ShoppingCartIcon title={'Cart'} className="size-6 text-white"/>
                            <span
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                {cartCount}
                            </span>
                        </li>
                        {/*<li>
                            <p className="cursor-pointer" onClick={clickSignOut}>
                                <PowerIcon title={'SignOut'} className="size-6 text-green-500"/>
                            </p>
                        </li>*/}
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar;