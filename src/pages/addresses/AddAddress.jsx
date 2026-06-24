import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {addressActions, selectIsCreateAddressSuccess} from "../../redux/address/address.slice.js";
import AddressForm from "../../components/AddressForm.jsx";

const AddAddress = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAddressCreationSuccess = useSelector(selectIsCreateAddressSuccess);
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

    const submitAddAddress = (event) => {
        event.preventDefault();
        if (previousPage) {
            dispatch(addressActions.createAddress({address}));
        }
    };

    const redirectToPreviousPage = () => {
        navigate(previousPage || "/users/profile");
    };

    useEffect(() => {
        if (isAddressCreationSuccess) {
            redirectToPreviousPage();
        }
        return () => {
            dispatch(addressActions.resetCreateAddress());
        };
    }, [isAddressCreationSuccess]);

    return (
        <>
            <Navbar/>
            <AddressForm
                title="Create Address"
                submitLabel="Add Address"
                address={address}
                onChange={updateInput}
                onSubmit={submitAddAddress}
                onCancel={redirectToPreviousPage}
            />
        </>
    );
};

export default AddAddress;
