import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import LandingHomepage from './pages/landing/index.jsx'
import Login from "./pages/login/Login.jsx";
import LoginForm from "./pages/login/LoginForm.jsx";
import Signup from "./pages/login/Signup.jsx";
import Details from "./pages/login/Details.jsx";

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
        {/* <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
};

export default App;
