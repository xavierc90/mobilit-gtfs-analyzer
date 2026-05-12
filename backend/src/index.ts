import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Mobilit GTFS Analyzer API",
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});