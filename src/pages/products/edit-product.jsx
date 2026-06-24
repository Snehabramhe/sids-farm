import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    productActions,
    productFeatureKey,
    selectGetProductSuccess,
    selectUpdateProductSuccess
} from "../../redux/product/product.slice.js";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";
import Navbar from "../../components/navbar.jsx";
import ProductForm from "../../components/ProductForm.jsx";

const EditProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {productId} = useParams();

    const [localProduct, setLocalProduct] = useState({
        productName: "",
        imageUrl: "",
        price: "",
        energy: "",
        protein: "",
        fat: "",
        nutritionalInfo: "",
    });

    const isGetProductSuccess = useSelector(selectGetProductSuccess);
    const isUpdateProductSuccess = useSelector(selectUpdateProductSuccess);
    const {product} = useSelector(state => state[productFeatureKey]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLocalProduct({...localProduct, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productId) {
            dispatch(productActions.updateProductById({
                product: {
                    ...localProduct,
                    price: Number(localProduct.price),
                    energy: Number(localProduct.energy),
                    protein: Number(localProduct.protein),
                    fat: Number(localProduct.fat),
                },
                productId,
            }));
        }
    };

    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProductById({productId}));
        }
    }, [productId]);

    useEffect(() => {
        if (isGetProductSuccess) {
            setLocalProduct({
                productName: product.productName,
                imageUrl: product.imageUrl,
                price: product.price,
                energy: product.energy,
                protein: product.protein,
                fat: product.fat,
                nutritionalInfo: product.nutritionalInfo,
            });
        }
    }, [isGetProductSuccess]);

    useEffect(() => {
        if (isUpdateProductSuccess) {
            navigate("/products/admin-product");
            ToastMessageUtil.showToastMessageSuccess("Successfully Updated!");
        }
        return () => {
            if (isUpdateProductSuccess) {
                dispatch(productActions.resetUpdateProductSuccess());
            }
        };
    }, [isUpdateProductSuccess]);

    return (
        <>
            <Navbar/>
            <ProductForm
                title="Edit Product"
                submitLabel="Update Product"
                product={localProduct}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/products/admin-product")}
            />
        </>
    );
};

export default EditProduct;
