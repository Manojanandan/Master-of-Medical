import React from "react";
import { Routes, Route } from "react-router-dom";
import StatusCheck from "./components/StatusCheck";
import AnimatedPage from "./components/AnimatedPage";
import useScrollToTop from "./hooks/useScrollToTop";
import "./styles/animations.css";
import EcommerceHomePage from "./pages/eCommerce/homePage/HomePage.jsx";
import Products from "./pages/Products";
import VendorProducts from "./pages/vendor/pages/Products.jsx";
import Contact from "./pages/Contact";
import LandingHomepage from './pages/landing/index.jsx'
import MainLayout from './mainlayout/index.jsx'
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
import Disclaimer from "./pages/eCommerce/Disclaimer.jsx";
import HelpSupport from "./pages/eCommerce/Help & Suuport.jsx";
import ReturnsRefundsPolicy from "./pages/eCommerce/Returns and refunds policy.jsx";
import ProductDetail from "./pages/eCommerce/ProductDetail.jsx";
import CustomerProfile from "./pages/eCommerce/Profile.jsx";
import AboutUs from "./pages/eCommerce/AboutUs.jsx";
import Blog from "./pages/eCommerce/Blog.jsx";
import VendorLayout from './pages/vendor/dashboard/index.jsx'
import ProtectedRoute from "./pages/routes/ProtectedRoute.jsx";
import PendingStatusRoute from "./pages/routes/PendingStatusRoute.jsx";
import Overview from "./pages/vendor/pages/Overview.jsx";
import Orders from "./pages/vendor/pages/Orders.jsx";
import Profile from "./pages/vendor/pages/Customers.jsx";
import AddProduct from "./pages/vendor/pages/AddProduct.jsx";
import VendorProductDetail from "./pages/vendor/pages/ProductDetail.jsx";
import ForgotPassword from "./pages/login/forgotPassword/ForgotPassword.jsx";
import ThankYou from "./pages/eCommerce/ThankYou.jsx";
import UserEditProfile from "./pages/user/EditProfile.jsx";
import VendorEditProfile from "./pages/vendor/EditProfile.jsx";

