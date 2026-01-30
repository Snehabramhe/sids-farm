import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";
import {useDispatch, useSelector} from "react-redux";
import {productActions, productFeatureKey} from "../../redux/product/product.slice.js";
import Navbar from "../../components/navbar.jsx";
import {ArrowLeftCircleIcon} from "@heroicons/react/24/solid/index.js";
import {cartActions} from "../../redux/cart/cart.slice.js";

const ViewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {productId} = useParams();

    /**
     * get product Data from server
     */
    const productData = useSelector(state => state[productFeatureKey]);

    /**
     * get the product data, when the page is rendered fully
     */
    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProductById({productId: productId}));
        }
    }, [productId]);

    const {loading, product, error} = productData;

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
            {
                product && <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="container mx-auto px-6 lg:px-20">
                        <div className="flex flex-col lg:flex-row items-center">
                            {/* Left Side: Image */}
                            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                                <img
                                    src={product.imageUrl} // Replace with your image URL
                                    alt="Landing Page Visual"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>

                            {/* Right Side: Header and Text */}
                            <div className="w-full lg:w-1/2 lg:pl-12">
                                <button onClick={() => navigate('/products/show-product')}
                                        className="bg-black mt-3 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300">
                                    <ArrowLeftCircleIcon className="size-6 text-white"/>
                                </button>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight mt-3">
                                    {product.productName}
                                </h1>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    {product.nutritionalInfo}
                                </p>
                                <span className="text-lg font-bold text-blue-600">
                                                &#8377; {Number(product.price)?.toFixed(2)}
                         </span>
                                <pre>Fat : {product.fat}</pre>
                                <pre>Protein : {product.protein}</pre>
                                <pre>Energy : {product.energy}</pre>
                                <div>
                                    <button onClick={() => clickAddToCart(product)}
                                            className="bg-orange-500 text-white px-3 mt-3 py-1 rounded hover:bg-orange-700 transition duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
export default ViewProduct;