import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cartActions, cartFeatureKey} from "../redux/cart/cart.slice.js";

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=Sids+Farm';

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Is this product already in the cart? Drives the Add / Go-to-Cart toggle.
    const isInCart = useSelector(state =>
        state[cartFeatureKey].cartItems.some(item => item._id === product._id)
    );

    const clickAddToCart = () => {
        dispatch(cartActions.addToCart({product: {...product, count: 1}}));
    };

    const handleImageError = (e) => {
        if (e.target.src !== FALLBACK_IMAGE) {
            e.target.src = FALLBACK_IMAGE;
        }
    };

    return (
        <div className="group flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    onClick={() => navigate(`/products/view-product/${product._id}`)}
                    onError={handleImageError}
                    className="h-48 w-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    src={product.imageUrl || FALLBACK_IMAGE}
                    alt={product.productName}
                />
                {isInCart && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                        In Cart
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
                <h2
                    onClick={() => navigate(`/products/view-product/${product._id}`)}
                    className="text-base font-semibold text-gray-800 mb-1 cursor-pointer hover:text-green-600 line-clamp-1"
                >
                    {product.productName}
                </h2>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.nutritionalInfo}</p>

                {/* Nutrition badges */}
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md">Energy {product.energy} kcal</span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">Protein {product.protein} g</span>
                    <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded-md">Fat {product.fat} g</span>
                </div>

                {/* Price + action pinned to the bottom */}
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        &#8377;{Number(product.price)?.toFixed(2)}
                    </span>
                    {isInCart ? (
                        <button
                            onClick={() => navigate('/carts/page')}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            Go to Cart
                        </button>
                    ) : (
                        <button
                            onClick={clickAddToCart}
                            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
