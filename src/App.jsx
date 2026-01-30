import './App.css'
import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home.jsx";
import AddProduct from "./pages/products/add-product.jsx";
import EditProduct from "./pages/products/edit-product.jsx";
import ProductList from "./pages/products/products-list.jsx";
import AdminProduct from "./pages/products/admin-product.jsx";
import ViewProduct from "./pages/products/view-product.jsx";
import ToastContainerSetup from "./ui/ToastContainerSetup.jsx";
import RegisterUser from "./pages/users/register-user.jsx";
import LoginUser from "./pages/users/login-user.jsx";
import Welcome from "./components/Welcome.jsx";
import {TokenUtil} from "./util/TokenUtil.js";
import {useDispatch} from "react-redux";
import {userActions} from "./redux/user/user.slice.js";
import CartPage from "./pages/carts/CartPage.jsx";
import CheckOutPage from "./pages/carts/CheckOutPage.jsx";
import Profile from "./pages/users/Profile.jsx";
import AddAddress from "./pages/addresses/AddAddress.jsx";
import EditAddress from "./pages/addresses/EditAddress.jsx";
import MyOrders from "./pages/orders/MyOrders.jsx";
import AllOrders from "./pages/orders/AllOrders.jsx";
import AuthRouter from "./router/AuthRouter.jsx";
import AdminRouter from "./router/AdminRouter.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";

const App = () => {
    const dispatch = useDispatch();

    const isLoggedIn = TokenUtil.isLoggedIn();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(userActions.getUserInfo())
        }
    }, [])


    return (
        <>
            <ToastContainerSetup/>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/home" element={
                    <AuthRouter>
                        <Home/>
                    </AuthRouter>
                }/>

                {/* Products Router */}
                <Route path="products">
                    <Route path="add-product" element={
                        <AdminRouter>
                            <AddProduct/>
                        </AdminRouter>
                    }/>
                    <Route path="edit-product/:productId" element={
                        <AdminRouter>
                            <EditProduct/>
                        </AdminRouter>
                    }/>
                    <Route path="view-product/:productId" element={
                        <AuthRouter>
                            <ViewProduct/>
                        </AuthRouter>
                    }/>
                    <Route path="show-product" element={
                        <AuthRouter>
                            <ProductList/>
                        </AuthRouter>
                    }/>
                    <Route path="admin-product" element={
                        <AdminRouter>
                            <AdminProduct/>
                        </AdminRouter>
                    }/>
                </Route>

                {/* Users Router */}
                <Route path="users">
                    <Route path="register" element={<RegisterUser/>}/>
                    <Route path="login" element={<LoginUser/>}/>
                    <Route path="profile" element={
                        <AuthRouter>
                            <Profile/>
                        </AuthRouter>
                    }/>
                </Route>

                {/* Carts Router */}
                <Route path="carts">
                    <Route path='page' element={
                        <AuthRouter>
                            <CartPage/>
                        </AuthRouter>
                    }/>
                    <Route path='checkout' element={
                        <AuthRouter>
                            <CheckOutPage/>
                        </AuthRouter>
                    }/>
                </Route>

                {/* Orders Router */}
                <Route path="orders">
                    <Route path='me' element={
                        <AuthRouter>
                            <MyOrders/>
                        </AuthRouter>
                    }/>
                    <Route path='all' element={
                        <AdminRouter>
                            <AllOrders/>
                        </AdminRouter>
                    }/>
                </Route>

                {/* Address Router */}
                <Route path="addresses">
                    <Route path='add' element={
                        <AuthRouter>
                            <AddAddress/>
                        </AuthRouter>
                    }/>
                    <Route path='edit/:addressId' element={
                        <AuthRouter>
                            <EditAddress/>
                        </AuthRouter>
                    }/>
                </Route>

                {/* Payments Router */}
                <Route path="payments">
                    <Route path='payment-success' element={
                        <AuthRouter>
                            <PaymentSuccess/>
                        </AuthRouter>
                    }/>
                </Route>

            </Routes>
        </>
    )
}


export default App
