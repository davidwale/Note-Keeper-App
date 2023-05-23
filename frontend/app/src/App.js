import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';

function App() {
 
  const isLoggedIn = window.localStorage.getItem("LoggedIn");


  return (
    <div className="App">
    
      <Router>
      
        <Routes>
        
         
        <Route path="/" element={isLoggedIn == "true" ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
