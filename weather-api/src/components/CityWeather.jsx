import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CityWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/api/weather/${city}`);
      setWeather(data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching weather");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-blue-500 via-sky-300 to-blue-100 
      p-6 relative overflow-hidden">

      {/* floating circles */}
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-white/20 rounded-full blur-2xl"></div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-10 text-white drop-shadow-lg tracking-wide">
        🌤️ City Weather
      </h1>

      {/* Input Card */}
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 
          shadow-2xl rounded-3xl p-8 w-full max-w-lg transform transition-all 
          hover:shadow-xl hover:scale-[1.02]">

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-white/50 backdrop-blur-md 
              border border-white/40 focus:border-blue-500 outline-none 
              text-gray-700 font-medium shadow-sm"
          />

          <button
            onClick={fetchWeather}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 
              text-white px-6 py-4 rounded-xl font-bold shadow-lg 
              hover:scale-105 active:scale-95 transition-all 
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Go"}
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <button
            className="w-full bg-white/30 hover:bg-white/50 text-blue-900 
              p-3 rounded-xl font-semibold transition-all backdrop-blur-md shadow"
            onClick={() => navigate("/country")}
          >
            🌍 View Cities in a Country
          </button>

          <button
            className="w-full bg-white/30 hover:bg-white/50 text-blue-900 
              p-3 rounded-xl font-semibold transition-all backdrop-blur-md shadow"
            onClick={() => navigate("/saved-data")}
          >
            💾 View Saved Weather Data
          </button>
        </div>
      </div>

      {/* Weather Card */}
      {weather && (
        <div className="mt-10">
          <div className="bg-white/30 backdrop-blur-2xl p-10 rounded-3xl 
            shadow-2xl w-full max-w-md border border-white/40 text-center 
            transform transition-all hover:scale-[1.03]">

            <h2 className="text-3xl font-bold text-blue-900 mb-3">
              {weather.city}
            </h2>

            <p className="text-6xl font-extrabold text-blue-700 mb-4 drop-shadow">
              {weather.temp}°C
            </p>

            <p className="capitalize text-gray-700 text-xl font-medium">
              {weather.temp > 30 ? "🔥" : weather.temp > 20 ? "☀️" : "🌥️"} {weather.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
