// import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup  from './components/loginSignup/signup';
import Login from './components/loginSignup/login';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/profile'
import HomePage from './components/Home/homePage';

function App() {
  return (
    <div className="App">

      {/* <NavBar>

        New navigation
      </NavBar> */}
        
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />}/>
            <Route  path="/home" element={<HomePage />}/>
            <Route  path="/navbar" element={<NavBar />}/>
            <Route  path="/signup" element={<Signup />}/>
            <Route  path="/login" element={<Login />}/>
            <Route  path="/profile" element={<Profile />}/>
          </Routes>
          
        </BrowserRouter>
        
      </div>
  );
}

export default App;
