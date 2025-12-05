import express from "express";
import { getWeatherByCity } from "../controllers/weatherController.js";

const router = express.Router();

// GET all users (dummy)
router.get("/", (req, res) => {
  res.json({
    message: "List of users",
    users: [],
  });
});

// GET weather details for a city
router.get("/weather/:city", getWeatherByCity);

export default router;
