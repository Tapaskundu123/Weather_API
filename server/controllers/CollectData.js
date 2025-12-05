
import Weather from "../models/weatherModel.js";

export const CollectData = async (req, res) => {
  try {

    const data = await Weather.find(); // fetch all saved weather entries

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error.message,
    });
  }
};

