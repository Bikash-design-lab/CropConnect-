import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BuyerNav from '../components/buyer/BuyerNav';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin', { replace: true });
    } else if (user.role !== 'buyer') {
      if (user.role === 'farmer') navigate('/dashboard/farmer', { replace: true });
      else navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="w-full max-w-4xl px-4 mx-auto flex items-center justify-between">
        <BuyerNav />
      </div>

      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-900">Welcome back, John!</h1>
          <p className="text-sm text-gray-600">Role: <span className="font-medium text-green-700">Premium Buyer</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">Active Orders</p>
            <p className="text-2xl font-semibold text-green-700">3</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">Subscriptions</p>
            <p className="text-2xl font-semibold text-green-700">1 Active</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">Total Spent</p>
            <p className="text-2xl font-semibold text-green-700">$260.00</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Current Orders</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b pb-2">
              <span>Vegetable Box – July Week 2</span>
              <span className="text-sm text-yellow-600">In Transit</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span>Fruit Bundle – July Week 1</span>
              <span className="text-sm text-green-600">Delivered</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Custom CSA Box</span>
              <span className="text-sm text-gray-500">Processing</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Organic Veggie Box</h3>
              <p className="text-sm text-gray-600 mb-2">Fresh leafy greens & root veggies</p>
              <button className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded">Add to Cart</button>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Fruit Medley</h3>
              <p className="text-sm text-gray-600 mb-2">Apples, pears, and berries</p>
              <button className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded">Add to Cart</button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <Link to="/profile/buyer/edit" className="text-blue-600 hover:underline">Edit Profile</Link>
          <Link to="/subscriptions/manage" className="text-green-600 hover:underline">Manage Subscription</Link>
          <Link to="/orders/history" className="text-yellow-600 hover:underline">View Order History</Link>
          <Link to="/support" className="text-red-600 hover:underline">Contact Support</Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
