import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Loader from './Common/Loader';

let guestBuyerLogin = {
  email: "bikash@gmail.com",
  password: "bikash@123",
  role: "buyer"
}

let guestFarmerLogin = {
  email: "rajesh@gmail.com",
  password: "rajesh@123",
  role: "farmer"
}

const Signin = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError[name]) setFormError((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      toast.error("Please fix the highlighted errors.");
      return;
    }
    const result = await login(formData);
    if (result.success) {
      const userData = JSON.parse(localStorage.getItem('cropconnect_user'));
      toast.success(`Welcome back, ${userData?.role}!`);

      if (userData?.role === 'farmer') {
        navigate('/dashboard/farmer');
      } else {
        navigate('/dashboard/buyer');
      }
    }
  };

  const handleGuestLogin = async (guestCredentials) => {
    setFormData(guestCredentials);
    setFormError({});
    const result = await login(guestCredentials);
    if (result.success) {
      const userData = JSON.parse(localStorage.getItem('cropconnect_user'));
      toast.success(`Logged in as Guest ${userData?.role}`);
      if (userData?.role === 'farmer') {
        navigate('/dashboard/farmer');
      } else {
        navigate('/dashboard/buyer');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600">Sign in to your CropConnect account</p>
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formError.email ? 'border-red-500' : ''}`}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {formError.email && <p className="text-red-500 text-xs italic">{formError.email}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${formError.password ? 'border-red-500' : ''}`}
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={(e) => {
              if (e.nativeEvent.inputType === 'insertText' && e.nativeEvent.data === ' ') return;
              handleChange(e);
            }}
            disabled={loading}
          />
          {formError.password && <p className="text-red-500 text-xs italic">{formError.password}</p>}
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex items-center justify-between">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader /> : 'Sign In'}
            {/* {loading ? 'Signing In...' : 'Sign In'} */}

          </button>
          <a className="inline-block align-baseline font-bold text-sm text-green-700 hover:text-green-900" href="/forgot-password">
            Forgot Password?
          </a>
        </div>
      </form>
      <div className="flex gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleGuestLogin(guestBuyerLogin)}
          disabled={loading}
        >
          Guest Buyer Login
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleGuestLogin(guestFarmerLogin)}
          disabled={loading}
        >
          Guest Farmer Login
        </button>
      </div>
    </div>
  );
};

export default Signin;

