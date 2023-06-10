import React, { useState } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<HomePage />}/>
        </Routes>
       </Router>
    </>
  )
}

export default App
