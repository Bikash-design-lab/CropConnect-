import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FarmerNavbar from '../../components/farmer/FarmerNavbar';

const BASE_API = import.meta.env.VITE_BASE_API_URL
const BASE_URL = `${BASE_API}/addProductByFarmer`

const ListProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    description: '',
    category: 'grain',
    pricePerUnit: '',
    unit: 'kg',
    quantityAvailable: '',
    images: [],
    isOrganic: false,
    isCertified: false,
    certificationDetails: {
      authority: '',
      certificateNumber: '',
      certifiedOn: '',
    },
    harvestDate: '',
    expiryDate: '',
    location: {
      city: '',
      state: '',
      pin: '',
      coordinates: {
        coordinates: ['', ''],
      },
    },
    deliveryAvailable: false,
    deliveryRadiusKm: 0,
    status: 'available',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('cropconnect_token');
      const res = await fetch(`${BASE_URL}/add-productByFarmer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, farmerId: user._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to list product');
      navigate('/dashboard/farmer');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <FarmerNavbar />
      <h1 className="text-2xl font-bold mb-4" style={{ textAlign: 'center' }}>List a New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Product Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Variety</label>
          <input name="variety" value={formData.variety} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border px-3 py-2">
            {['vegetable', 'fruit', 'grain', 'pulse', 'herb', 'spice', 'other'].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Price Per Unit</label>
          <input type="number" name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Unit (e.g. kg)</label>
          <input name="unit" value={formData.unit} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Quantity Available</label>
          <input type="number" name="quantityAvailable" value={formData.quantityAvailable} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Organic</label>
          <input type="checkbox" name="isOrganic" checked={formData.isOrganic} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Certified</label>
          <input type="checkbox" name="isCertified" checked={formData.isCertified} onChange={handleChange} />
        </div>
        {formData.isCertified && (
          <>
            <div>
              <label className="block font-medium">Certification Authority</label>
              <input name="certificationDetails.authority" value={formData.certificationDetails.authority} onChange={handleChange} className="w-full border px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium">Certificate Number</label>
              <input name="certificationDetails.certificateNumber" value={formData.certificationDetails.certificateNumber} onChange={handleChange} className="w-full border px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium">Certified On</label>
              <input type="date" name="certificationDetails.certifiedOn" value={formData.certificationDetails.certifiedOn} onChange={handleChange} className="w-full border px-3 py-2" />
            </div>
          </>
        )}
        <div>
          <label className="block font-medium">Harvest Date</label>
          <input type="date" name="harvestDate" value={formData.harvestDate} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Expiry Date</label>
          <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">City</label>
          <input name="location.city" value={formData.location.city} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">State</label>
          <input name="location.state" value={formData.location.state} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">PIN Code</label>
          <input name="location.pin" value={formData.location.pin} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Longitude</label>
          <input type="number" name="location.coordinates.coordinates.0" value={formData.location.coordinates.coordinates[0]} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Latitude</label>
          <input type="number" name="location.coordinates.coordinates.1" value={formData.location.coordinates.coordinates[1]} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Delivery Available</label>
          <input type="checkbox" name="deliveryAvailable" checked={formData.deliveryAvailable} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Delivery Radius (Km)</label>
          <input type="number" name="deliveryRadiusKm" value={formData.deliveryRadiusKm} onChange={handleChange} className="w-full border px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Product Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border px-3 py-2">
            {['available', 'out_of_stock', 'unavailable'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          List Product
        </button>
      </form>
    </div>
  );
};

export default ListProduct;
