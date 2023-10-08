/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { useSelector } from "react-redux";
import "./App.css";
import WebFont from "webfontloader";
import ProductDetails from "./components/Products/ProductDetails";
import { loadUser } from "./reduxSlices/userSlice";
import LoginSignup from "./components/Authentication/LoginSignup.jsx";
import Store from "./store";
import UserData from "./more/UserData";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./components/user/Profile";
import UpdatePassword from "./components/user/UpdatePassword";
import EditProfile from "./components/user/EditProfile.jsx";
import About from "./components/about/About";
import Products from "./components/Products/Products.jsx";
import Search from "./components/Products/Search.jsx";
import Support from "./more/Support.jsx";
import Rules from "./more/Rules.jsx";
import Contact from "./more/Contact.jsx";
import Cart from "./components/cart/Cart.jsx";
import Favourites from "./components/cart/Favourites.jsx";
import CommingSoon from "./more/CommingSoon.jsx";
import MoreOption from "./components/user/MoreOption.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import Success from "./components/cart/Success.jsx";
import MyOrder from "./components/user/MyOrder.jsx";
import MyOrderDetails from "./components/user/MyOrderDetails.jsx";

import Payment from "./components/cart/Payment.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Dashboard from './components/Admin/Dashboard.jsx';
import CreateProduct from './components/Admin/CreateProduct.jsx';
import AllProducts from "../../frontend/src/components/Admin/AllProducts.jsx";
import EditProduct from "../../frontend/src/components/Admin/EditProduct.jsx";
import AllOrder from "../../frontend/src/components/Admin/AllOrder.jsx";
import UpdateOrder from "../../frontend/src/components/Admin/UpdateOrder.jsx";
import AllUsers from "../../frontend/src/components/Admin/AllUsers.jsx";
import UpdateUser from "../../frontend/src/components/Admin/UpdateUser.jsx";
import AllReviews from "../../frontend/src/components/Admin/AllReviews.jsx";
import ForgotPassword from "../../frontend/src/components/user/ForgotPassword.jsx";
import ResetPassword from "../../frontend/src/components/user/ResetPassword.jsx";
import Notfound from "../../frontend/src/more/Notfound.jsx";
import { backend_Url } from "./server";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${backend_Url}/stripeapikey`, {withCredentials: true,});

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    Store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/login" element={<LoginSignup />} />
          <Route exact path="/user" element={<UserData />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route exact path="/support" element={<Support />} />
          <Route exact path="/faq" element={<Rules />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/more" element={<MoreOption />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/favourites" element={<Favourites />} />
          <Route exact path="/creator" element={<CommingSoon />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
         <Route exact path="/password/reset/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route exact path="/me" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route exact path="/me/update" element={<ProtectedRoute> <UpdatePassword /> </ProtectedRoute>} />
          <Route exact path="/me/update/info" element={<ProtectedRoute> <EditProfile /> </ProtectedRoute>} />
          <Route exact path="/shipping" element={<ProtectedRoute> <Shipping /> </ProtectedRoute>} />
          <Route exact path="/order/confirm" element={<ProtectedRoute> <ConfirmOrder /> </ProtectedRoute>} />
          <Route exact path="/success" element={<ProtectedRoute> <Success /> </ProtectedRoute>} />
          <Route exact path="/orders" element={<ProtectedRoute> <MyOrder /> </ProtectedRoute>} />
          <Route exact path="/order/:id" element={<ProtectedRoute> <MyOrderDetails /> </ProtectedRoute>} />


          {/* Protected Routes only for admin  */}
          {/* error  */}
         <Route exact path="/dashboard"  isAdmin={true}   element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />  

         <Route exact path="/admin/product"  isAdmin={true}  element={<ProtectedRoute > <CreateProduct /> </ProtectedRoute>} />
         <Route exact path="/admin/products"  isAdmin={true}  element={<ProtectedRoute > <AllProducts /> </ProtectedRoute> } />
         <Route exact path="/edit/product/:id"  isAdmin={true}  element={<ProtectedRoute ><EditProduct /> </ProtectedRoute>} />
         <Route exact path="/admin/orders"  isAdmin={true}  element={<ProtectedRoute > <AllOrder /> </ProtectedRoute>} />
         <Route exact path="/admin/order/:id"  isAdmin={true}  element={<ProtectedRoute ><UpdateOrder /> </ProtectedRoute>} />

          {/* error  */}
         <Route exact path="/admin/users"  isAdmin={true}  element={<ProtectedRoute ><AllUsers /> </ProtectedRoute>} />
         <Route exact path="/admin/user/:id"  isAdmin={true}  element={<ProtectedRoute ><UpdateUser /> </ProtectedRoute>} />
         <Route exact path="/admin/reviews"  isAdmin={true}  element={<ProtectedRoute ><AllReviews /> </ProtectedRoute>} />




          {/* Stripe route  */}

          <Route exact path="/process/payment" element={
            stripeApiKey ? (
                <ProtectedRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              ) : (
                <Notfound />
              )
            }
          />

          <Route path="*" element={<Notfound />} />
        </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
