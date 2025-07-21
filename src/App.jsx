import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import StatusCheck from "./components/StatusCheck";
import EcommerceHomePage from "./pages/eCommerce/homePage/HomePage.jsx";
import Products from "./pages/Products";
import VendorProducts from "./pages/vendor/pages/Products.jsx";
import Contact from "./pages/Contact";
import LandingHomepage from './pages/landing/index.jsx'
import LoginForm from "./pages/login/LoginForm.jsx";
import Signup from "./pages/login/Signup/Signup.jsx";
import Details from "./pages/login/Details.jsx";
import EcommerceLayout from './pages/eCommerce/Index.jsx'
import Cart from './pages/eCommerce/cartPage/index.jsx'
import Checkout from './pages/eCommerce/checkoutPage/index.jsx'
import FAQ from "./pages/eCommerce/FAQ/FAQ.jsx";
import Termsofuse from "./pages/eCommerce/termsCondition/Termsofuse.jsx";
import PrivacyPolicy from "./pages/eCommerce/privacyPolicy/PrivacyPolicy.jsx";
import CookiesPolicy from "./pages/eCommerce/cookiesPolicy/CookiesPolicy.jsx";
import OrderTracking from "./pages/eCommerce/orderTracking/OrderTracking.jsx";
import ProductDetail from "./pages/eCommerce/ProductDetail.jsx";
import CustomerProfile from "./pages/eCommerce/Profile.jsx";
import VendorLayout from './pages/vendor/dashboard/index.jsx'
import ProtectedRoute from "./pages/routes/ProtectedRoute.jsx";
import Overview from "./pages/vendor/pages/Overview.jsx";
import Orders from "./pages/vendor/pages/Orders.jsx";
import Profile from "./pages/vendor/pages/Customers.jsx";
import AddProduct from "./pages/vendor/pages/AddProduct.jsx";
import VendorProductDetail from "./pages/vendor/pages/ProductDetail.jsx";
import ForgotPassword from "./pages/login/forgotPassword/ForgotPassword.jsx";
import ThankYou from "./pages/eCommerce/ThankYou.jsx";

const App = () => {

  return (
    <>
      <StatusCheck />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingHomepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/details" element={<Details />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* E-Commerce Route */}
        <Route exact path="/ecommerceDashboard" element={<EcommerceLayout />}>
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/ecommerceDashboard" element={<EcommerceHomePage />} />
          <Route path="/ecommerceDashboard/products" element={<Products />} />
          <Route path="/ecommerceDashboard/product/:id" element={<ProductDetail />} />
          <Route path="/ecommerceDashboard/contact" element={<Contact />} />
          <Route path="/ecommerceDashboard/cart" element={<Cart />} />
          <Route path="/ecommerceDashboard/checkout" element={<Checkout />} />
          <Route path="/ecommerceDashboard/profile" element={<CustomerProfile />} />
          <Route path="/ecommerceDashboard/faq" element={<FAQ />} />
          <Route path="/ecommerceDashboard/termsofuse" element={<Termsofuse />} />
          <Route path="/ecommerceDashboard/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/ecommerceDashboard/cookiesPolicy" element={<CookiesPolicy />} />
          <Route path="/ecommerceDashboard/orderTracking" element={<OrderTracking />} />
          <Route path="/ecommerceDashboard/thank-you" element={<ThankYou />} />
          {/* </Route> */}
        </Route>
        {/* Vendor Dashboard */}
        <Route path="/vendorDashboard" element={<VendorLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Overview />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/:id" element={<VendorProductDetail />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
    </Routes >
    </>
  );
};

export default App;
