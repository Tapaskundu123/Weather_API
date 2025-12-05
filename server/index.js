
import express from "express";
import cors from "cors";
import router from "./routes/userRoutes.js"; // or weatherRoutes.js
import connectDB from "./DB/connectDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  try {
    const dotenv = await import('dotenv');
    dotenv.config();
  } catch (err) {
    console.log('dotenv not available, using environment variables');
  }
}
// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Weather API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});