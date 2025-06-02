import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Home from '../pages/common/Home';
import OrderCart from "../OrderCart";
import ProductCart from "../ProductCart";
import ProtectedRoute from "../ProtectedRoute";
import NotFound from '../pages/common/NotFound';
import AuthContext from '../context/AuthContext';
import Signup from '../pages/Auth/Signup';
import Signin from '../pages/Auth/Signin';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/productcart" element={<ProductCart />} />
      <Route path="/ordercart" element={<OrderCart />} />
      <Route path="/user/signin" element={<Signin />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/forgetPassword" element={<ForgotPassword/>} />
      <Route path='/user/resetPassword' element={<ResetPassword/>} />
      {/* Protected Route Example */}
      <Route path="/protectedroute" element={<ProtectedRoute />} />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

