import connectDB from "../DB/connectDB.js";
import Weather from "../models/weatherModel.js";

export const WeatherDataSaved = async (req, res) => {
  try {
    const { weatherList, country } = req.body;

    if (!weatherList || !country) {
      return res.status(400).json({ message: "Country and weatherList required" });
    }

    // Save a single document
    const savedData = await Weather.create({
      country,
      weatherList,
    });

    return res.status(201).json({
      success: true,
      message: "Weather data saved",
      data: savedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error saving weather data",
      error: error.message,
    });
  }
};
