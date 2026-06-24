import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "../components/navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import {productActions, productFeatureKey} from "../redux/product/product.slice.js";
import HomeImg from "../assets/images/home-img.webp";

const FEATURED_COUNT = 8;

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {products, loading} = useSelector(state => state[productFeatureKey]);
    const featured = products.slice(0, FEATURED_COUNT);

    useEffect(() => {
        dispatch(productActions.getAllProducts({page: 1, limit: FEATURED_COUNT}));
    }, []);

    return (
        <>
            <Navbar/>

            {/* Hero */}
            <section className="bg-gradient-to-r from-green-50 to-emerald-100">
                <div className="container mx-auto px-6 lg:px-20 py-12">
                    <div className="flex flex-col lg:flex-row items-center gap-10">
                        <div className="w-full lg:w-1/2">
                            <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                100% Farm Fresh
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                                Pure dairy, straight from <span className="text-green-600">Sid&apos;s Farm</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Milk, paneer, ghee, curd and more — no preservatives, no adulteration.
                                Delivered fresh to your doorstep every morning.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button onClick={() => navigate('/products/show-product')}
                                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium">
                                    Shop Products
                                </button>
                                <button onClick={() => navigate('/orders/me')}
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-white transition duration-300 font-medium">
                                    My Orders
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <img
                                src={HomeImg}
                                alt="Sid's Farm fresh dairy"
                                className="w-full h-auto rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured products */}
            <section className="bg-gray-50">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Featured Products</h2>
                            <p className="text-gray-500 mt-1">Our customers&apos; favourites</p>
                        </div>
                        <button onClick={() => navigate('/products/show-product')}
                                className="text-green-600 hover:text-green-700 font-medium">
                            View All &rarr;
                        </button>
                    </div>

                    {loading && featured.length === 0 ? (
                        <p className="text-center text-gray-500 py-16">Loading products...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {featured.map(product => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
