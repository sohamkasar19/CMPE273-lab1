// import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup  from './components/loginSignup/signup';
import Login from './components/loginSignup/login';
import Home from './components/Home/homePage';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/profile'

function App() {
  return (
    <div className="App">

      {/* <NavBar>

        New navigation
      </NavBar> */}
        
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}/>
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
