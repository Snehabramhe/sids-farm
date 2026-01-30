import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {
    addressActions,
    addressFeatureKey,
    selectIsCreateAddressSuccess,
    selectIsUpdateAddressSuccess
} from "../../redux/address/address.slice.js";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";

const EditAddress = () => {
    const {addressId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * get data from redux
     */
    const isAddressUpdateSuccess = useSelector(selectIsUpdateAddressSuccess);
    const {address: serverAddress, loading, error} = useSelector(state => state[addressFeatureKey]);


    const [previousPage, setPreviousPage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const fromUrl = searchParams.get('from');

    const [address, setAddress] = useState({
        mobile: "",
        flat: "",
        buildingName: "",
        landmark: "",
        area: "",
        city: "",
        state: "",
        country: "",
        zipcode: ""
    });


    useEffect(() => {
        if (addressId) {
            dispatch(addressActions.getAddress());
        }
    }, [addressId]);

    useEffect(() => {
        if (serverAddress) {
            setAddress({
                ...address,
                mobile: serverAddress.mobile,
                flat: serverAddress.flat,
                buildingName: serverAddress.buildingName,
                landmark: serverAddress.landmark,
                area: serverAddress.area,
                city: serverAddress.city,
                state: serverAddress.state,
                country: serverAddress.country,
                zipcode: serverAddress.zipcode,
            })
        }
    }, [serverAddress]);

    useEffect(() => {
        if (fromUrl && fromUrl === 'profile') {
            setPreviousPage("/users/profile")
        }
        if (fromUrl && fromUrl === 'checkout') {
            setPreviousPage("/carts/checkout")
        }
    }, [fromUrl])

    const updateInput = (event) => {
        const {name, value} = event.target;
        setAddress({
            ...address,
            [name]: value
        })
    };

    const submitEditAddress = (event) => {
        event.preventDefault();
        if (previousPage && previousPage.length > 0) {
            dispatch(addressActions.updateAddress({
                address: address,
                addressId: addressId
            }))
        }
    }

    const redirectToPreviousPage = () => {
        if (previousPage && previousPage.length > 0) {
            navigate(previousPage);
        } else {
            navigate("/users/profile");
        }
    }

    useEffect(() => {
        if (isAddressUpdateSuccess) {
            return redirectToPreviousPage();
        }
        return () => {
            dispatch(addressActions.resetUpdateAddress())
        };
    }, [isAddressUpdateSuccess]);

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>
    }

    return (
        <>
            <Navbar/>
            <div className="container flex ">
                <div className="w-1/3 p-6 bg-gray-200 shadow-md rounded-md mt-10 m-5 ">
                    <h2 className="text-2xl font-bold mb-6 text-green-500">Edit Address</h2>
                    <form className="space-y-4" onSubmit={submitEditAddress}>

                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile
                                Number</label>
                            <input
                                required={true}
                                name={"mobile"}
                                value={address.mobile}
                                onChange={updateInput}
                                type="tel" id="mobile" placeholder="Enter your mobile number"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="flat" className="block text-sm font-medium text-gray-700">Flat/Apartment
                                Number</label>
                            <input
                                required={true}
                                value={address.flat}
                                onChange={updateInput}
                                type="text" id="flat" name="flat" placeholder="Enter your flat number"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700">Building
                                Name</label>
                            <input
                                required={true}
                                value={address.buildingName}
                                onChange={updateInput}
                                type="text" id="buildingName" name="buildingName"
                                placeholder="Enter your building name"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="landmark"
                                   className="block text-sm font-medium text-gray-700">Landmark</label>
                            <input

                                required={true}
                                value={address.landmark}
                                onChange={updateInput}
                                type="text" id="landmark" name="landmark" placeholder="Enter a nearby landmark"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                            <input
                                required={true}
                                value={address.area}
                                onChange={updateInput}
                                type="text" id="area" name="area" placeholder="Enter your area"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                required={true}
                                value={address.city}
                                onChange={updateInput}
                                type="text" id="city" name="city" placeholder="Enter your city"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                required={true}
                                value={address.state}
                                onChange={updateInput}
                                type="text" id="state" name="state" placeholder="Enter your state"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                            <input
                                required={true}
                                value={address.country}
                                onChange={updateInput}
                                type="text" id="country" name="country" placeholder="Enter your country"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
                            <input
                                required={true}
                                value={address.zipcode}
                                onChange={updateInput}
                                type="text" id="zipcode" name="zipcode" placeholder="Enter your zipcode"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                            >
                                Update Address
                            </button>
                            <button
                                onClick={redirectToPreviousPage}
                                type="button"
                                className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-black transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}
export default EditAddress;