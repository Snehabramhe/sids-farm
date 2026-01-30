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

    /**
     * get data from redux store
     * @param e
     */
    const isGetProductSuccess = useSelector(selectGetProductSuccess);
    const isUpdateProductSuccess = useSelector(selectUpdateProductSuccess);
    const productData = useSelector(state => state[productFeatureKey]);

    const {loading, error, product} = productData;

    /**
     * for change event on each from field
     * @param e
     */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setLocalProduct({...localProduct, [name]: value});
    };

    /**
     * submit the form data to server for updating the product
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productId) {
            dispatch(productActions.updateProductById({
                product: {
                    ...localProduct,
                    price: Number(localProduct.price),
                    energy: Number(localProduct.energy),
                    protein: Number(localProduct.protein),
                    fat: Number(localProduct.fat),
                }, productId: productId
            }));
        }
    };

    /**
     * get product data from server, when there is a product Id in the URL
     */
    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProductById({productId: productId}));
        }
    }, [productId]);

    /**
     * if success on product data from server, set to local product to populate on the form
     */
    useEffect(() => {
        if (isGetProductSuccess) {
            setLocalProduct({
                ...localProduct,
                productName: product.productName,
                imageUrl: product.imageUrl,
                price: product.price,
                energy: product.energy,
                protein: product.protein,
                fat: product.fat,
                nutritionalInfo: product.nutritionalInfo,
            })
        }
    }, [isGetProductSuccess]);

    /**
     * If product update is success to server, then redirect to admin page
     */
    useEffect(() => {
        if (isUpdateProductSuccess) {
            navigate("/products/admin-product");
            ToastMessageUtil.showToastMessageSuccess("Successfully Updated!");
        }
        return () => {
            if (isUpdateProductSuccess) {
                dispatch(productActions.resetUpdateProductSuccess());
            }
        }
    }, [isUpdateProductSuccess]);

    return (
        <>
            <Navbar/>
            <div className="container flex ">
                <div className="w-1/3 p-6 bg-gray-200 shadow-md rounded-md mt-10 m-5 ">
                    {/* <pre>{JSON.stringify(localProduct)}</pre>*/}
                    <h2 className="text-2xl font-bold mb-6 text-blue-500">Edit Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Product Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="productName"
                                value={localProduct.productName}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={localProduct.imageUrl}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={localProduct.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Energy */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Energy (kcal)</label>
                            <input
                                type="number"
                                name="energy"
                                value={localProduct.energy}
                                onChange={handleChange}
                                placeholder="Enter energy value"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Protein */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Protein (g)</label>
                            <input
                                type="number"
                                name="protein"
                                value={localProduct.protein}
                                onChange={handleChange}
                                placeholder="Enter protein value"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Fat */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Fat (g)</label>
                            <input
                                type="number"
                                name="fat"
                                value={localProduct.fat}
                                onChange={handleChange}
                                placeholder="Enter fat value"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Nutritional Info */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Nutritional Info
                            </label>
                            <textarea
                                name="nutritionalInfo"
                                value={localProduct.nutritionalInfo}
                                onChange={handleChange}
                                placeholder="Enter additional nutritional information"
                                rows="4"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                            >
                                Update Product
                            </button>
                            <button onClick={() => navigate("/products/admin-product")}
                                    type="button"
                                    className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-black transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-10 m-5">
                    <img src={localProduct.imageUrl} alt="" width={400} height={400}/>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
