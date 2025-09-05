import React, { useEffect, useState } from "react"
import {
  ShoppingCart,
  Package,
  MapPin,
  Calendar,
  Star,
  Truck,
  Shield,
  Leaf,
  Award,
  Clock,
  AlertCircle,
  Search,
} from "lucide-react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import placeholderImg from "../../public/placeholderImg.png"
import BuyerNav from "../components/buyer/BuyerNav"
import { toast } from "react-toastify"

const BASE_API = import.meta.env.VITE_BASE_API_URL
const BASE_URL = `${BASE_API}/orderProduct`

const BrowserProduct = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("none")
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("cropconnect_token")
        const res = await fetch(`${BASE_URL}/get-AllListedProduct`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to fetch products")
        setProducts(data.getAllProduct || [])
        setFilteredProducts(data.getAllProduct || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = [...products]

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.variety?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (sortOption === "priceLowToHigh") {
      result.sort((a, b) => a.pricePerUnit - b.pricePerUnit)
    } else if (sortOption === "priceHighToLow") {
      result.sort((a, b) => b.pricePerUnit - a.pricePerUnit)
    }

    setFilteredProducts(result)
    setVisibleCount(6)
  }, [searchTerm, sortOption, products])

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0
    return (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
  }

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("cropconnect_token")
      const user = JSON.parse(localStorage.getItem("cropconnect_user"))
      const userId = user._id
      const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/orderProduct/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, userId }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to add to cart")
      toast.success("Product added to cart ✅")
    } catch (err) {
      toast.error(`Error: ${err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="h-10 w-64 bg-gray-200 mx-auto mb-4 rounded animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 mx-auto rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded shadow-lg animate-pulse space-y-4">
              <div className="h-48 bg-gray-200 rounded" />
              <div className="h-6 bg-gray-200 w-3/4 rounded" />
              <div className="h-4 bg-gray-200 w-full rounded" />
              <div className="h-4 bg-gray-200 w-1/2 rounded" />
              <div className="h-10 bg-gray-200 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-md bg-white/80 p-6 rounded shadow-lg text-center">
          <div className="flex justify-center mb-4 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded hover:brightness-110 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const displayedProducts = filteredProducts.slice(0, visibleCount)

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="flex justify-center">
        <BuyerNav />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
          Browse Products
        </h1>
        <p className="text-gray-600">Discover fresh produce from local farmers</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products, categories, or varieties..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            className="relative p-6 rounded shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition transform hover:scale-[1.02] flex flex-col"
          >
            {/* Fade white overlay for unavailable products */}
            {product.status.toLowerCase() !== "available" && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded">
                <span className="text-sm font-semibold text-red-600 bg-white/80 px-3 py-1 rounded shadow">
                  Sold out
                </span>
              </div>
            )}

            <div className="flex gap-2 mb-4 overflow-x-auto">
              {product.images?.slice(0, 4).map((img, idx) => (
                <LazyLoadImage
                  key={idx}
                  src={img || placeholderImg}
                  alt={`${product.name}-${idx}`}
                  width={96}
                  height={96}
                  effect="blur"
                  className="w-24 h-24 object-cover rounded border border-white shadow"
                />
              ))}
            </div>

            <p className="text-blue-500 font-bold">
              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </p>

            <div className="mb-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <div className="flex gap-1">
                  {product.isOrganic && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded inline-flex items-center">
                      <Leaf className="h-3 w-3 mr-1" />
                      Organic
                    </span>
                  )}
                  {product.isCertified && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded inline-flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Certified
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              {product.ratings?.length > 0 && (
                <div className="flex items-center gap-1 text-sm text-yellow-600">
                  <Star className="h-4 w-4" />
                  {getAverageRating(product.ratings)} ({product.ratings.length})
                </div>
              )}
            </div>

            <div className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded">
              <div className="flex justify-between">
                <span className="text-2xl font-bold text-green-600">₹{product.pricePerUnit}</span>
                <span className="text-sm text-gray-600">per {product.unit}</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Package className="h-4 w-4" />
                {product.quantityAvailable} {product.unit} available
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-2 flex-1">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Variety:</strong> {product.variety}</p>
              {product.isCertified && product.certificationDetails && (
                <div className="bg-blue-50 p-3 rounded text-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4" />
                    <strong>Certification Details</strong>
                  </div>
                  <p><strong>Authority:</strong> {product.certificationDetails.authority}</p>
                  <p><strong>Certificate #:</strong> {product.certificationDetails.certificateNumber}</p>
                  <p><strong>Certified:</strong> {formatDate(product.certificationDetails.certifiedOn)}</p>
                </div>
              )}
              <div className="flex gap-3">
                <span>
                  <Calendar className="inline-block h-4 w-4 text-green-600 mr-1" />
                  <strong>Harvest:</strong> {formatDate(product.harvestDate)}
                </span>
                <span>
                  <Clock className="inline-block h-4 w-4 text-red-600 mr-1" />
                  <strong>Expiry:</strong> {formatDate(product.expiryDate)}
                </span>
              </div>
              <p>
                <MapPin className="inline-block h-4 w-4 text-purple-600 mr-1" />
                {product.location?.city}, {product.location?.state} - {product.location?.pin}
              </p>
              <p>
                <Truck className="inline-block h-4 w-4 text-blue-600 mr-1" />
                {product.deliveryAvailable
                  ? `Delivery available (${product.deliveryRadiusKm} km)`
                  : "No delivery"}
              </p>
              <p className="text-xs text-gray-400">
                Updated: {formatDate(product.updatedAt)}
              </p>
            </div>

            <button
              onClick={() => handleAddToCart(product._id)}
              className="mt-4 w-full py-2 px-4 text-white bg-gradient-to-r from-green-600 to-blue-600 rounded hover:scale-105 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={(product.status || "").toLowerCase() !== "available"}
            >
              <ShoppingCart className="h-4 w-4 inline mr-2" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2 border border-gray-300 rounded shadow hover:bg-gray-100 transition"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  )
}

export default BrowserProduct




// <img
//   key={idx}
//   src={img || "/placeholder.svg"}
//   alt={`${product.name}-${idx}`}
//   loading="lazy"
//   className="w-24 h-24 object-cover rounded border border-white shadow"
// />