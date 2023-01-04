import './App.css';
import Home from './pages/Home';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginScreen from "./pages/Login";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import Order from "./pages/order";
import React, { useState, useEffect } from "react";
import { getIdTokenFromCookie } from './services/auth';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const token = getIdTokenFromCookie()
    if (token) {
      setIsLoggedin(true);
    }
    setloading(false)

    return () => {
      console.log("This will be logged on unmount");
    }
  }, [])

  if (loading) {
    return (<h1>Loading...</h1>)
  }


  return (
    <>
      <BrowserRouter>
        <Layout isLoggedin={isLoggedin} />
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="/cart" element={<Cart isLoggedin={isLoggedin} />} /> */}
          {/* <Route path="/order" element={<Order />} /> */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
