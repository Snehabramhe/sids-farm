import React, {useEffect} from 'react';
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productActions, productFeatureKey} from "../../redux/product/product.slice.js";
import Navbar from "../../components/navbar.jsx";
import {cartActions} from "../../redux/cart/cart.slice.js";

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    /**
     * get data from redux store
     */
    const productState = useSelector(state => state[productFeatureKey]);


    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, []);

    const {loading, products, error} = productState;

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>
    }

    const clickAddToCart = (product) => {
        dispatch(cartActions.addToCart({
            product: {
                ...product,
                count: 1
            }
        }));
    };

    return (
        <>
            <Navbar/>
            <div className="m-5 flex flex-row max-w-full">
                <div className="grid grid-cols-4 gap-4 p-4">
                    {
                        !loading && products.map((product) => (
                            <div key={product._id}
                                 className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow-md ">
                                {/* Product Image */}
                                <img
                                    onClick={() => navigate(`/products/view-product/${product._id}`)}
                                    className="rounded-t-lg w-full object-cover cursor-pointer"
                                    src={product.imageUrl}
                                />

                                {/* Product Content */}
                                <div className="p-4">
                                    {/* Product Title */}
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                        {product.productName}
                                    </h2>

                                    {/* Product Description */}
                                    <p className="text-gray-600 text-sm mb-3">{product.nutritionalInfo}</p>

                                    {/* Price and Details */}
                                    <pre>Fat : {product.fat}</pre>
                                    <pre>Protein : {product.protein}</pre>
                                    <pre>Energy : {product.energy}</pre>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-blue-600">
                                                                &#8377; {Number(product.price)?.toFixed(2)}
                                         </span>


                                    </div>
                                    <div className="mt-3">
                                        <button onClick={() => clickAddToCart(product)}
                                                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-700 transition duration-300">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    )
}
export default ProductList;