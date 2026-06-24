import React, {useEffect} from 'react';
import Navbar from "../../components/navbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userFeatureKey} from "../../redux/user/user.slice.js";
import {addressActions, addressFeatureKey} from "../../redux/address/address.slice.js";
import {useNavigate} from "react-router-dom";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, loading, error} = useSelector(state => state[userFeatureKey]);
    const {address} = useSelector(state => state[addressFeatureKey]);

    useEffect(() => {
        dispatch(addressActions.getAddress());
    }, []);

    const clickAddAddress = () => navigate("/addresses/add?from=profile");
    const clickEditAddress = (addressId) => navigate(`/addresses/edit/${addressId}?from=profile`);

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>;
    }

    const hasUser = user && Object.keys(user).length > 0;
    const hasAddress = address && Object.keys(address).length > 0;

    return (
        <>
            <Navbar/>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">My Account</h1>

                    {/* Profile header card */}
                    {hasUser && (
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                            <div className="h-28 bg-gradient-to-r from-green-500 to-emerald-600"/>
                            <div className="px-6 pb-6">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
                                    <img
                                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-white"
                                        src={user.imageUrl}
                                        alt={user.username}
                                    />
                                    <div className="flex-1 sm:pb-2">
                                        <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                                        <p className="text-gray-500">{user.email}</p>
                                    </div>
                                    {user.isAdmin && (
                                        <span className="self-start sm:self-end bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                                            Admin
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details + Address */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Personal details */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Personal Details</h3>
                            {hasUser && (
                                <dl className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500">Username</dt>
                                        <dd className="font-medium text-gray-800">{user.username}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500">Email</dt>
                                        <dd className="font-medium text-gray-800">{user.email}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500">Account Type</dt>
                                        <dd className="font-medium text-gray-800">{user.isAdmin ? 'Administrator' : 'Customer'}</dd>
                                    </div>
                                </dl>
                            )}
                        </div>

                        {/* Shipping address */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">Shipping Address</h3>
                                {hasAddress ? (
                                    <button onClick={() => clickEditAddress(address._id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg text-sm transition-colors">
                                        Edit
                                    </button>
                                ) : (
                                    <button onClick={clickAddAddress}
                                            className="bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-lg text-sm transition-colors">
                                        Add
                                    </button>
                                )}
                            </div>
                            {hasAddress ? (
                                <div className="space-y-2 text-sm text-gray-700">
                                    <p><span className="text-gray-500">Mobile:</span> {address.mobile}</p>
                                    <p><span className="text-gray-500">Address:</span> {address.flat}, {address.buildingName}</p>
                                    <p><span className="text-gray-500">Landmark:</span> {address.landmark}, {address.area}</p>
                                    <p><span className="text-gray-500">City / State:</span> {address.city}, {address.state}</p>
                                    <p><span className="text-gray-500">Zip Code:</span> {address.zipcode}</p>
                                    <p><span className="text-gray-500">Country:</span> {address.country}</p>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-3">No address added yet.</p>
                                    <button onClick={clickAddAddress}
                                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                                        Add Address
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
