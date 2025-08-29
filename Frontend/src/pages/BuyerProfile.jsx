import React, { useEffect, useState } from "react"
import { User, Mail, Phone, MapPin, Heart, Edit3, Plus, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import BuyerNav from "../components/buyer/BuyerNav"

const BASE_API = import.meta.env.VITE_BASE_API_URL
const BASE_URL = `${BASE_API}/buyerProfile`

const BuyerProfile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("cropconnect_token")
        if (!token || !user?._id) return

        const res = await fetch(`${BASE_URL}/get-buyerProfile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile")

        const buyer = data.getBuyerProfile?.find((p) => p.userId === user._id)
          || data.data || data.profile || null

        setProfile(buyer)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()

    return () => controller.abort()
  }, [user?._id])

  const handleEdit = () => navigate("/profile/buyer/edit")
  const handleCreate = () => navigate("/profile/buyer/create")

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 animate-pulse">
        <div className="flex justify-center mb-4">
          <BuyerNav />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <div className="h-8 bg-gray-300 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-white/40 rounded-full" />
                <div className="h-6 bg-white/40 rounded w-40" />
                <div className="h-4 bg-white/40 rounded w-24" />
              </div>
            </div>

            <div className="p-6 grid md:grid-cols-3 gap-8">
              {[1, 2].map((_, idx) => (
                <div key={idx}>
                  <div className="h-5 bg-gray-300 rounded w-1/2 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-100 p-3 rounded">
                        <div className="w-10 h-10 bg-gray-300 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-300 rounded w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <div className="h-5 bg-gray-300 rounded w-1/3 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-gray-200 rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-center">
              <div className="h-10 w-32 bg-gray-300 rounded" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded shadow space-y-3">
                <div className="h-5 bg-gray-300 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md bg-white rounded shadow p-6 text-center">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md bg-white rounded shadow p-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Profile Found</h3>
          <p className="text-gray-600 mb-4">Create your buyer profile to get started</p>
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 mx-auto"
          >
            <Plus className="h-4 w-4" />
            Create Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-4">
      <div className="flex justify-center">
        <BuyerNav />
      </div>
      <div className="mx-auto">


        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-2">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center p-6">
            <div className="flex flex-rows justify-center items-center">
              <div className="border-red-600 w-24 h-24 bg-white/30 rounded-full flex items-center justify-center mb-4 mr-4">
                <User className="h-20 w-20 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black"> Mr. {profile.name || user?.name}</h2>
                <p className="text-sm flex items-center justify-center gap-1 mt-1 text-green-100">
                  <CheckCircle className="h-4 w-4" />
                  Verified Buyer
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Contact Information</h3>
              <div className="space-y-3">
                <InfoRow icon={<Mail className="text-blue-600" />} label="Email" value={profile.email || user?.email} />
                <InfoRow icon={<Phone className="text-green-600" />} label="Phone" value={profile.phone} />
                <InfoRow icon={<MapPin className="text-purple-600" />} label="Address" value={profile.address} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold border-b pb-2">Location Details</h3>
              <div className="space-y-3">
                <SimpleRow label="City" value={profile.location?.city} />
                <SimpleRow label="State" value={profile.location?.state} />
                <SimpleRow
                  label="Coordinates"
                  value={profile.location?.coordinates?.coordinates?.join(", ") || "Not provided"}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2">
                  <Heart className="text-red-500 h-5 w-5" />
                  Preferences
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences?.length > 0 ? (
                    profile.preferences.map((pref, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full border border-green-300"
                      >
                        {pref}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No preferences set</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">Account Status</h4>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 font-medium">Active & Verified</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">Member Since</h4>
                <p className="text-gray-600">January 2024</p>
              </div>
            </div>
          </div>

          <div className="p-6 flex justify-center border-t">
            <button
              onClick={handleEdit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded flex items-center gap-2"
            >
              <Edit3 className="h-5 w-5" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mb-8">
        <p className="text-gray-600">Manage your profile information and preferences</p>
      </div>
    </div>
  )
}

// Helper components
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded">
    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium text-gray-900">{value || "Not provided"}</p>
    </div>
  </div>
)

const SimpleRow = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="font-medium text-gray-900">{value || "Not provided"}</p>
  </div>
)

export default BuyerProfile
