import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import router from "./routes/userRoutes.js";
import connectDB from "./DB/connectDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


  connectDB();

app.use("/api", router);


app.get("/", (req, res) => {
  res.send("Weather API Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
