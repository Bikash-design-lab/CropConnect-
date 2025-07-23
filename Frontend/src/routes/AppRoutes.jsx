import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import FarmerDashboard from '../pages/FarmerDashboard';
import BuyerDashboard from '../pages/BuyerDashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import FarmerProfile from '../pages/FarmerProfile';
import BuyerProfile from '../pages/BuyerProfile';
import ProductDetails from '../pages/ProductDetails';
import EditProduct from '../pages/EditProduct/EditProduct';
import ListProduct from '../pages/ListProduct/ListProduct';
import EditBuyerProfile from '../pages/EditBuyerProfile';
import BrowserProduct from '../pages/BrowserProduct';
import MyOrder from '../components/buyer/MyOrder';
import Cart from '../components/buyer/Cart'
import EditFarmerProfile from '../components/farmer/EditFarmerProfile';
import OrderReceived from '../components/farmer/OrderReceived';
import NotFound from '../components/NotFound';
import Weather from '../pages/Common/Weather';
import FarmLaw from '../pages/Common/FarmLaw';
import SeasonalGuide from '../pages/Common/SeasonalGuide';
import ContactUs from '../pages/Common/ContactUs';
const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user/resetPassword" element={<ResetPassword />} />

        <Route
          path="/dashboard/farmer"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <FarmerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/buyer"
          element={
            <PrivateRoute allowedRoles={["buyer"]}>
              <BuyerDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/profile/farmer" element={<FarmerProfile />} />
        <Route path="/products/details/:id" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products/list" element={<ListProduct />} />
        <Route path="/profile/buyer" element={<BuyerProfile />} />
        <Route path="/profile/buyer/edit" element={<EditBuyerProfile />} />
        <Route path="/profile/buyer/create" element={<EditBuyerProfile />} />
        <Route path="/products/browse" element={<BrowserProduct />} />
        <Route path='/orders/history' element={<MyOrder />} />
        <Route path='/mycart' element={<Cart />} />
        <Route path='/profile/farmer/edit' element={<EditFarmerProfile />} />
        <Route path='/orders/received' element={<OrderReceived />} />
        <Route path='/weather' element={<Weather/>} />
        <Route path='/FarmLaw' element={<FarmLaw/>} /> 
        <Route path='/SeasonalGuide' element={<SeasonalGuide/>} /> 
        <Route path='/contact-us' element={<ContactUs/>} />
        <Route path='*' element={<NotFound/>} />
        <Route path='/dashboard/farmer' element={<FarmerDashboard/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
