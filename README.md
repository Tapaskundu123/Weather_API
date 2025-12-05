# 🌤️ MERN Weather Tracker App

A complete **MERN Stack Weather Application** that fetches real-time weather data using the **OpenWeather API**, stores the results in **MongoDB**, and provides REST API endpoints for retrieving saved data.

---

## 🚀 Features

- Fetch live weather using OpenWeather API  
- Save weather details into MongoDB  
- Retrieve saved weather results  
- Express.js REST API  
- React frontend using Axios  
- Environment-based configuration with dotenv  
- CORS-enabled backend  

---

## 🛠️ Tech Stack

### Frontend
- React  
- Axios  
- React Router  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- dotenv  
- CORS  

### External API
- OpenWeatherMap API  

---

# 📁 Project Overview

This project allows users to:

1. Enter a city name
2. Enter a country name view all cities Temperature
3. Fetch its real-time weather (temperature, description, etc.)  
4. Save the fetched weather details into MongoDB  
5. View all saved weather records from the database  

---

# 🔗 REST API Endpoints

```js
// ===============================
// 🌤️ Weather API Endpoints
// ===============================

// 1️⃣ Fetch previously saved weather records
router.get('/fetchDataPrevious', CollectData);

// 2️⃣ Fetch weather for all cities in a country
router.post('/weather/country', AllCitiesByWeather);

// 3️⃣ Save weather data in MongoDB
router.post('/weather/WeatherDataSaved', WeatherDataSaved);

// 4️⃣ Get live weather details for a specific city
router.get('/weather/:city', getWeatherByCity);
