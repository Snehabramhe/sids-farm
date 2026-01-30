import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProductList from "./products-list.jsx";
import {ProductService} from "../../services/product-service.js";
import {useDispatch, useSelector} from "react-redux";
import {productActions, productFeatureKey} from "../../redux/product/product.slice.js";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";
import Navbar from "../../components/navbar.jsx";

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * get product create success flag from redux store
     */
    const isProductCreateSuccess = useSelector(state => state[productFeatureKey].createProductSuccess)

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

    /**
     * submit the form data to server, using dispatch an action
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
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

    /**
     * redirect the page to admin, when the creation of product is success
     */
    useEffect(() => {
        if (isProductCreateSuccess) {
            navigate("/products/admin-product");
            ToastMessageUtil.showToastMessageSuccess("Successfully created!");
        }
        return () => {
            if (isProductCreateSuccess) {
                dispatch(productActions.resetCreateProductSuccess());
            }
        }
    }, [isProductCreateSuccess]);

    return (
        <>
            <Navbar/>
            <div className="container flex ">
                <div className="w-1/3 p-6 bg-gray-200 shadow-md rounded-md mt-10 m-5 ">
                    {/*<pre>{JSON.stringify(product)}</pre>*/}
                    <h2 className="text-2xl font-bold mb-6 text-green-500">Add Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Product Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Product Name
                            </label>
                            <input
                                required={true}
                                type="text"
                                name="productName"
                                value={product.productName}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                            <input
                                required={true}
                                type="url"
                                name="imageUrl"
                                value={product.imageUrl}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
                            <input
                                required={true}
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Energy */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Energy (kcal)</label>
                            <input
                                required={true}
                                type="number"
                                name="energy"
                                value={product.energy}
                                onChange={handleChange}
                                placeholder="Enter energy value"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Protein */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Protein (g)</label>
                            <input
                                required={true}
                                type="number"
                                name="protein"
                                value={product.protein}
                                onChange={handleChange}
                                placeholder="Enter protein value"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Fat */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Fat (g)</label>
                            <input
                                required={true}
                                type="number"
                                name="fat"
                                value={product.fat}
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
                                required={true}
                                name="nutritionalInfo"
                                value={product.nutritionalInfo}
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
                                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                            >
                                Add Product
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
                {
                    product.imageUrl && <div className="mt-10 m-5">
                        <img src={product.imageUrl} alt="" width={400} height={400}/>
                    </div>
                }
            </div>
        </>
    );
};

export default AddProduct;
