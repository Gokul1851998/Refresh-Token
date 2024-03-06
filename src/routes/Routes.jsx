import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';


export default function RoutesPath() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
    </Routes>
  )
}
