import React, { useState, useEffect } from 'react';

const preferenceOptions = ['Organic', 'Local', 'Sustainable', 'Seasonal'];

const BuyerProfileForm = ({ initialData = null, onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });

  // Fill data when editing
  useEffect(() => {
    if (initialData) {
      setPhone(initialData.phone || '');
      setAddress(initialData.address || '');
      setPreferences(initialData.preferences || []);
      setCity(initialData.location?.city || '');
      setState(initialData.location?.state || '');
      setCoordinates({
        lat: initialData.location?.coordinates?.[1] || '',
        lng: initialData.location?.coordinates?.[0] || '',
      });
    }
  }, [initialData]);

  const handlePreferencesChange = (value) => {
    setPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((pref) => pref !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      phone,
      address,
      preferences,
      location: {
        city,
        state,
        coordinates: {
          type: 'Point',
          coordinates: [parseFloat(coordinates.lng), parseFloat(coordinates.lat)],
        },
      },
    };

    // Call parent or API
    if (onSubmit) {
      onSubmit(payload);
    }

    // Example API:
    // axios.post('/api/buyer/profile', payload)
    //   .then(res => console.log('Saved', res.data))
    //   .catch(err => console.error('Save error', err));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        {initialData ? 'Edit' : 'Create'} Buyer Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map((option) => (
              <label key={option} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={preferences.includes(option)}
                  onChange={() => handlePreferencesChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              step="any"
              value={coordinates.lat}
              onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              step="any"
              value={coordinates.lng}
              onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {initialData ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default BuyerProfileForm;


// import React, { useState } from 'react'

// const BuyerProfileForm = () => {
//   const [phone, setPhone] = useState("")
//   const [address, setAddress] = useState("")
//   const [preferences, setPreferences] = useState([null])
//   const [location, setLocation] = useState("") 
//   return (
//     <div>
//       <p>This is BuyerProfileForm.jsx page for Add/Edit in one</p>
//     </div>
//   )
// }

// export default BuyerProfileForm


// Add/Edit in one
// const mongoose = require("mongoose");

// const BuyerProfileSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   preferences: { type: [String], required: true }, // e.g., ["Organic", "Local"]
//   location: {
//     city: { type: String },
//     state: { type: String },
//     coordinates: {
//       type: { type: String, default: "Point" },
//       coordinates: [Number],
//     },
//   },
// }, {
//   versionKey: false,
//   timestamps: true,
// });

// BuyerProfileSchema.index({ "location.coordinates": "2dsphere" });

// const BuyerProfileModel = mongoose.model("BuyerProfile", BuyerProfileSchema);
// module.exports = { BuyerProfileModel };
