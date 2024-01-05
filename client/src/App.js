import './App.css';
import React, { useState, useMemo } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Orb from './components/Orbs';
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/Register';
import Record from './pages/Record';
import Forget_Password from './pages/Forget-Password';
import Reset_Password from './pages/Reset-Password';
import Set_Budget from './pages/Set-budgets';
import Export from './pages/Export';
import Plan from './pages/Plan';

function App() {
  // Move the useMemo inside the functional component
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Record /></ProtectedRoute>} />
          <Route path='/test' element={<Test />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<Forget_Password />} />
          <Route path="/reset-password/:id/:token" element={<Reset_Password />} />
          <Route path='/Set-budget' element={<Set_Budget />} />
          <Route path='/export' element={<Export />} />
          <Route path='/plan' element={<Plan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem('users')) {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
} 

export default App;