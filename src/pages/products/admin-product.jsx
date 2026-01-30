import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";
import ConfirmModal from "../../components/confirm-product-modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {productActions, productFeatureKey, selectDeleteProductSuccess} from "../../redux/product/product.slice.js";
import {ToastMessageUtil} from "../../util/ToastMessageUtil.js";
import Navbar from "../../components/navbar.jsx";
import {selectIsAdminUser} from "../../redux/user/user.slice.js";
import ConfirmationProductModal from "../../components/confirm-product-modal.jsx";

const AdminProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(false);

    /**
     * get products data from redux
     */
    const isAdminUser = useSelector(selectIsAdminUser);
    const productData = useSelector(state => state[productFeatureKey]);
    const isDeleteProductSuccess = useSelector(selectDeleteProductSuccess);

    /**
     * dispatch an action get all products from server, as soon as page loads
     */
    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, []);

    /**
     * to open the modal to confirm
     * @param productId
     */
    const clickDelete = (productId) => {
        setProductIdToDelete(productId);
        setOpen(true);
    }

    /**
     * on delete confirm, call action to delete the product at server
     * @returns {Promise<void>}
     */
    const onDeleteConfirm = async () => {
        setOpen(false);
        if (productIdToDelete) {
            dispatch(productActions.deleteProductById({productId: productIdToDelete}));
        }
    }

    /**
     * if delete is success, then get the fresh data from server
     */
    useEffect(() => {
        if (isDeleteProductSuccess) {
            dispatch(productActions.getAllProducts());
            ToastMessageUtil.showToastMessageInfo("Successfully Deleted!");
        }
    }, [isDeleteProductSuccess]);

    const {loading, products, error} = productData;

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>
    }

    if (!loading && !error && !isAdminUser) {
        return (
            <>
                <Navbar/>
                <div className="flex justify-center text-center items-center m-5">

                    <div>
                        <p className="text-red-600 text-xl">You are not authorized to access this page.</p>
                        <pre>Please contact the Admin Support</pre>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
                                onClick={() => navigate("/home")}>Back to Home
                        </button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar/>
            {
                open && <ConfirmationProductModal isOpen={open} setOpen={setOpen} onDeleteConfirm={onDeleteConfirm}/>
            }
            <div
                className="m-5 max-w-sm ">
                <p className="text-3xl mr-2">Admin Products
                    <button onClick={() => navigate("/products/add-product")}
                            className="bg-green-500 ml-2 text-white px-4 py-2 rounded-lg text-sm">New</button>
                </p>
            </div>
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Image</th>
                            <th className="py-2 px-4 border-b text-left">Price</th>
                            <th className="py-2 px-4 border-b text-left">Energy(Kcal)</th>
                            <th className="py-2 px-4 border-b text-left">Protein(g)</th>
                            <th className="py-2 px-4 border-b text-left">Fat(g)</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{product.productName}</td>
                                <td className="py-2 px-4 border-b">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.productName}
                                        className="h-12 w-12 object-cover rounded"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b"> &#8377; {Number(product.price)?.toFixed(2)}</td>
                                <td className="py-2 px-4 border-b">{product.energy}</td>
                                <td className="py-2 px-4 border-b">{product.protein}</td>
                                <td className="py-2 px-4 border-b">{product.fat}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex space-x-2">
                                        <button onClick={() => navigate(`/products/edit-product/${product._id}`)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                            Edit
                                        </button>
                                        <button onClick={() => clickDelete(product._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default AdminProduct;