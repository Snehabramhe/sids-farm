import React from 'react';

const FIELDS = [
    {name: 'productName', label: 'Product Name', type: 'text', placeholder: 'Enter product name'},
    {name: 'imageUrl', label: 'Image URL', type: 'url', placeholder: 'Enter image URL'},
    {name: 'price', label: 'Price (₹)', type: 'number', placeholder: 'Enter price'},
    {name: 'energy', label: 'Energy (kcal)', type: 'number', placeholder: 'Enter energy value'},
    {name: 'protein', label: 'Protein (g)', type: 'number', placeholder: 'Enter protein value'},
    {name: 'fat', label: 'Fat (g)', type: 'number', placeholder: 'Enter fat value'},
];

const INPUT_CLASS = "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

/**
 * Presentational product form shared by the Add and Edit product pages,
 * with a live image preview panel. The owning page owns the state/dispatch.
 */
const ProductForm = ({title, submitLabel, product, onChange, onSubmit, onCancel}) => {
    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Form */}
                <div className="p-6 md:p-8 bg-white shadow-md rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
                    <form onSubmit={onSubmit} className="space-y-4">
                        {FIELDS.map(field => (
                            <div key={field.name}>
                                <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
                                <input
                                    required
                                    type={field.type}
                                    name={field.name}
                                    value={product[field.name]}
                                    onChange={onChange}
                                    placeholder={field.placeholder}
                                    className={INPUT_CLASS}
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nutritional Info</label>
                            <textarea
                                required
                                name="nutritionalInfo"
                                value={product.nutritionalInfo}
                                onChange={onChange}
                                placeholder="Enter additional nutritional information"
                                rows="4"
                                className={INPUT_CLASS}
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                {submitLabel}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="w-full bg-gray-800 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-gray-900 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                {/* Live image preview */}
                <div className="bg-white shadow-md rounded-2xl overflow-hidden lg:sticky lg:top-24">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt="Product preview"
                             className="w-full h-72 lg:h-[560px] object-cover"/>
                    ) : (
                        <div className="flex items-center justify-center h-72 lg:h-[560px]">
                            <p className="text-gray-400">Image preview will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
