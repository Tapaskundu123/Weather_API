import axios from "axios";
import React, { useEffect, useState } from "react";

const FetchData = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/fetchDataPrevious");
        
        // Flatten the data: extract all cities from all countries
        const allCities = res.data.data.flatMap(countryData => 
          countryData.weatherList.map(city => ({
            ...city,
            country: countryData.country, // Add country to each city
            createdAt:new Date(countryData.createdAt).toLocaleString()
          }))
        );
        
        setWeatherData(allCities);
      } catch (error) {
        console.error("Error fetching saved data:", error);
      } finally {
        setLoading(false);
      }
    };

    collectData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

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
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-blue-700">
                  {item.city}
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item.country}
                </span>
              </div>

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
                  <p>date: {item.createdAt}</p>
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