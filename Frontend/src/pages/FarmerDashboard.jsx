import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  MapPin,
  Calendar,
  Star,
  Truck,
  Shield,
  Leaf,
  Award,
  Clock,
  Pencil,
  Trash2,
  AlertCircle,
  Search,
} from "lucide-react";
import { useAuth } from '../hooks/useAuth';
import FarmerNavbar from '../components/farmer/FarmerNavbar';

const BASE_API = import.meta.env.VITE_BASE_API_URL
const BASE_URL = `${BASE_API}/addProductByFarmer`

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none');

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin', { replace: true });
    } else if (user.role !== 'farmer') {
      navigate(user.role === 'buyer' ? '/dashboard/buyer' : '/', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user || user.role !== 'farmer') return;
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('cropconnect_token');
        const res = await fetch(`${BASE_URL}/get-productByFarmer`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
        setProducts(data.getAllProduct || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem('cropconnect_token');
      const res = await fetch(`${BASE_URL}/delete-productByFarmer/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete product');
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    return (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1);
  };

  // Search & Sort logic
  const filteredProducts = products
    .filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.variety?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'priceLowToHigh') return a.pricePerUnit - b.pricePerUnit;
      if (sortOption === 'priceHighToLow') return b.pricePerUnit - a.pricePerUnit;
      return 0;
    });

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className='mt-[10px]'>
          <FarmerNavbar />
        </div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search your products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 px-4 w-full rounded bg-white/80 border border-gray-200 shadow"
          />
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded shadow bg-white text-gray-700"
        >
          <option value="none">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      {loading ?(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 rounded shadow-xl bg-white/80 backdrop-blur-sm animate-pulse flex flex-col gap-4">
                <div className="flex gap-2 overflow-x-auto">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="w-24 h-24 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-6 bg-gray-200 rounded w-1/2 mt-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/5" />
                <div className="flex justify-between mt-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
        <div className="text-center text-red-600">
          <AlertCircle className="inline mr-2" /> {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center">No products found. <Link className="underline text-green-700" to="/products/list">Add now</Link></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="p-6 rounded shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition transform hover:scale-[1.02] flex flex-col">
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {product.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img || "/placeholder.svg"}
                    alt={`Product-${idx}`}
                    className="w-24 h-24 object-cover rounded border shadow"
                  />
                ))}
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="flex gap-1">
                    {product.isOrganic && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded inline-flex items-center">
                        <Leaf className="h-3 w-3 mr-1" /> Organic
                      </span>
                    )}
                    {product.isCertified && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded inline-flex items-center">
                        <Shield className="h-3 w-3 mr-1" /> Certified
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                {product.ratings?.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-yellow-600">
                    <Star className="h-4 w-4" /> {getAverageRating(product.ratings)} ({product.ratings.length})
                  </div>
                )}
              </div>

              <div className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded">
                <div className="flex justify-between">
                  <span className="text-2xl font-bold text-green-600">₹{product.pricePerUnit}</span>
                  <span className="text-sm text-gray-600">per {product.unit}</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Package className="h-4 w-4" /> {product.quantityAvailable} {product.unit}
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Variety:</strong> {product.variety}</p>
                <p>
                  <Calendar className="inline-block h-4 w-4 mr-1 text-green-600" />
                  <strong>Harvest:</strong> {formatDate(product.harvestDate)}
                </p>
                <p>
                  <Clock className="inline-block h-4 w-4 mr-1 text-red-600" />
                  <strong>Expiry:</strong> {formatDate(product.expiryDate)}
                </p>
                <p>
                  <MapPin className="inline-block h-4 w-4 mr-1 text-purple-600" />
                  {product.location?.city}, {product.location?.state}
                </p>
                <p>
                  <Truck className="inline-block h-4 w-4 mr-1 text-blue-600" />
                  {product.deliveryAvailable ? `Delivery (${product.deliveryRadiusKm} km)` : 'No delivery'}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <Link
                  to={`/products/edit/${product._id}`}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
