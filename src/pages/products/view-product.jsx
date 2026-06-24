import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";
import {useDispatch, useSelector} from "react-redux";
import {productActions, productFeatureKey} from "../../redux/product/product.slice.js";
import Navbar from "../../components/navbar.jsx";
import {ArrowLeftIcon} from "@heroicons/react/24/solid/index.js";
import {cartActions, cartFeatureKey} from "../../redux/cart/cart.slice.js";

const FALLBACK_IMAGE = 'https://placehold.co/600x600?text=Sids+Farm';

const ViewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {productId} = useParams();

    const {loading, product, error} = useSelector(state => state[productFeatureKey]);
    const isInCart = useSelector(state =>
        state[cartFeatureKey].cartItems.some(item => item._id === productId)
    );

    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProductById({productId}));
        }
    }, [productId]);

    if (loading) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>;
    }

    const clickAddToCart = () => {
        dispatch(cartActions.addToCart({product: {...product, count: 1}}));
    };

    const handleImageError = (e) => {
        if (e.target.src !== FALLBACK_IMAGE) {
            e.target.src = FALLBACK_IMAGE;
        }
    };

    return (
        <>
            <Navbar/>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb / back */}
                    <button onClick={() => navigate('/products/show-product')}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 transition-colors">
                        <ArrowLeftIcon className="h-5 w-5"/>
                        <span>Back to Products</span>
                    </button>

                    {product && Object.keys(product).length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
                                {/* Image */}
                                <div className="rounded-xl overflow-hidden bg-gray-50">
                                    <img
                                        src={product.imageUrl || FALLBACK_IMAGE}
                                        onError={handleImageError}
                                        alt={product.productName}
                                        className="w-full h-72 lg:h-[460px] object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex flex-col">
                                    <span className="inline-block w-fit bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                        Farm Fresh
                                    </span>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                        {product.productName}
                                    </h1>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {product.nutritionalInfo}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className="text-4xl font-bold text-gray-900">
                                            &#8377;{Number(product.price)?.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-gray-400">incl. all taxes</span>
                                    </div>

                                    {/* Nutrition */}
                                    <div className="mb-8">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                            Nutritional Value
                                        </h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="bg-green-50 rounded-xl p-4 text-center">
                                                <p className="text-2xl font-bold text-green-700">{product.energy}</p>
                                                <p className="text-xs text-gray-500 mt-1">Energy (kcal)</p>
                                            </div>
                                            <div className="bg-blue-50 rounded-xl p-4 text-center">
                                                <p className="text-2xl font-bold text-blue-700">{product.protein}</p>
                                                <p className="text-xs text-gray-500 mt-1">Protein (g)</p>
                                            </div>
                                            <div className="bg-amber-50 rounded-xl p-4 text-center">
                                                <p className="text-2xl font-bold text-amber-700">{product.fat}</p>
                                                <p className="text-xs text-gray-500 mt-1">Fat (g)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                                        {isInCart ? (
                                            <button onClick={() => navigate('/carts/page')}
                                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                                                Go to Cart
                                            </button>
                                        ) : (
                                            <button onClick={clickAddToCart}
                                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                                                Add to Cart
                                            </button>
                                        )}
                                        <button onClick={() => navigate('/carts/page')}
                                                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 rounded-xl transition-colors">
                                            View Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewProduct;
