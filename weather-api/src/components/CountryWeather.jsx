import { useState } from "react";
import axios from "axios";
import {countries} from "../countriesData.js";
import { useNavigate } from "react-router-dom";

export default function CountryWeather() {
  const [country, setCountry] = useState("");
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWeather = async () => {
    if (!country) return;
    setLoading(true);

    try {

      const res = await axios.post("http://localhost:3000/api/weather/country", {
         country,
     });

    setWeatherList(res.data.cities);// axios stores response in res.data
    } catch (err) {
      console.error("Error fetching country weather:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
      </div>
      
      <button onClick={() => navigate("/")} className="mb-4 text-emerald-600 underline hover:text-emerald-800 transition-colors duration-200 self-start">
        ← Back to City Search
      </button>

      <h1 className="text-4xl font-bold mb-8 text-emerald-800 drop-shadow-sm z-10 relative">🌍 Weather by Country</h1>

      <div className="relative z-10 w-full max-w-md">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-emerald-200 bg-white/80 backdrop-blur-sm mb-6 shadow-lg focus:border-emerald-400 focus:outline-none transition-all duration-200 text-gray-700 font-medium"
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={fetchWeather}
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-xl mb-8 shadow-lg hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg"
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
        {weatherList.map((w, i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="font-bold text-xl text-emerald-800 mb-3">{w.city}</h2>

            {w.error ? (
              <p className="text-red-500 font-medium flex items-center">
                <span className="mr-2">⚠️</span>{w.error}
              </p>
            ) : (
              <>
                <p className="text-3xl font-bold text-emerald-600 mb-2">{w.temp}°C</p>
                <p className="capitalize text-gray-600 font-medium flex items-center">
                  <span className="mr-2">☁️</span>{w.description}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}