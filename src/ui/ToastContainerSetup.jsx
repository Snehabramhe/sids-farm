import React from "react";
import {Bounce, ToastContainer} from "react-toastify";

const ToastContainerSetup = () => {
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    )
};
export default ToastContainerSetup;