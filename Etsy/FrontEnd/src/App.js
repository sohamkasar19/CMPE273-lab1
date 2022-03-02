import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup  from './components/loginSignup/signup';
import Login from './components/loginSignup/login';
import Home from './components/Home/homePage';


function App() {
  return (
    <div className="App">
        
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route  path="/signup" element={<Signup />}/>
            <Route  path="/login" element={<Login />}/>
          </Routes>
          
        </BrowserRouter>
        
      </div>
  );
}

export default App;
