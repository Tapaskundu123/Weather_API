import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CityWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/api/weather/${city}`);
      setWeather(data.data); // Axios already parses JSON
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error fetching weather");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 p-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_50%)]"></div>
      </div>
      
      <h1 className="text-4xl font-bold mb-8 text-blue-800 drop-shadow-sm relative z-10">🌤️ Weather by City</h1>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-4 rounded-xl border-2 border-blue-200 bg-white/80 backdrop-blur-sm focus:border-blue-400 focus:outline-none transition-all duration-200 text-gray-700 font-medium shadow-lg"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
          >
            {loading ? "..." : "Go"}
          </button>
          
        </div>
         <button
            className="mt-6 bg-blue-400 rounded p-4 text-white hover:text-blue-800 transition-colors duration-200 font-medium"
            onClick={() => navigate("/country")}
          >
            View all cities in a country
          </button>
          <button onClick={()=>navigate('/saved-data')}>View Saved Data</button>
      </div>

      {weather && (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center w-full max-w-md border border-blue-100 relative z-10 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">{weather.city}</h2>
          <p className="text-5xl font-bold text-blue-600 mb-4">{weather.temp}°C</p>
          <p className="capitalize text-gray-600 font-medium text-lg flex items-center justify-center">
            <span className="mr-2 text-2xl">☀️</span>{weather.description}
          </p> 
        </div>
      )}
    </div>
  );
}