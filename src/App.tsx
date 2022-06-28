import React from 'react';
import './App.css';
import { SignUp } from './components/SignUpForm';
import { LogIn } from './components/Login';
import { Catogories } from './components/Catogories';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
   return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="Catogories" element={<Catogories />} />
    </Routes>
    </BrowserRouter>  
   );
   
}

export default App;