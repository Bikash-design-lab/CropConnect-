import React, { useState, useEffect } from 'react';

const FarmerProfileForm = ({ initialData = null, onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [farmSize, setFarmSize] = useState('');
  const [isCertifiedSustainable, setIsCertifiedSustainable] = useState(false);
  const [certAuthority, setCertAuthority] = useState('');
  const [certifiedOn, setCertifiedOn] = useState('');
  const [documents, setDocuments] = useState(['']);

  useEffect(() => {
    if (initialData) {
      setPhone(initialData.phone || '');
      setCity(initialData.location?.city || '');
      setState(initialData.location?.state || '');
      setPin(initialData.location?.pin || '');
      setCoordinates({
        lat: initialData.location?.coordinates?.[1] || '',
        lng: initialData.location?.coordinates?.[0] || '',
      });
      setFarmSize(initialData.farmSize || '');
      setIsCertifiedSustainable(initialData.isCertifiedSustainable || false);
      setCertAuthority(initialData.certificationDetails?.authority || '');
      setCertifiedOn(initialData.certificationDetails?.certifiedOn?.slice(0, 10) || '');
      setDocuments(initialData.certificationDetails?.documents || ['']);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      phone,
      location: {
        city,
        state,
        pin,
        coordinates: {
          type: 'Point',
          coordinates: [
            parseFloat(coordinates.lng),
            parseFloat(coordinates.lat),
          ],
        },
      },
      farmSize: parseFloat(farmSize),
      isCertifiedSustainable,
      certificationDetails: isCertifiedSustainable
        ? {
            authority: certAuthority,
            certifiedOn,
            documents,
          }
        : null,
    };

    if (onSubmit) onSubmit(payload);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        {initialData ? 'Edit' : 'Create'} Farmer Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">PIN</label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Latitude</label>
            <input
              type="number"
              step="any"
              value={coordinates.lat}
              onChange={(e) =>
                setCoordinates({ ...coordinates, lat: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Longitude</label>
            <input
              type="number"
              step="any"
              value={coordinates.lng}
              onChange={(e) =>
                setCoordinates({ ...coordinates, lng: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        {/* Farm Size */}
        <div>
          <label className="block text-sm font-medium">Farm Size (in acres)</label>
          <input
            type="number"
            value={farmSize}
            onChange={(e) => setFarmSize(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        {/* Sustainability */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isCertifiedSustainable}
            onChange={(e) => setIsCertifiedSustainable(e.target.checked)}
          />
          <label className="text-sm font-medium">Certified Sustainable?</label>
        </div>

        {/* Certification Details */}
        {isCertifiedSustainable && (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium">Authority</label>
              <input
                type="text"
                value={certAuthority}
                onChange={(e) => setCertAuthority(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Certified On</label>
              <input
                type="date"
                value={certifiedOn}
                onChange={(e) => setCertifiedOn(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Documents (URLs)</label>
              {documents.map((doc, index) => (
                <input
                  key={index}
                  type="text"
                  value={doc}
                  onChange={(e) => {
                    const updatedDocs = [...documents];
                    updatedDocs[index] = e.target.value;
                    setDocuments(updatedDocs);
                  }}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ))}
              <button
                type="button"
                className="text-blue-500 mt-2 text-sm"
                onClick={() => setDocuments([...documents, ''])}
              >
                + Add another document
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          {initialData ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default FarmerProfileForm;


// import React from 'react'

// const FarmerProfileForm = () => {
//   return (
//     <div>
//       <p> This is FarmerProfileForm.jsx page for Add/Edit in one</p>
//     </div>
//   )
// }

// export default FarmerProfileForm

// Add/Edit in one