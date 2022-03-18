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
import ProfilePage from './components/Profile/profilePage';
import ShopPage from './components/Shop/ShopPage';
import ShopName from './components/Shop/ShopName';

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
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/item" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/purchase-details" element={<PurchaseDetailsPage />} />
          <Route path="/your-shop" element={<ShopPage />} />
          <Route path="/name-your-shop" element={<ShopName />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
