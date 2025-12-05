import axios from "axios";
import React, { useEffect, useState } from "react";

const FetchData = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const collectData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/fetchDataPrevious");
        setWeatherData(res.data.data); // <-- Save data in state
      } catch (error) {
        console.error("Error fetching saved data:", error);
      }
    };

    collectData(); // <-- Call once on page load
  }, []);

  return (
    <div className="p-6 min-h-screen bg-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        🌦️ Saved Weather Data
      </h1>

      {weatherData.length === 0 ? (
        <p className="text-gray-600">No saved data found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-bold text-blue-700">
                {item.city}
              </h2>

              {item.error ? (
                <p className="text-red-500 mt-2 font-medium">{item.error}</p>
              ) : (
                <>
                  <p className="text-3xl mt-2 font-semibold text-blue-600">
                    {item.temp}°C
                  </p>
                  <p className="capitalize text-gray-600 mt-1">
                    {item.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchData;
