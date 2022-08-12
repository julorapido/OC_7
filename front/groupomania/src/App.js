import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import { BrowserRouter, Route,Routes } from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="*" element={<PageNotFound/>}/>

    </Routes>
  </BrowserRouter>
  )
}

export default App
