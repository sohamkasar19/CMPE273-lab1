// import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/loginSignup/signup";
import Login from "./components/loginSignup/login";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/profile";
import HomePage from "./components/Home/homePage";
import Item from "./components/Item/itemPage";
import Cart from './components/Cart/cartPage';
import PurchasePage from './components/Purchases/purchaseHistoryPage';
import PurchaseDetailsPage from './components/Purchases/purchaseDetailsPage';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/navbar" element={<NavBar />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/item" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/purchase-details" element={<PurchaseDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
