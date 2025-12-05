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
    console.log(weather);
    setWeather(weather.data);   // FIXED
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather App</h1>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-xl mb-3"
        />

        <button
          onClick={fetchWeather}
          className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>

        {weather && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">{weather.city}</h2>
            <p className="text-lg mt-2">Temperature: {weather.temp}°C</p>
            <p className="text-gray-600">{weather.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
