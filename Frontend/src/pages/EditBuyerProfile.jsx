import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const BASE_API = import.meta.env.VITE_BASE_API_URL
const BASE_URL = `${BASE_API}/buyerProfile`


const EditBuyerProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    preferences: [],
    location: {
      city: '',
      state: '',
      coordinates: {
        coordinates: ['', ''],
      },
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('cropconnect_token');
        const res = await fetch(`${BASE_URL}/get-buyerProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const profile = data.getBuyerProfile?.find((ele) => ele.userId === user._id);
        if (profile) {
          setFormData(profile);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const keys = name.split('.');
      setFormData((prev) => {
        const updated = { ...prev };
        let temp = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          temp[keys[i]] = temp[keys[i]] || {};
          temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;
        return updated;
      });
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.preferences.length) {
      errors.preferences = 'At least one preference is required';
    }

    if (!formData.location.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.location.state.trim()) {
      errors.state = 'State is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem('cropconnect_token');
      const method = formData._id ? 'PATCH' : 'POST';
      const endpoint = formData._id
        ? `${BASE_URL}/update-buyerProfile`
        : `${BASE_URL}/add-buyerProfile`;

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, userId: user._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save profile');

      setSuccessMessage(formData._id ? 'Profile updated successfully!' : 'Profile created successfully!');
      setTimeout(() => {
        navigate('/profile/buyer');
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-base">Loading profile...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center bg-white p-6 rounded-lg shadow">
        <div className="text-red-500 text-4xl mb-2">⚠️</div>
        <h2 className="text-xl font-bold text-red-600 mb-1">Error</h2>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4" style={{ textAlign: 'center' }}>
        {formData._id ? 'Edit Buyer Profile' : 'Create Buyer Profile'}
      </h1>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${validationErrors.phone ? 'border-red-500' : ''
              }`}
            required
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${validationErrors.address ? 'border-red-500' : ''
              }`}
            required
          />
          {validationErrors.address && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Preferences (comma-separated)</label>
          <input
            name="preferences"
            value={formData.preferences.join(', ')}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                preferences: e.target.value.split(',').map((pref) => pref.trim()).filter(Boolean),
              }))
            }
            className={`w-full border px-3 py-2 rounded ${validationErrors.preferences ? 'border-red-500' : ''
              }`}
            required
            placeholder="e.g., Organic, Local, Fresh"
          />
          {validationErrors.preferences && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.preferences}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">City</label>
          <input
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${validationErrors.city ? 'border-red-500' : ''
              }`}
            required
          />
          {validationErrors.city && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">State</label>
          <input
            name="location.state"
            value={formData.location.state}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${validationErrors.state ? 'border-red-500' : ''
              }`}
            required
          />
          {validationErrors.state && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Longitude (optional)</label>
          <input
            type="number"
            name="location.coordinates.coordinates.0"
            value={formData.location.coordinates.coordinates[0]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            step="any"
          />
        </div>

        <div>
          <label className="block font-medium">Latitude (optional)</label>
          <input
            type="number"
            name="location.coordinates.coordinates.1"
            value={formData.location.coordinates.coordinates[1]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            step="any"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          {formData._id ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditBuyerProfile;
