import React from 'react';

const FIELDS = [
    {name: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: 'Enter your mobile number'},
    {name: 'flat', label: 'Flat/Apartment Number', type: 'text', placeholder: 'Enter your flat number'},
    {name: 'buildingName', label: 'Building Name', type: 'text', placeholder: 'Enter your building name'},
    {name: 'landmark', label: 'Landmark', type: 'text', placeholder: 'Enter a nearby landmark'},
    {name: 'area', label: 'Area', type: 'text', placeholder: 'Enter your area'},
    {name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city'},
    {name: 'state', label: 'State', type: 'text', placeholder: 'Enter your state'},
    {name: 'country', label: 'Country', type: 'text', placeholder: 'Enter your country'},
    {name: 'zipcode', label: 'Zipcode', type: 'text', placeholder: 'Enter your zipcode'},
];

/**
 * Presentational address form shared by the Add and Edit address pages.
 * The owning page keeps the state and decides what submit/cancel do.
 */
const AddressForm = ({title, submitLabel, address, onChange, onSubmit, onCancel}) => {
    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white shadow-sm rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onSubmit}>
                    {FIELDS.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                required
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={address[field.name]}
                                onChange={onChange}
                                placeholder={field.placeholder}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}

                    <div className="sm:col-span-2 flex gap-3 mt-2">
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
        </div>
    );
};

export default AddressForm;
