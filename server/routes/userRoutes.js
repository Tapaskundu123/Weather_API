import express from "express";
import { getWeatherByCity } from "../controllers/weatherController.js";
import { AllCitiesByWeather } from "../controllers/AllCitiesWeather.js";
import { WeatherDataSaved } from "../controllers/WeatherDataSaved.js";
import {CollectData } from "../controllers/CollectData.js";

const router = express.Router();

// GET all users (dummy)
router.get("/", (req, res) => {
  res.json({
    message: "List of users",
    users: [],
  });
});


// weather by entering country name
router.get('/fetchDataPrevious',CollectData);
router.post("/weather/country", AllCitiesByWeather);

router.post('/weather/WeatherDataSaved',WeatherDataSaved);

// GET weather details for a city
router.get("/weather/:city", getWeatherByCity); //dynamic route comes last
export default router;
