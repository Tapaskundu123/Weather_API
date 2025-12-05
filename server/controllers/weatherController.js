import axios from "axios";

export const getWeatherByCity = async(req, res)=> {
  try {
    const { city } = req.params; // ❗ no await needed

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    const apiKey = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);

    const cleanData = {
      city: response.data.name,
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
    };
    
    return res.json({
      success: true,
      message: "Weather fetched successfully",
      data: cleanData
    });

  } catch (error) {
    console.error("❌ Error:", error);

    // Handle API error response cleanly
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message || "Weather API error",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
