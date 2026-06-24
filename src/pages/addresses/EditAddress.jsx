import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {addressActions, addressFeatureKey, selectIsUpdateAddressSuccess} from "../../redux/address/address.slice.js";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";
import AddressForm from "../../components/AddressForm.jsx";

const EditAddress = () => {
    const {addressId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAddressUpdateSuccess = useSelector(selectIsUpdateAddressSuccess);
    const {address: serverAddress, loading, error} = useSelector(state => state[addressFeatureKey]);

    const [previousPage, setPreviousPage] = useState("");
    const [searchParams] = useSearchParams();
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
                mobile: serverAddress.mobile,
                flat: serverAddress.flat,
                buildingName: serverAddress.buildingName,
                landmark: serverAddress.landmark,
                area: serverAddress.area,
                city: serverAddress.city,
                state: serverAddress.state,
                country: serverAddress.country,
                zipcode: serverAddress.zipcode,
            });
        }
    }, [serverAddress]);

    useEffect(() => {
        if (fromUrl === 'profile') {
            setPreviousPage("/users/profile");
        }
        if (fromUrl === 'checkout') {
            setPreviousPage("/carts/checkout");
        }
    }, [fromUrl]);

    const updateInput = (event) => {
        const {name, value} = event.target;
        setAddress({...address, [name]: value});
    };

    const submitEditAddress = (event) => {
        event.preventDefault();
        if (previousPage) {
            dispatch(addressActions.updateAddress({address, addressId}));
        }
    };

    const redirectToPreviousPage = () => {
        navigate(previousPage || "/users/profile");
    };

    useEffect(() => {
        if (isAddressUpdateSuccess) {
            return redirectToPreviousPage();
        }
        return () => {
            dispatch(addressActions.resetUpdateAddress());
        };
    }, [isAddressUpdateSuccess]);

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>;
    }

    return (
        <>
            <Navbar/>
            <AddressForm
                title="Edit Address"
                submitLabel="Update Address"
                address={address}
                onChange={updateInput}
                onSubmit={submitEditAddress}
                onCancel={redirectToPreviousPage}
            />
        </>
    );
};

export default EditAddress;
