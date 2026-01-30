import React, {useEffect} from 'react';
import Navbar from "../../components/navbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userFeatureKey} from "../../redux/user/user.slice.js";
import {addressActions, addressFeatureKey} from "../../redux/address/address.slice.js";
import {useLocation, useNavigate, useNavigation, useSearchParams} from "react-router-dom";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * get user data from redux
     */
    const {user, loading, error} = useSelector(state => state[userFeatureKey]);
    const {address} = useSelector(state => state[addressFeatureKey]);

    useEffect(() => {
        dispatch(addressActions.getAddress());
    }, []);


    const clickAddAddress = () => {
        navigate("/addresses/add?from=profile");
    };

    const clickEditAddress = (addressId) => {
        navigate(`/addresses/edit/${addressId}?from=profile`);
    };

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>
    }
    
    return (
        <>
            <Navbar/>
            <div className=" mt-5 flex items-center justify-center">
                <div className=" w-full mt-5 bg-white rounded-lg  p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile picture */}
                        {
                            user && Object.keys(user).length > 0 && <div className="flex flex-col items-center">
                                <img
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                                    src={user.imageUrl}
                                    alt="Profile Picture"
                                />
                                <h2 className="mt-4 text-lg font-semibold">{user.username}</h2>
                                <p className="text-gray-500">Is Admin ? {user.isAdmin ? 'YES' : 'NO'}</p>
                            </div>
                        }

                        {/* Personal details*/}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Personal Details</h3>
                            {
                                user && Object.keys(user).length > 0 && <ul>
                                    <li className="mb-2">
                                        <span className="font-medium text-gray-700">Email:</span> {user.email}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-medium text-gray-700">Phone:</span> +1 234 567 890
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-medium text-gray-700">Date of Birth:</span> Jan 1, 1990
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-medium text-gray-700">Gender:</span> Male
                                    </li>
                                </ul>
                            }
                        </div>

                        {/* Shipping Address */}
                        <div>
                            <div className="flex justify-between items-center text-xl font-semibold mb-4 border-b pb-2">
                                <h3>Shipping Address</h3>
                                <div>
                                    {
                                        address ?
                                            <button
                                                onClick={() => clickEditAddress(address._id)}
                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm">Edit
                                            </button> : <button
                                                onClick={clickAddAddress}
                                                className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm mr-2">Add
                                            </button>
                                    }
                                </div>
                            </div>
                            {
                                address && Object.keys(address).length > 0 ?
                                    <div>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Mobile :</span> {address.mobile}
                                        </p>
                                        <p className="text-gray-700">
                                            <span
                                                className="font-medium">Address Line 1:</span> {address.flat}, {address.buildingName}
                                        </p>
                                        <p className="text-gray-700">
                                            <span
                                                className="font-medium">Address Line 2:</span> {address.landmark},{address.area}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">City:</span> {address.city}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">State:</span> {address.state}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Zip Code:</span> {address.zipcode}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Country:</span> {address.country}
                                        </p>
                                    </div> : <div>
                                        <p className="text-red-600 text-lg">No Address Found!</p>
                                    </div>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Profile;