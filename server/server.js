import express from 'express';
import cors from cors;
import 'dotenv/config';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Weather API Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});