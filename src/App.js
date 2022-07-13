import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/chat/Chat';
import Register from './pages/register/Register';
import Login from './pages/register/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}
