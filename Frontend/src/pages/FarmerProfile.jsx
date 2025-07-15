import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import {
  User,
  Phone,
  MapPin,
  Shield,
  Leaf,
  FileText,
  AlertCircle,
  CheckCircle,
  Edit3,
  Plus,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import FarmerNavbar from "../components/farmer/FarmerNavbar"


const BASE_API = import.meta.env.VITE_BASE_API_URL
const BASE_URL = `${BASE_API}/farmerProfile`



const FarmerProfile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("cropconnect_token")
        const res = await fetch(`${BASE_URL}/get-farmerProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile")

        const farmer = data.getFarmerProfile?.find((p) => p.userId === user._id) || data.data || data
        setProfile(farmer)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (user?._id) fetchProfile()
  }, [user?._id])

  const handleEdit = () => navigate("/profile/farmer/edit")
  const handleCreate = () => navigate("/profile/farmer/create")

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <FarmerNavbar />
        <div className="max-w-4xl mx-auto animate-pulse space-y-6">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-300 w-48 mx-auto rounded mb-2" />
            <div className="h-4 bg-gray-200 w-64 mx-auto rounded" />
          </div>

          {/* Profile Card Skeleton */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white/30 rounded-full mb-4" />
                <div className="h-6 w-40 bg-white/50 rounded mb-2" />
                <div className="h-4 w-24 bg-white/30 rounded" />
              </div>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
              {/* Contact Info Skeleton */}
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 w-40 rounded mb-2" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>

              {/* Location Info Skeleton */}
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 w-40 rounded mb-2" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
            </div>

            {/* Crops Section Skeleton */}
            <div className="p-6 border-t space-y-2">
              <div className="h-5 bg-gray-200 w-48 rounded mb-3" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 w-20 bg-gray-100 rounded-full" />
                ))}
              </div>
            </div>

            {/* Certification Skeleton */}
            <div className="p-6 border-t space-y-2">
              <div className="h-5 bg-gray-200 w-64 rounded mb-3" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>

            {/* Edit Button Skeleton */}
            <div className="p-6 border-t text-center">
              <div className="h-10 w-32 bg-gray-200 rounded mx-auto" />
            </div>
          </div>

          {/* Bottom Cards Skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow h-24" />
            <div className="bg-white p-6 rounded shadow h-24" />
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
          <p className="text-gray-600 mb-4">Create your farmer profile to get started</p>
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
    <div className="min-h-screen bg-gray-50 p-4">
      <FarmerNavbar />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Farmer Profile</h1>
          <p className="text-gray-600">Manage your farming details and certifications</p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-sm flex items-center justify-center gap-1 mt-1 text-green-100">
                <CheckCircle className="h-4 w-4" />
                Registered Farmer
              </p>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Contact Information</h3>
              <div className="space-y-3">
                <InfoRow label="Email" value={user?.email} />
                <InfoRow label="Phone" value={user?.phone} />
                <SimpleRow label="Farm Size" value={profile.farmSize ? `${profile.farmSize} acres` : "-"} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Location Details</h3>
              <div className="space-y-3">
                <SimpleRow label="City" value={profile.location?.city} />
                <SimpleRow label="State" value={profile.location?.state} />
                <SimpleRow
                  label="Coordinates"
                  value={profile.location?.coordinates?.coordinates?.join(", ") || "Not provided"}
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="text-green-500 h-5 w-5" />
              Crop Information
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.crops?.length > 0 ? (
                profile.crops.map((crop, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full border border-green-300"
                  >
                    {crop}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic">No crops listed</p>
              )}
            </div>
          </div>

          {profile.certificationDetails && (
            <div className="p-6 border-t">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="text-blue-500 h-5 w-5" />
                Certification Details
              </h3>
              <div className="space-y-2">
                <SimpleRow label="Authority" value={profile.certificationDetails.authority} />
                <SimpleRow
                  label="Certified On"
                  value={new Date(profile.certificationDetails.certifiedOn).toLocaleDateString()}
                />
                {profile.certificationDetails.documents?.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <FileText className="h-4 w-4 text-blue-500" /> Documents:
                    </p>
                    <ul className="pl-4 list-disc text-sm text-blue-600">
                      {profile.certificationDetails.documents.map((doc, idx) => (
                        <li key={idx}>
                          <a href={doc} target="_blank" rel="noopener noreferrer" className="underline">
                            {doc}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-semibold text-gray-900 mb-3">Account Status</h4>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700 font-medium">Active & Verified</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-semibold text-gray-900 mb-3">Member Since</h4>
            <p className="text-gray-600">
              {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable UI helpers
const InfoRow = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="font-medium text-gray-900">{value || "Not provided"}</p>
  </div>
)

const SimpleRow = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="font-medium text-gray-900">{value || "Not provided"}</p>
  </div>
)

export default FarmerProfile
