import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/weather/${city}`);
      const weather = await res.json();
      setWeather(weather.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-200 to-blue-100 p-6">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/40">
        
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-wide">
          🌤️ Weather App
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <button
            onClick={fetchWeather}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all"
          >
            {loading ? "..." : "Go"}
          </button>
        </div>

        {weather && (
          <div className="mt-6 text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
               {weather.city}
            </h2>

            <p className="text-5xl font-extrabold text-blue-600 mt-4">
              {weather.temp}°C
            </p>

            <p className="text-gray-700 text-lg capitalize mt-2">
              {weather.description}
            </p>

            <div className="mt-4 flex justify-center">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Updated just now
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}