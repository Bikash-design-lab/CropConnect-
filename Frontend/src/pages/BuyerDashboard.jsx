import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

      <div className="p-4 md:p-8 bg-gray-50 min-h-screen rounded-xl shadow mt-6">
        <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">Empowering India, One Purchase at a Time</h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          As a buyer, you're not just purchasing fresh produce—you're helping transform the agricultural ecosystem of India.
          Your conscious decision to buy directly from farmers reduces the dependency on middlemen who often take significant commissions,
          leaving farmers with a small share of the profit.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Every purchase you make here ensures that more of your money goes directly into the hands of the people who grow your food.
          This helps improve their livelihoods, supports sustainable farming practices, and strengthens local economies.
          Your role is crucial in building a more equitable and transparent food system.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          When you choose to support local farmers, you're also contributing to food security, rural development, and the future of farming in India.
          You're not just a customer—you’re a changemaker, a partner in progress, and a bridge between the soil and society.
        </p>

        <p className="text-green-700 font-semibold text-lg mt-6 text-center">
          Thank you for being part of this journey. Together, we can build a stronger, fairer, and more sustainable agricultural future.
        </p>
      </div>
    </div>
  );
};

export default BuyerDashboard;
