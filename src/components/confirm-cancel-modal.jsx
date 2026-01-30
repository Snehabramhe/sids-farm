import React from 'react';

const ConfirmationCancelModal = ({isOpen, setOpen, onConfirm}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                {/* Title */}
                <h2 className="text-lg font-semibold text-red-600 mb-4">Are you sure to cancel this Order!</h2>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    This order will be cancelled, and the amount will be credited in 2-3 business days!
                </p>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Yes! Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationCancelModal;
