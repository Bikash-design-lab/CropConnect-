
import React,{ useEffect, useState } from "react"
import {
  Search,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  Zap,
  Eye,
  Droplets,
  Wind,
  Gauge,
  Thermometer,
  Sunrise,
  Sunset,
} from "lucide-react"

const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

const Weather = () => {
  const [city, setCity] = useState("Kolkata")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAPI = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(city)}?format=j1`
      )
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error("Failed to fetch weather", error)
      setError("Failed to fetch weather data. Please try another city.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchAPI()
  }

  const getWeatherIcon = (condition) => {
    const lowerCondition = condition?.toLowerCase() || ""
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) return <Sun />
    if (lowerCondition.includes("cloud")) return <Cloud />
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) return <CloudRain />
    if (lowerCondition.includes("snow")) return <Snowflake />
    if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) return <Zap />
    return <Sun />
  }

  const getTimeLabel = (time) => {
    const timeMap = {
      "0": "12 AM",
      "300": "3 AM",
      "600": "6 AM",
      "900": "9 AM",
      "1200": "12 PM",
      "1500": "3 PM",
      "1800": "6 PM",
      "2100": "9 PM",
    }
    return timeMap[time] || `${Number.parseInt(time) / 100}:00`
  }

  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <SkeletonBox className="h-10 w-full" />
        <SkeletonBox className="h-48 w-full" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[...Array(6)].map((_, idx) => (
            <SkeletonBox key={idx} className="h-24 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!weatherData) return null

  const current = weatherData.current_condition[0]
  const location = weatherData.nearest_area[0]
  const astronomy = weatherData.weather[0].astronomy[0]
  const hourly = weatherData.weather[0].hourly

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          className="flex-1 p-2 border rounded"
          placeholder="Enter city"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded flex items-center gap-1 justify-center">
          <Search className="h-4 w-4" /> Search
        </button>
      </form>

      <div className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">
          {location.areaName[0].value}, {location.country[0].value}
        </h2>
        <div className="text-lg flex items-center gap-2">
          {getWeatherIcon(current.weatherDesc[0].value)}
          <span>{current.weatherDesc[0].value}</span>
        </div>
        <p className="text-4xl font-bold">{current.temp_C}°C</p>
        <p className="text-sm text-gray-600">Feels like {current.FeelsLikeC}°C</p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2"><Droplets className="w-4 h-4" />Humidity: {current.humidity}%</div>
          <div className="flex items-center gap-2"><Wind className="w-4 h-4" />Wind: {current.windspeedKmph} km/h</div>
          <div className="flex items-center gap-2"><Gauge className="w-4 h-4" />Pressure: {current.pressure} mb</div>
          <div className="flex items-center gap-2"><Eye className="w-4 h-4" />Visibility: {current.visibility} km</div>
          <div className="flex items-center gap-2"><Cloud className="w-4 h-4" />Cloud Cover: {current.cloudcover}%</div>
          <div className="flex items-center gap-2"><Sun className="w-4 h-4" />UV Index: {current.uvIndex}</div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2"><Sunrise className="w-4 h-4" /> {astronomy.sunrise}</div>
          <div className="flex items-center gap-2"><Sunset className="w-4 h-4" /> {astronomy.sunset}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-semibold mb-2">Today’s Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center text-sm">
          {hourly.map((hour, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded">
              <div>{getTimeLabel(hour.time)}</div>
              <div className="text-xl">{getWeatherIcon(hour.weatherDesc[0].value)}</div>
              <div>{hour.tempC}°C</div>
              <div className="text-gray-600">{hour.weatherDesc[0].value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Weather