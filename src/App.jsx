import React, { useState } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Rroutes from './components/Rroute';
import { useUserContext } from './UserContext';
import Proutes from './components/Proutes';
function App() {
  const {user} = useUserContext();

  return (
    <>
       <Router>
        <Routes>
          <Route path="/register" element={<Rroutes user={user}><Register /></Rroutes>}></Route>
          <Route path="/" element={<Proutes user={user}><HomePage /></Proutes>}/>
        </Routes>
       </Router>
    </>
  )
}

export default App
