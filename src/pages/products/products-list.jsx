import React, {useEffect, useState} from 'react';
import PageLoader from "../../ui/PageLoader.jsx";
import ErrorMessage from "../../ui/ErroMessage.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    productActions,
    productFeatureKey,
    selectHasMoreProducts,
} from "../../redux/product/product.slice.js";
import Navbar from "../../components/navbar.jsx";
import ProductCard from "../../components/ProductCard.jsx";

const PAGE_SIZE = 8;

const ProductList = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const {loading, products, error, total} = useSelector(state => state[productFeatureKey]);
    const hasMore = useSelector(selectHasMoreProducts);

    useEffect(() => {
        // Fresh first page whenever the page mounts.
        setPage(1);
        dispatch(productActions.getAllProducts({page: 1, limit: PAGE_SIZE}));
    }, []);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        dispatch(productActions.getAllProducts({page: nextPage, limit: PAGE_SIZE}));
    };

    // Only block the whole screen on the very first load.
    if (loading && products.length === 0) {
        return <PageLoader/>;
    }

    if (!loading && error) {
        return <ErrorMessage message={error.message}/>;
    }

    return (
        <>
            <Navbar/>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
                            <p className="text-gray-500 mt-1">Farm-fresh dairy delivered to your door</p>
                        </div>
                        {total > 0 && <span className="text-sm text-gray-500">{total} products</span>}
                    </div>

                    {products.length === 0 ? (
                        <p className="text-center text-gray-500 py-20">No products available right now.</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>
                    )}

                    {hasMore && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="bg-gray-800 hover:bg-gray-900 disabled:opacity-60 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductList;