const App = () => {
  // Use the scroll to top hook
  useScrollToTop();

  return (
    <>
      <StatusCheck />
      {/* <Navbar /> */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
          <>
          <AnimatedPage animationType="fade" timeout={1000}>
            <LandingHomepage />
          </AnimatedPage>
          </>
        } />
        
        {/* Latest Main Layout */}
        <Route path="/latest-main" element={
          <>
          <AnimatedPage animationType="fade" timeout={1000}>
            <MainLayout />
          </AnimatedPage>
          </>
        } />
        
        {/* Authentication Routes */}
        <Route path="/auth/register" element={
          <AnimatedPage animationType="slide" direction="up" timeout={600}>
            <Signup />
          </AnimatedPage>
        } />
        <Route path="/auth/login" element={
          <AnimatedPage animationType="slide" direction="up" timeout={600}>
            <LoginForm />
          </AnimatedPage>
        } />
        <Route path="/auth/complete-profile" element={
          <AnimatedPage animationType="fade" timeout={600}>
            <Details />
          </AnimatedPage>
        } />
        <Route path="/auth/forgot-password" element={
          <AnimatedPage animationType="slide" direction="up" timeout={600}>
            <ForgotPassword />
          </AnimatedPage>
        } />
        
        {/* Legacy Login Route (for backward compatibility) */}
        <Route path="/loginform" element={
          <AnimatedPage animationType="slide" direction="up" timeout={600}>
            <LoginForm />
          </AnimatedPage>
        } />
        
        {/* Customer Dashboard */}
        <Route path="/customer" element={<EcommerceLayout />}>
          <Route element={<PendingStatusRoute />}>
            <Route index element={
            <AnimatedPage animationType="fade" timeout={800}>
              <EcommerceHomePage />
            </AnimatedPage>
          } />
            <Route path="products" element={
            <AnimatedPage animationType="slide" direction="up" timeout={600}>
              <Products />
            </AnimatedPage>
          } />
            <Route path="products/:id" element={
            <AnimatedPage animationType="zoom" timeout={700}>
              <ProductDetail />
            </AnimatedPage>
          } />
            <Route path="contact" element={
            <AnimatedPage animationType="slide" direction="left" timeout={600}>
              <Contact />
            </AnimatedPage>
          } />
            <Route path="cart" element={
            <AnimatedPage animationType="slide" direction="right" timeout={600}>
              <Cart />
            </AnimatedPage>
          } />
            <Route path="checkout" element={
            <AnimatedPage animationType="grow" timeout={800}>
              <Checkout />
            </AnimatedPage>
          } />
            <Route path="profile" element={
            <AnimatedPage animationType="fade" timeout={1000}>
              <CustomerProfile />
            </AnimatedPage>
          } />
            <Route path="faq" element={
            <AnimatedPage animationType="slide" direction="up" timeout={600}>
              <FAQ />
            </AnimatedPage>
          } />
            <Route path="cookies-policy" element={
            <AnimatedPage animationType="slide" direction="left" timeout={600}>
              <CookiesPolicy />
            </AnimatedPage>
          } />
            <Route path="order-tracking" element={
            <AnimatedPage animationType="slide" direction="up" timeout={600}>
              <OrderTracking />
            </AnimatedPage>
          } />
          <Route path="/ecommerceDashboard/disclaimer" element={
            <AnimatedPage animationType="slide" direction="up" timeout={600}>
              <Disclaimer />
            </AnimatedPage>
          } />
          <Route path="/ecommerceDashboard/help-support" element={
            <AnimatedPage animationType="slide" direction="up" timeout={600}>
              <HelpSupport />
            </AnimatedPage>
          } />
          <Route path="/ecommerceDashboard/returns-refunds" element={
            <AnimatedPage animationType="slide" direction="up" timeout={600}>
              <ReturnsRefundsPolicy />
            </AnimatedPage>
          } />
          <Route path="/ecommerceDashboard/about-us" element={

            <AnimatedPage animationType="slide" direction="up" timeout={600}>
              <AboutUs />
            </AnimatedPage>
          } />
            <Route path="blog" element={
            <AnimatedPage animationType="slide" direction="up" timeout={600}>
              <Blog />
            </AnimatedPage>
          } />
            <Route path="order-success" element={
            <AnimatedPage animationType="zoom" timeout={800}>
              <ThankYou />
            </AnimatedPage>
          } />
          </Route>
        </Route>
        
        {/* Legal Pages - Global Access */}
        <Route path="/legal/terms-of-use" element={
          <AnimatedPage animationType="slide" direction="left" timeout={600}>
            <Termsofuse />
          </AnimatedPage>
        } />
        <Route path="/legal/privacy-policy" element={
          <AnimatedPage animationType="slide" direction="left" timeout={600}>
            <PrivacyPolicy />
          </AnimatedPage>
        } />
        
        {/* Profile Management */}
        <Route path="/profile/customer/edit" element={
          <AnimatedPage animationType="fade" timeout={800}>
            <UserEditProfile />
          </AnimatedPage>
        } />
        <Route path="/profile/vendor/edit" element={
          <AnimatedPage animationType="fade" timeout={800}>
            <VendorEditProfile />
          </AnimatedPage>
        } />
        
        {/* Vendor Dashboard */}
        <Route path="/vendor" element={<VendorLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<PendingStatusRoute />}>
            <Route index element={
              <AnimatedPage animationType="fade" timeout={800}>
                <Overview />
              </AnimatedPage>
            } />
            <Route path="products" element={
              <AnimatedPage animationType="slide" direction="up" timeout={600}>
                <VendorProducts />
              </AnimatedPage>
            } />
            <Route path="products/add" element={
              <AnimatedPage animationType="grow" timeout={700}>
                <AddProduct />
              </AnimatedPage>
            } />
            <Route path="products/:id" element={
              <AnimatedPage animationType="zoom" timeout={700}>
                <VendorProductDetail />
              </AnimatedPage>
            } />
            <Route path="orders" element={
              <AnimatedPage animationType="slide" direction="up" timeout={600}>
                <Orders />
              </AnimatedPage>
            } />
            <Route path="profile" element={
              <AnimatedPage animationType="fade" timeout={800}>
                <Profile />
              </AnimatedPage>
            } />
            </Route>
          </Route>
        </Route>
    </Routes >
    </>
  );
};

export default App;