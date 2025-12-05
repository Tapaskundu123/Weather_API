import mongoose from "mongoose";

const WeatherSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    condition: {
      type: String, // like "Cloudy", "Rain", "Sunny"
      required: true,
    },

    humidity: {
      type: Number,
      required: false,
    },

    windSpeed: {
      type: Number,
      required: false,
    },

    icon: {
      type: String, // weather icon code from API
      required: false,
    },

    searchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Weather", WeatherSchema);
