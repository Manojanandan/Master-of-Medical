import React from "react";
import { Routes, Route } from "react-router-dom";
import EcommerceHomePage from "./pages/eCommerce/homePage/HomePage.jsx";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import LandingHomepage from './pages/landing/index.jsx'
import Login from "./pages/login/Login.jsx";
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

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/details" element={<Details />} />
        {/* E-Commerce Route */}
        <Route exact path="/ecommerceDashboard" element={<EcommerceLayout />}>
          <Route path="/ecommerceDashboard" element={<EcommerceHomePage />} />
          <Route path="/ecommerceDashboard/products" element={<Products />} />
          <Route path="/ecommerceDashboard/contact" element={<Contact />} />
          <Route path="/ecommerceDashboard/cart" element={<Cart />} />
          <Route path="/ecommerceDashboard/checkout" element={<Checkout />} />
          <Route path="/ecommerceDashboard/faq" element={<FAQ />} />
          <Route path="/ecommerceDashboard/termsofuse" element={<Termsofuse />} />
          <Route path="/ecommerceDashboard/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/ecommerceDashboard/cookiesPolicy" element={<CookiesPolicy />} />
          <Route path="/ecommerceDashboard/orderTracking" element={<OrderTracking />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
