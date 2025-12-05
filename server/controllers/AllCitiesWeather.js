import express from 'express';
import axios from 'axios';

const API_KEY = process.env.WEATHER_API_KEY;

const countryCities = {
  India: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune", "Jaipur", "Ahmedabad", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad"],
  
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington"],
  
  Japan: ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Yokohama", "Hiroshima", "Sendai", "Kitakyushu", "Chiba", "Saitama", "Shizuoka", "Okayama", "Kawasaki", "Niigata", "Hamamatsu", "Nagano", "Fukushima"],
  
  UK: ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Leeds", "Sheffield", "Edinburgh", "Bristol", "Cardiff", "Coventry", "Leicester", "Bradford", "Belfast", "Stoke-on-Trent", "Wolverhampton", "Nottingham", "Plymouth", "Southampton", "Reading"],
  
  Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster"],
  
  Canada: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Oshawa", "Windsor", "Saskatoon", "Regina", "Sherbrooke", "St. John's", "Barrie"],
  
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Wollongong", "Logan City", "Geelong", "Hobart", "Townsville", "Cairns", "Toowoomba", "Darwin", "Ballarat", "Bendigo", "Albury", "Launceston"],
  
  France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon", "Grenoble", "Dijon", "Angers", "Nîmes", "Villeurbanne"],
  
  Italy: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania", "Venice", "Verona", "Messina", "Padua", "Trieste", "Taranto", "Brescia", "Prato", "Parma", "Modena"],
  
  China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Tianjin", "Chongqing", "Chengdu", "Nanjing", "Wuhan", "Xi’an", "Hangzhou", "Shenyang", "Harbin", "Suzhou", "Qingdao", "Dalian", "Zhengzhou", "Jinan", "Changsha", "Kunming"]
};

export const AllCitiesByWeather= async (req, res) => {

  const { country } = req.body;

  if (!country) {
    return res.status(400).json({ error: "Country name is required" });
  }

  const cities = countryCities[country];

  if (!cities) {
    return res.status(404).json({ error: "No city list found for this country" });
  }

  try {
    const results = [];

    for (const city of cities) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);

      results.push({
        city: response.data.name,
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      });
    }

    res.json({ country, cities: results });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}