import mongoose from "mongoose";

const WeatherSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },

    weatherList: [
      {
        city: { type: String, required: true, trim: true },
        temp: { type: Number, required: false },
        description: { type: String, required: false, trim: true },
        error: { type: String, default: null },
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Weather", WeatherSchema);
