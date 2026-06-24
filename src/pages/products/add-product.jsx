import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productActions, productFeatureKey} from "../../redux/product/product.slice.js";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";
import Navbar from "../../components/navbar.jsx";
import ProductForm from "../../components/ProductForm.jsx";

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isProductCreateSuccess = useSelector(state => state[productFeatureKey].createProductSuccess);

    const [product, setProduct] = useState({
        productName: "",
        imageUrl: "",
        price: "",
        energy: "",
        protein: "",
        fat: "",
        nutritionalInfo: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(productActions.createNewProduct({
            product: {
                ...product,
                price: Number(product.price),
                energy: Number(product.energy),
                protein: Number(product.protein),
                fat: Number(product.fat),
            }
        }));
    };

    useEffect(() => {
        if (isProductCreateSuccess) {
            navigate("/products/admin-product");
            ToastMessageUtil.showToastMessageSuccess("Successfully created!");
        }
        return () => {
            if (isProductCreateSuccess) {
                dispatch(productActions.resetCreateProductSuccess());
            }
        };
    }, [isProductCreateSuccess]);

    return (
        <>
            <Navbar/>
            <ProductForm
                title="Add Product"
                submitLabel="Add Product"
                product={product}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/products/admin-product")}
            />
        </>
    );
};

export default AddProduct;
