import React from 'react';

const ConfirmationProductModal = ({isOpen, setOpen, onDeleteConfirm}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you Sure to Delete?</h2>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    Are you sure you want to proceed with this action?
                </p>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDeleteConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationProductModal;
